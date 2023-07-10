function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
describe("admin test", () => {
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
   * Can access to admin
   */
  it("can access to admin dashboard", () => {
    cy.wait(1000);
    cy.url().should("eq", `${Cypress.env("BASE_URL")}/wp-admin/`);
  });
  /**
   * Can access to admin users
   */
  it("can access to admin users", () => {
    cy.wait(1000);
    cy.visit("/wp-admin/users.php");
    cy.wait(1000);
    cy.get(".page-title-action").click();

    cy.url().should("eq", `${Cypress.env("BASE_URL")}/wp-admin/user-new.php`);
  });

  /**
   * can create a user
   */
  it("can create a user", () => {
    cy.wait(1000);
    cy.visit("/wp-admin/users.php");
    cy.wait(1000);
    cy.get(".page-title-action").click();

    cy.url().should("eq", `${Cypress.env("BASE_URL")}/wp-admin/user-new.php`);
    cy.wait(2000);
    cy.get("#user_login").type(makeid(10));
    cy.get("#email").type(`${makeid(10)}@cosito.com`);
    cy.get("#pass1").type("XXXXXXXXXXXXX");
    cy.get("#first_name").type("Test");
    cy.get("#last_name").type("Cypress");
    cy.get(".wp-generate-pw").click();
    cy.get("#send_user_notification").click();
    cy.get("#createusersub").click();
    cy.wait(1000);
    cy.get(".notice").should("contain", "Nuevo usuario creado.");
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
    cy.get(".block-editor-block-list__layout").click();
    cy.get(
      '.block-editor-block-types-list__item:contains("Paragraph")'
    ).click();
    cy.get(".editor-post-title__input").type("Hello, world!");
    cy.contains("Publish").click();
    cy.contains("Post published.").should("be.visible");
    cy.wait(2000);
    cy.url().should("include", `${Cypress.env("BASE_URL")}/wp-admin/post.php`);
  });
  /**
   * Verify page
   */
  it("verify page created", () => {
    cy.get("#menu-pages").click();
    cy.contains("Título de la página");
  });
});
