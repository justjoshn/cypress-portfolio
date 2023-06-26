# cypress-portfolio

## Joshua Humphrey's Cypress Automation Framework with Typescript portfolio.

This repo runs the following test cases:

1. Verify that all products are displayed with images, titles, and prices.
2. Verify that filtering by size works correctly.
3. Verify that multiple filters can be applied simultaneously.
4. Verify that filters can be cleared/reset.
5. Verify that the correct number of products is displayed.
6. Verify that clicking the "Add to Cart" button adds the product to the cart.
7. Verify that the cart icon updates with the correct number of items.
8. Verify that adding multiple items of the same product increases the quantity in the cart.
9. Verify that the cart subtotal and total are calculated accurately.
10. Verify that users can update the quantity of items in the cart.
11. Verify that users can remove items from the cart.

on https://react-shopping-cart-67954.firebaseapp.com/

to run the tests headless:
yarn cypress run

to run the tests headed:
yarn cypress open -> click E2E Testing -> click Start E2E Testing -> click react.shopping.cart.cy.ts

cypress will create a video of the tests running and add it to the /cypress/videos folder
