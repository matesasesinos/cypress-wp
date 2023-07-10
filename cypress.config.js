const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    BASE_URL: "http://wordpress.test",
    WP_USER: "cypress",
    WP_PASS: "patraz01",
  },
  e2e: {
    baseUrl: "http://wordpress.test",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false
});
