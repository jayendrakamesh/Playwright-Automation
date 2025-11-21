import { test, expect } from "@playwright/test";
import { chromium } from "playwright-core";
import { NexoLoginPage } from "../page-object-models/nexoPom.ts";
import { NavBar } from "../page-object-models/navBarPom.ts";
import { baseCreds } from "../global-data/globalCredentials.js";
import { EventRemindersPages } from "../page-object-models/eventRemindersPom.ts";

//Test 0 - Prerequisite to login and save authentication states of users
test("0 - Login and save authentication states of important users", async ({page}) => { test.setTimeout(60000);

  const nexoLoginPage = new NexoLoginPage(page);

  await page.goto("https://preprod.ihcm.adp.com/");
  await nexoLoginPage.expertLogin();

  await page.getByRole('button', { name: 'Show user menu' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
});

//Test 1 - Create Reminder
test.describe(() => { 

    test.use({ storageState: './iHCM/global-data/Auth/expertAuth.json' });
    test("1 - Create reminder", async ({page}) => { test.setTimeout(120000);

        const navBar = new NavBar(page);
        const eventReminderPages = new EventRemindersPages(page);

        await page.goto("https://preprod.ihcm.adp.com/");
        await navBar.systemSettings.click();
        await page.getByText('Reminders').click();

        await eventReminderPages.reminderAddButton.click();

        await page.getByLabel('Reminder name').fill('Playwright Reminder 1');
        await page.getByRole('button', { name: 'Based on *' }).click();
        await page.getByRole('option', { name: 'Date of birth' }).click()
        await page.getByLabel('How many days before do you want to send the reminder?').fill('1');
        await page.getByLabel('Do you want to send it only once or every year?').getByRole('radio', { name: 'Once' }).click();
        await page.getByLabel('Is it for a specific anniversary, for example, a long service award?').getByRole('radio', { name: 'No' }).click();
        await page.getByLabel('Select a status for the reminder').getByRole('radio', { name: 'Active', exact: true }).click();
        await page.getByRole('button', {name: 'Next'});

    });
});
