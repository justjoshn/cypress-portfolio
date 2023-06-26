import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://react-shopping-cart-67954.firebaseapp.com/',
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
