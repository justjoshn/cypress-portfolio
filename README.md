# Cypress-Portfolio: UI & API Testing Framework

Welcome to Joshua Humphrey's portfolio project, an Automation Framework leveraging Cypress and TypeScript. This repository showcases automated test cases for both UI and API components, targeting a [React Shopping Cart demo application](https://react-shopping-cart-67954.firebaseapp.com/) and the [JSONPlaceholder API](https://jsonplaceholder.typicode.com).

## Test Cases

### UI Test Cases

The following UI test cases are run against the [React Shopping Cart application](https://react-shopping-cart-67954.firebaseapp.com/):

1. Test that all products are displayed with their images, titles, and prices.
2. Test that filtering by size works correctly and displays the expected number of products.
3. Test that multiple filters can be applied simultaneously and displays the expected number of products.
4. Test that filters can be cleared/reset, returning the product display to its default state.
5. Test that the correct number of products are displayed based on the filters applied.
6. Test that clicking the "add to cart" button adds the product to the cart and the product in the cart matches the one added.
7. Test that the cart icon updates with the correct number of items when products are added to the cart.
8. Test that adding multiple items of the same product increases the quantity in the cart.
9. Test that the cart subtotal is calculated accurately when multiple products are added.
10. Test that users can update the quantity of items in the cart, and the displayed quantity matches the updates.
11. Test that users can remove items from the cart and the removed items no longer appear in the cart.

### API Test Cases

The following API test cases are run against the [JSONPlaceholder API](https://jsonplaceholder.typicode.com):

1. GET /posts: Check if the API response status for getting all posts is 200.
2. GET /posts: Check if the response body for getting all posts has all the expected keys 'id', 'title', 'body', and 'userId'.
3. GET /posts: Check if the response time for getting all posts is less than 200 ms.
4. GET /postss: Check if the API response status for an invalid endpoint is 404.
5. GET /posts/1: Check if the API response status for getting the first post is 200.
6. GET /posts/1: Check if the response body for getting the first post has all the expected keys 'id', 'title', 'body', and 'userId'.
7. GET /posts/1: Check if the response time for getting the first post is less than 200 ms.
8. GET /posts/999999: Check if the API response status for getting a non-existent post is 404.
9. POST /posts: Check if the API response status for creating a post is 201.
10. POST /posts: Check if the response body for creating a post correctly reflects the posted data.
11. PUT /posts/1: Check if the API response status for updating the first post is 200.
12. PUT /posts/1: Check if the response body for updating the first post correctly reflects the updated data.
13. DELETE /posts/1: Check if the API response status for deleting the first post is 200.

## Getting Started

You need Node.js and Yarn installed on your computer. If not installed, follow these steps:

1. Download and install Node.js from the [official website](https://nodejs.org/en/download/).
2. Install Yarn, a package manager that needs Node.js to work. Use the following command to install Yarn:

```bash
npm install -g yarn
```

Note: You might need to use sudo (for Mac) or run your command shell as Administrator (for Windows) to install the packages globally.

## Clone and Install Dependencies

To clone the repository and install the necessary dependencies, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/justjoshn/cypress-portfolio.git
```

2. Navigate to the project directory and install the dependencies:

```bash
cd cypress-portfolio
yarn install
```

## Running Tests

Several commands are available to run the tests:
Run all tests in headless mode:

```bash
yarn cy:runall
```

Run UI tests only (headless):

```bash
yarn cy:runui
```

Run API tests only (headless):

```bash
yarn cy:runapi
```

To run the tests with the Cypress Test Runner (headed):

```bash
yarn cypress open
```

After running the command, follow these steps:

1. Click on 'E2E Testing'.
2. Click on 'Start E2E Testing'.
3. Click on either 'api.tests.cy.ts' or 'ui.tests.cy.ts' to run the corresponding tests.

Cypress will create a video of the tests running and save it to the `/cypress/videos` folder. You can view this video for a visual walkthrough of the test execution.

For any questions or issues while setting up or running the tests, feel free to contact me.
