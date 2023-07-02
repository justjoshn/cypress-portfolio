import PageObject from '../support/page-objects/pageObjectUi';

describe('test react shopping cart basic functionality', () => {
  const pageObject = new PageObject();

  beforeEach(() => {
    cy.visit('/');
  });

  it('verify that all products are displayed with images, titles, and prices.', () => {
    pageObject.findProduct().should('be.visible');

    pageObject.findProductImage().should('be.visible');

    pageObject.findProductTitle().should('be.visible');

    pageObject.findProductPrice().should('be.visible');
  });
  it('verify that filtering by size works correctly', () => {
    // this test needs to verify the correct product is being displayed based on size
    pageObject.findProduct().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObject.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('S').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('ML').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify that multiple filters can be applied simultaneously.', () => {
    pageObject.findProduct().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObject.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify that filters can be cleared/reset', () => {
    pageObject.findProduct().should('be.visible');

    cy.intercept('GET', 'products.json').as('getProducts');

    pageObject.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XS').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('S').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('S').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('M').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('ML').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('ML').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('L').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();

    pageObject.findFilterButton('XXL').click();

    cy.wait('@getProducts');

    pageObject.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify the correct number of products are visible', () => {
    pageObject.findProduct().should('be.visible');

    pageObject.verifyCorrectAmountOfProductsAreVisible();
  });
  it('verify that clicking the "add to cart" button adds the product to the cart', () => {
    let productTitle: string, productTitleInCart: string;

    pageObject.findProduct().should('be.visible');

    pageObject
      .findProductTitle()
      .first()
      .invoke('text')
      .then((text) => {
        productTitle = text;
      });

    pageObject.findAddToCartButton().first().click();

    pageObject
      .findProductTitleInCart()
      .invoke('text')
      .then((text) => {
        productTitleInCart = text;
        expect(productTitle).to.eq(productTitleInCart);
      });
  });
  it('verify that the cart icon updates with the correct number of items', () => {
    pageObject.findProduct().should('be.visible');

    pageObject.findAddToCartButton().first().click();

    pageObject.findCartIconInCart().should('have.text', '1');
  });
  it('verify that adding multiple items of the same product increases the quantity in the cart.', () => {
    pageObject.findProduct().should('be.visible');

    pageObject.findAddToCartButton().first().click();

    pageObject.findAddToCartButton().first().click();

    pageObject
      .findQuanityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 2');
      });
  });
  it('verify that the cart subtotal is calculated accurately.', () => {
    let price1: number, price2: number;

    pageObject.findProduct().should('be.visible');

    pageObject.findAddToCartButton().first().click();

    pageObject.findAddToCartButton().eq(1).click();

    pageObject
      .findPriceOfProductInCart()
      .first()
      .invoke('text')
      .then((text) => {
        price1 = parseFloat(text.replace(/[$\s]/g, ''));
      });

    pageObject
      .findPriceOfProductInCart()
      .eq(1)
      .invoke('text')
      .then((text) => {
        price2 = parseFloat(text.replace(/[$\s]/g, ''));
      });

    pageObject
      .findSubtotalInCart()
      .invoke('text')
      .then((text) => {
        const subtotal = parseFloat(text.replace(/[$\s]/g, ''));
        expect(price1 + price2).to.eq(subtotal);
      });
  });
  it('verify that users can update the quantity of items in the cart.', () => {
    pageObject.findProduct().should('be.visible');

    pageObject.findAddToCartButton().first().click();

    pageObject.findAddQuantityButton().click();

    pageObject
      .findQuanityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 2');
      });

    pageObject.findRemoveQuantityButton().click();

    pageObject
      .findQuanityOfProductInCart()
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Quantity: 1');
      });
  });
  it('verify that users can remove items from the cart.', () => {
    pageObject.findProduct().should('be.visible');

    pageObject.findAddToCartButton().first().click();

    pageObject.findAddToCartButton().eq(1).click();

    pageObject.findProductInCart().should('have.length', 2);

    pageObject.findRemoveProductFromCartButton().first().click();

    pageObject.findProductInCart().should('have.length', 1);

    pageObject.findRemoveProductFromCartButton().first().click();

    pageObject.findProductInCart().should('not.exist');
  });
});
