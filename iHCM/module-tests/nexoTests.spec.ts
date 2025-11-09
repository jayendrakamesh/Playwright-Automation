import { test, expect } from "@playwright/test";
import { chromium } from "playwright-core";
import { nexoLoginPageTranslations as translations, NexoLoginPage } from "../page-object-models/nexoPom";
import { NavBar } from "../page-object-models/navBarPom.ts";
import { OnboardingPages} from "../page-object-models/onboardingPom.ts"
import { baseCreds } from "../global-data/globalCredentials.js";
import { text } from "stream/consumers";

//Test 0 - Prerequisite to login and save authentication states of users
test("0 - Login and save authentication states of important users", async ({page}) => {

  const nexoLoginPage = new NexoLoginPage(page);

  await page.goto("https://preprod.ihcm.adp.com/");
  nexoLoginPage.expertLogin();

  await page.getByRole('button', { name: 'Show user menu' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
});

//Test 1 - Nexo login page ui verifications
translations.forEach(language => {

  test(`1.1 - Language check - ${language.menuItem}`, async ({ page }) => {
  await page.goto("https://preprod.ihcm.adp.com/");
  const nexoLoginPage = new NexoLoginPage(page);

  await nexoLoginPage.languageDropdown.click();
  await page.getByRole("menuitem", { name: language.menuItem }).click();

  await nexoLoginPage.lockIconInfo.hover();
  await expect(nexoLoginPage.lockIconInfo).toContainText(language.lockInfo);

  await expect(nexoLoginPage.languageDropdown).toContainText(language.languageDropdown);
  await expect(nexoLoginPage.welcomeMessage).toContainText(language.welcomeMessage);
  await expect(nexoLoginPage.userIdLabel).toContainText(language.userIdLabel);
  await expect(nexoLoginPage.rememberUserIdCheckbox).toContainText(language.rememberUserIdCheckbox);

  await nexoLoginPage.rememberUserIdInfo.click();
  await expect(nexoLoginPage.rememberUserIdInfo).toContainText(language.rememberUserIdInfo);

  await nexoLoginPage.rememberUserIdCheckbox.click();
  await expect(nexoLoginPage.rememberUserIdBanner).toContainText(language.rememberUserIdBanner);

  await expect(nexoLoginPage.needHelpSigningInLink).toContainText(language.needHelpSigningInLink);
  await expect(nexoLoginPage.nextButton).toContainText(language.nextButton);

  await nexoLoginPage.userIdField.fill("EDWARD.D.NEWGATEE");
  await nexoLoginPage.userIdField.press("Enter");

  await expect(nexoLoginPage.nextButton).toContainText(language.nextButton);
  await expect(nexoLoginPage.passwordLabel).toContainText(language.passwordLabel);
  await nexoLoginPage.passwordField.fill("New@321");
  await expect(nexoLoginPage.signInButton).toContainText(language.signInButton);
  await nexoLoginPage.passwordField.press("Enter");

  await expect(nexoLoginPage.errorBanner).toContainText(language.errorBanner);

  });

});

//Test 2 - Onboard and verify new user creation
test.describe(() => {

test.use({ storageState: './iHCM/global-data/Auth/expertAuth.json' });

  test('2.1 - Onboard new user - ', async ({ page }) => {

    await page.goto("https://preprod.ihcm.adp.com/");
    const navBar = new NavBar(page);
    const onboardingPages = new OnboardingPages(page);
    const nexoLoginPage = new NexoLoginPage(page);

    try{
      nexoLoginPage.closeLoginPopup();
    }
    catch{

    }

    await navBar.menuButton.click();
    await onboardingPages.actionsMenu.click();
    await onboardingPages.actionsMenu.locator(':text("Onboarding")');
    await onboardingPages.page.locator('add-employee').click();
  });
});
 