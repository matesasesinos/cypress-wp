# Install

Clone plugin (project) in your wp-content/plugins folder.

Run `npm install`, then in cypress.config.js change

- BASE_URL: "http://yourdomain.test",
- WP_USER: "admin",
- WP_PASS: "password",

and change

baseUrl: "http://yourdomain.test",

Now you can run `npm run cypress:open` or `npm run cypress:run` for run test