describe("test gutenberg", () => {
  /**
   * Data for login
   */
  beforeEach(() => {
    cy.visit("/wp-admin");
    cy.wait(1000);
    cy.get("#user_login").type(Cypress.env("WP_USER"));
    cy.get("#user_pass").type(Cypress.env("WP_PASS"));
    cy.get("#wp-submit").click();
  });

  /**
   * Create page
   */
  it("create post page", () => {
    cy.get("#menu-pages").click();
    cy.get(".page-title-action").click();
    cy.wait(2000);
    cy.url().should(
      "eq",
      `${Cypress.env("BASE_URL")}/wp-admin/post-new.php?post_type=page`
    );
    cy.wait(2000);
    cy.get(".editor-post-title__input").type("Cypress Hello World Page");
    cy.get(".block-editor-inserter__toggle").click();
    cy.get(".components-search-control__input").type("short");
    cy.wait(1000);
    cy.get(".editor-block-list-item-shortcode").click();
    cy.get(".blocks-shortcode__textarea").type("[hola]");
    cy.get(".editor-post-publish-button__button").click();
    cy.wait(2000);
    cy.get(
      ".editor-post-publish-panel__header .components-button.is-primary"
    ).click();
    cy.wait(2000);
    cy.contains("Ver la página");
    cy.wait(2000)
  });
  /**
   * Verify page
   */
  it("verify page created", () => {
    cy.get("#menu-pages").click();
    cy.contains("Cypress Hello World Page");
  });
});
