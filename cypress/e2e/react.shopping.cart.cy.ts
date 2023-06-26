import PageObjects from '../support/page-objects/pageObjects';

describe('test react shopping cart basic functionality', () => {
  const pageObjects = new PageObjects();

  beforeEach(() => {
    cy.visit('/');
  });

  it('verify that all products are displayed with images, titles, and prices.', () => {
    pageObjects.findProduct().should('be.visible');

    pageObjects.findProductImage().should('be.visible');

    pageObjects.findProductTitle().should('be.visible');

    pageObjects.findProductPrice().should('be.visible');
  });
  it('verify that filtering by size works correctly', () => {
    // this test needs to verify the correct product is being displayed based on size
    pageObjects.findProduct().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObjects.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('S').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('ML').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify that multiple filters can be applied simultaneously.', () => {
    pageObjects.findProduct().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObjects.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify that filters can be cleared/reset', () => {
    pageObjects.findProduct().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObjects.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('S').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('S').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('ML').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('ML').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();

    pageObjects.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify the correct number of products are visible', () => {
    pageObjects.findProduct().should('be.visible');

    pageObjects.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify that clicking the "add to cart" button adds the product to the cart', () => {
    let productTitle: string, productTitleInCart: string;

    pageObjects.findProduct().should('be.visible');

    pageObjects
      .findProductTitle()
      .first()
      .invoke('text')
      .then((text) => {
        productTitle = text;
      });

    pageObjects.findAddToCartButton().first().click();

    pageObjects
      .findProductTitleInCart()
      .invoke('text')
      .then((text) => {
        productTitleInCart = text;
        expect(productTitle).to.eq(productTitleInCart);
      });
  });
  it('verify that the cart icon updates with the correct number of items', () => {
    pageObjects.findProduct().should('be.visible');

    pageObjects.findAddToCartButton().first().click();

    pageObjects.findCartIconInCart().should('have.text', '1');
  });
  it('verify that adding multiple items of the same product increases the quantity in the cart.', () => {
    pageObjects.findProduct().should('be.visible');

    pageObjects.findAddToCartButton().first().click();

    pageObjects.findAddToCartButton().first().click();

    pageObjects
      .findQuanityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 2');
      });
  });
  it('verify that the cart subtotal is calculated accurately.', () => {
    let price1: number, price2: number;

    pageObjects.findProduct().should('be.visible');

    pageObjects.findAddToCartButton().first().click();

    pageObjects.findAddToCartButton().eq(1).click();

    pageObjects
      .findPriceOfProductInCart()
      .first()
      .invoke('text')
      .then((text) => {
        price1 = parseFloat(text.replace(/[$\s]/g, ''));
      });

    pageObjects
      .findPriceOfProductInCart()
      .eq(1)
      .invoke('text')
      .then((text) => {
        price2 = parseFloat(text.replace(/[$\s]/g, ''));
      });

    pageObjects
      .findSubtotalInCart()
      .invoke('text')
      .then((text) => {
        const subtotal = parseFloat(text.replace(/[$\s]/g, ''));
        expect(price1 + price2).to.eq(subtotal);
      });
  });
  it('verify that users can update the quantity of items in the cart.', () => {
    pageObjects.findProduct().should('be.visible');

    pageObjects.findAddToCartButton().first().click();

    pageObjects.findAddQuantityButton().click();

    pageObjects
      .findQuanityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 2');
      });

    pageObjects.findRemoveQuantityButton().click();

    pageObjects
      .findQuanityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 1');
      });
  });
  it('verify that users can remove items from the cart.', () => {
    pageObjects.findProduct().should('be.visible');

    pageObjects.findAddToCartButton().first().click();

    pageObjects.findAddToCartButton().eq(1).click();

    pageObjects.findProductInCart().should('have.length', 2);

    pageObjects.findRemoveProductFromCartButton().first().click();

    pageObjects.findProductInCart().should('have.length', 1);

    pageObjects.findRemoveProductFromCartButton().first().click();

    pageObjects.findProductInCart().should('not.exist');
  });
});
