import { test, expect } from "@playwright/test";

test.describe("(login)", () => {
  test.beforeEach(async ({ page }) => {
    // Aller à la page d'acceuil de l'application
    await page.goto("/");
    // Vérifier que le titre de la page est "Swag Labs"
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test("logs in and visits the store", async ({ page }) => {
    // Remplir le champ username
    await page.getByTestId("username").fill("standard_user");

    // Rempir le champ password
    await page.getByTestId("password").fill("secret_sauce");

    // Cliquer sur le bouton login pour se connecter
    await page.getByTestId("login-button").click();

    // Vérifier que l'utilisateur est connecté et redirigé vers la page des produits
    await expect(page).toHaveURL(/inventory.html/);

    // Vérifier que la page produit est visible et contient au moins deux produits
    await expect(page.getByTestId("title")).toHaveText("Products");
    await expect(page.getByTestId("inventory-list")).toBeVisible();
    await expect(page.getByTestId("inventory-item")).toHaveCount(6);
  }),
    test("shows a login error for locked out user", async ({ page }) => {
      await 5000;
      // Remplir le champ username
      await page.getByPlaceholder("username").fill("locked_out_user");

      // Rempir le champ password
      const passwordField = await page.getByTestId("password");
      passwordField.fill("secret_sauce");

      // Cliquer sur le bouton login pour se connecter
      await page.getByTestId("login-button").click();

      await expect(page.getByTestId("username")).toHaveClass(
        "input_error form_input error"
      );
      await expect(passwordField).toHaveClass("input_error form_input error");
      await expect(page).toHaveURL("/");

      const errorMessage = await page.getByTestId("error").filter({
        hasText: `Epic sadface: Sorry, 
        this user has been locked out.`,
      });
      await expect(errorMessage).toBeVisible();

      await page.getByTestId("error-button").click();
      await expect(errorMessage).not.toBeVisible();
    });
});
