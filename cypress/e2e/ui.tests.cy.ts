import PageObject from '../support/page-objects/pageObjectUi';

interface Product {
  title: string;
  availableSizes: string[];
}

describe('test react shopping cart basic functionality', () => {
  const pageObject = new PageObject();
  let products: Product[];

  beforeEach(() => {
    cy.request(
      'https://react-shopping-cart-67954.firebaseio.com/products.json',
    ).then((response: { body: { products: Product[] } }) => {
      products = response.body.products;
    });

    cy.visit('/');
  });

  it('verify that all products are displayed with images, titles, and prices.', () => {
    pageObject.products().should('be.visible');

    pageObject.productImages().should('be.visible');

    pageObject.productTitles().should('be.visible');

    pageObject.productPrices().should('be.visible');
  });
  it('verify that filtering by size works correctly', () => {
    const sizes: string[] = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

    pageObject.products().should('be.visible');

    sizes.forEach((size: string) => {
      const expectedProductTitles: string[] = products
        .filter((product: Product) => product.availableSizes.includes(size))
        .map((product: Product) => product.title);

      cy.intercept('GET', 'products.json').as('getProducts');

      pageObject.clickFilterButton(size);

      cy.wait('@getProducts');

      expectedProductTitles.forEach((title: string) => {
        pageObject.productTitles().should('contain', title);
      });

      pageObject.clickFilterButton(size);

      cy.wait('@getProducts');
    });
  });
  it('verify that multiple filters can be applied simultaneously.', () => {
    pageObject.products().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObject.clickFilterButton('XS');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('M');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('L');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('XXL');

    cy.wait('@getProducts');

    pageObject.validateProductCount();
  });
  it('verify that filters can be cleared/reset', () => {
    pageObject.products().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObject.clickFilterButton('XS');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('XS');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('S');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('S');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('M');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('M');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('ML');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('ML');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('L');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('L');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('XL');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('XL');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('XXL');

    cy.wait('@getProducts');

    pageObject.validateProductCount();

    pageObject.clickFilterButton('XXL');

    cy.wait('@getProducts');

    pageObject.validateProductCount();
  });
  it('verify the correct number of products are visible', () => {
    pageObject.products().should('be.visible');

    pageObject.validateProductCount();
  });
  it('verify that clicking the "add to cart" button adds the product to the cart', () => {
    let productTitle: string, productTitleInCart: string;

    pageObject.products().should('be.visible');

    pageObject
      .productTitles()
      .first()
      .invoke('text')
      .then((text) => {
        productTitle = text;
      });

    pageObject.clickAddToCartButton(0);

    pageObject
      .productTitleInCart()
      .invoke('text')
      .then((text) => {
        productTitleInCart = text;
        expect(productTitle).to.eq(productTitleInCart);
      });
  });
  it('verify that the cart icon updates with the correct number of items', () => {
    pageObject.products().should('be.visible');

    pageObject.clickAddToCartButton(0);

    pageObject.cartIconInCart().should('have.text', '1');
  });
  it('verify that adding multiple items of the same product increases the quantity in the cart.', () => {
    pageObject.products().should('be.visible');

    pageObject.clickAddToCartButton(0);

    pageObject.clickAddToCartButton(0);

    pageObject
      .quantityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 2');
      });
  });
  it('verify that the cart subtotal is calculated accurately.', () => {
    let price1: number, price2: number;

    pageObject.products().should('be.visible');

    pageObject.clickAddToCartButton(0);

    pageObject.clickAddToCartButton(1);

    pageObject
      .priceOfProductInCart()
      .first()
      .invoke('text')
      .then((text) => {
        price1 = parseFloat(text.replace(/[$\s]/g, ''));
      });

    pageObject
      .priceOfProductInCart()
      .eq(1)
      .invoke('text')
      .then((text) => {
        price2 = parseFloat(text.replace(/[$\s]/g, ''));
      });

    pageObject
      .subtotalInCart()
      .invoke('text')
      .then((text) => {
        const subtotal = parseFloat(text.replace(/[$\s]/g, ''));
        expect(price1 + price2).to.eq(subtotal);
      });
  });
  it('verify that users can update the quantity of items in the cart.', () => {
    pageObject.products().should('be.visible');

    pageObject.clickAddToCartButton(0);

    pageObject.clickAddQuantityButton(0);

    pageObject
      .quantityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 2');
      });

    pageObject.clickRemoveQuantityButton(0);

    pageObject
      .quantityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 1');
      });
  });
  it('verify that users can remove items from the cart.', () => {
    pageObject.products().should('be.visible');

    pageObject.clickAddToCartButton(0);

    pageObject.clickAddToCartButton(1);

    pageObject.productsInCart().should('have.length', 2);

    pageObject.clickRemoveProductFromCartButton(0);

    pageObject.productsInCart().should('have.length', 1);

    pageObject.clickRemoveProductFromCartButton(0);

    pageObject.productsInCart().should('not.exist');
  });
});
