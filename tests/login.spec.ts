import { test, expect } from "@playwright/test";

test("navigates to the login page", async ({ page }) => {
  // Aller à la page d'acceuil de l'application
  await page.goto("/");

  // Vérifier que le titre de la page est "Swag Labs"
  await expect(page).toHaveTitle(/Swag Labs/);
});

test("logs in and visits the store", async ({ page }) => {
  // Aller à la page d'acceuil de l'application
  await page.goto("/");

  // Vérifier que le titre de la page est "Swag Labs"
  await expect(page).toHaveTitle(/Swag Labs/);

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
});
