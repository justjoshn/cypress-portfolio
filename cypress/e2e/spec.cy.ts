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
    let productTitle: string;
    let productTitleInCart: string;

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
  it('verify that the cart icon updates with the correct number of items.', () => {});
});
