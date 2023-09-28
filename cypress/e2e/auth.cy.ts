describe("auth spec", () => {
  const user = {
    email: "teste@email.com",
    password: "123456",
  };

  it("should be able to sign in", () => {
    signInWithForm(user);
  });

  it("should be able to sign out", () => {
    signInWithForm(user);

    // Click on the sign out button
    cy.get("button").click();

    // Verify if the user was redirected to the sign in page
    cy.url().should("equal", "http://localhost:3000/signin");
  });

  it("should not be able to sign in without and e-mail", () => {
    cy.visit("http://localhost:3000/");

    // Fill out the sign in form
    cy.get('[placeholder="Password"]').type(user.password);
    cy.get("button").click();

    cy.url({ timeout: 5000 }).should("equal", "http://localhost:3000/signin");
  });
});

function signInWithForm(user: { email: string; password: string }) {
  // Should be redirected to sign in page
  cy.visit("http://localhost:3000/");

  // Check if he was redirected to sign in page
  cy.url().should("equal", "http://localhost:3000/signin");

  // Fill out the sign in form
  cy.get('[placeholder="Email"]').type(user.email);
  cy.get('[placeholder="Password"]').type(user.password);
  cy.get("button").click();

  // Should be redirected to home page
  cy.url({ timeout: 5000 }).should("equal", "http://localhost:3000/");
}
