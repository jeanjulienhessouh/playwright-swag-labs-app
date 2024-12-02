import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();
  await expect(page).toHaveURL(/inventory.html/);
});

test("has an item with specific details", async ({ page }) => {
  // S'assurer qu'il y a un produit avec les détails suivants:
  // nom: "Sauce Labs Bike Light"
  // description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
  // prix: $9.99

  const item = page.locator(".inventory_item").filter({
    has: page.locator(".inventory_item_name", {
      hasText: "Sauce Labs Bike Light",
    }),
  });

  await expect(item).toBeVisible();

  const itemDesc = item.locator(".inventory_item_desc");
  await expect(itemDesc).toHaveText(
    `A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.`
  );

  const itemPrice = item.locator(".inventory_item_price");
  await expect(itemPrice).toHaveText("$9.99");
});
