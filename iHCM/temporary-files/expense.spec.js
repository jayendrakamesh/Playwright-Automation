import { test, expect } from "@playwright/test";
import { users } from "./test.js";

console.log(users);
function randomName(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let name = "";
  for (let i = 0; i < length; i++) {
    name += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return name;
}
let expenseType;
console.log(expenseType);
let expenseName;
console.log(expenseName);
let amount = 5000;
let detnum = 200;
let deduction = detnum.toFixed(2);

test.beforeEach("preprod url", async ({ page }) => {
  await page.goto(
    "https://online.emea.staging.ehc.adp.com/signin/v1?APPID=IHCM&productId=a8ebf182-b6f5-1d78-e053-36004b0b46e8&returnURL=https://preprod.ihcm.adp.com/_index/&callingAppId=IHCM&TARGET=-SM-https://preprod.ihcm.adp.com/_index/"
  );
});

test.afterEach("close browser", async ({ page }) => {
  page.close();
});

test.afterEach(async ({ context }) => {
  await context.clearCookies();
  await context.clearPermissions();

  // await page.evaluate(() => {
  //   window.localStorage.clear();
  //   window.sessionStorage.clear();
  //   caches.keys().then((keys) => {
  //     keys.forEach((key) => caches.delete(key));
  //   });
  // });
});

test.describe("Expense Creation - 1 stage", () => {
  test("Expense type", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();

    await page.getByRole("link", { name: "Expert", exact: true }).click();
    await page.locator("#left-nav svg").nth(3).click();
    await page.getByRole("link", { name: "Expenses" }).click();
    page.reload();
    await page.getByRole("link", { name: "Expense types" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.locator("#expenseTypes").click();
    expenseType = randomName(8).toUpperCase();
    console.log(expenseType);
    await page.locator("#expenseTypes").fill(`${expenseType}`);
    await page.locator(".selectize-input").click();
    await page
      .getByRole("option", { name: "Amount" })
      .locator("div")
      .first()
      .click();
    await page.locator("label").filter({ hasText: "Active" }).click();
    await page
      .locator("li > div > .responsive-section > .form-group > .flx-grid")
      .click();
    await page.getByRole("button", { name: "Stages" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by Manager").click();
    await page.locator("#submit-btn").click();

    await page.getByRole("button", { name: "Save" }).click();
    test.slow();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });
  test("ESS Submission", async ({ page }) => {
    console.log(users.employee.userName);
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    expenseName = "report " + randomName(3);
    await page.getByRole("textbox", { name: "Title *" }).fill(`${expenseName}`);
    console.log(expenseName);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("mss-approval", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();

    // await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();
    await page.getByText("bran", { exact: true }).click();

    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    // await page.getByRole("button", { name: "Load more" }).click();
    await page.getByText(`${expenseName}`).first().click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Approve" })
      .click();
    await page.getByRole("button", { name: "Submit" }).click();
  });
});

test.describe("1 stage - MSS Rejection", () => {
  test("expense-ess-creation", async ({ page }) => {
    console.log(expenseType);
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    console.log(expenseName);
    expenseName = "report " + randomName(3);
    await page.getByRole("textbox", { name: "Title *" }).fill(`${expenseName}`);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    page.close();
  });

  test("mss-rejection", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    await page.getByText(`${expenseName}`).first().click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Reject" })
      .click();
    await page.getByRole("textbox", { name: "Add any comment *" }).click();
    await page
      .getByRole("textbox", { name: "Add any comment *" })
      .fill("rejected");
    await page.getByRole("button", { name: "Submit" }).click();
    page.close();
  });
});

test.describe("1 stage - rejected - resubmit", () => {
  test("ESS resubmission", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    await page.getByRole("heading", { name: `${expenseName}` }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });
  test("mss-rejection", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    await page.getByText(`${expenseName}`).first().click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Reject" })
      .click();
    await page.getByRole("textbox", { name: "Add any comment *" }).click();
    await page
      .getByRole("textbox", { name: "Add any comment *" })
      .fill("rejected");
    await page.getByRole("button", { name: "Submit" }).click();
    page.close();
  });
});

test.describe("1 stage - mss rejected - delete", () => {
  test("Ess deletion", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    const expenseItems = await page.locator(
      "li.my-expense-listing__card.flx-card.ng-scope"
    );

    for (let i = 0; i < (await expenseItems.count()); i++) {
      const expenseItem = expenseItems.nth(i);

      const titleText = await expenseItem
        .locator("h2.flx-card__title.title.ng-binding")
        .innerText();

      if (titleText.trim() === expenseName) {
        const deleteButton = expenseItem.locator('button:has-text("Delete")');
        await deleteButton.click();
        console.log("Delete button clicked.");
        // await page.getByRole("button", { name: "Ok" }).click();
      }
    }
  });
});

test.describe("Expense Creation - 2 stages", () => {
  test("Expense Type", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.getByRole("link", { name: "Expert", exact: true }).click();
    await page.locator("#left-nav svg").nth(3).click();
    await page.getByRole("link", { name: "Expenses" }).click();
    await page.getByRole("link", { name: "Expense types" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.locator("#expenseTypes").click();
    expenseType = randomName(8).toUpperCase();
    console.log(expenseType);
    await page.locator("#expenseTypes").fill(expenseType);
    await page.locator(".selectize-input").click();
    await page
      .getByRole("option", { name: "Amount" })
      .locator("div")
      .first()
      .click();
    await page.locator("label").filter({ hasText: "Receipt" }).first().click();
    await page.locator("label").filter({ hasText: "Active" }).click();
    await page
      .locator("li > div > .responsive-section > .form-group > .flx-grid")
      .click();
    await page.getByRole("button", { name: "Stages" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by Manager").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by 2nd line manager").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Save" }).click();
    test.slow();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    await page.getByText(`${expenseType}`).click();
    await page.getByRole("button", { name: "Deduction" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("textbox", { name: "Deduction *" }).click();
    await page
      .getByRole("textbox", { name: "Deduction *" })
      .fill(`${deduction}`);
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Everybody").click();
    await page
      .getByRole("listitem")
      .filter({ hasText: "Valid From *" })
      .getByLabel("Select date")
      .click();
    await page.getByRole("gridcell", { name: "1", exact: true }).click();
    await page
      .getByRole("listitem")
      .filter({ hasText: "Valid To *" })
      .getByLabel("Select date")
      .click();
    await page.getByRole("textbox", { name: "Valid To *" }).click();
    await page.getByRole("textbox", { name: "Valid To *" }).fill("01/01/2029");
    await page.getByRole("button", { name: "Save" }).click();
  });

  test("ESS Submission", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    expenseName = "report " + randomName(3);
    await page.getByRole("textbox", { name: "Title *" }).fill(expenseName);
    console.log(expenseName);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByText("Upload attachment").click();
    await page.setInputFiles(
      'input[type="file"]',
      "C:\\Users\\msushma\\Downloads\\Dependants (2).xlsx"
    );
    await page.waitForSelector("text=Dependants (2).xlsx", { timeout: 5000 });
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByRole("heading", { name: `${expenseName}` }).click();
    test.slow();
    await page.getByRole("heading", { name: `${expenseType}` }).click();

    console.log(expenseName);
    await expect(
      page.locator(
        "#modal-top > div > div.flx-dialog__content > form > bootstrap-decorator > div > div > ul > li:nth-child(10) > dl > dd"
      )
    ).toBeVisible(deduction);
    console.log("deduction verified");
    await page
      .getByRole("dialog")
      .filter({ hasText: "View Expense Expense type" })
      .getByLabel("Close")
      .click();
  });

  test("mss-approval", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();

    console.log(expenseName);
    console.log(expenseType);
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    console.log(expenseName);
    await page.getByText(`${expenseName}`).click();
    await page.getByRole("heading", { name: `${expenseType}` }).click();

    await expect(
      page.locator(
        "#modal-top > div > div.flx-dialog__content > form > bootstrap-decorator > div > div > ul > li:nth-child(10) > dl > dd"
      )
    ).toBeVisible(deduction);
    console.log("deduction verified");
    await page
      .getByRole("dialog")
      .filter({ hasText: "View Expense Expense type" })
      .getByLabel("Close")
      .click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Approve" })
      .click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("hr-approval", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expenses" })
      .click();
    test.slow();
    console.log(expenseName);
    console.log(expenseType);
    await page.getByRole("link", { name: "Monitor expense requests" }).click();
    test.slow();
    // while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
    //   await page.getByRole("button", { name: "Load more" }).click();
    //   await page.waitForTimeout(2000);
    // }

    await page.waitForSelector("table tbody tr");
    const rows = await page.$$("table tbody tr");
    for (const row of rows) {
      const reportNamecolumn = await row.$("td:nth-child(2)");
      const reportNametext = await reportNamecolumn.innerText();
      if (reportNametext?.trim().toLowerCase() === expenseName.toLowerCase()) {
        const ellipsis = await row.$("i.fa-ellipsis-h");
        if (ellipsis) {
          await ellipsis.click();
        }
      }
    }
    // await page.getByRole('button', { name: 'Toggle actions-' }).click();
    // await expect(page.getByText("textbox", { name: "200.00" })).toHaveValue(
    //   amount
    // );
    await page.getByRole("button", { name: "Approve" }).click();
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });
});

test.describe("HR Rejection", () => {
  test("ESS Submission", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    expenseName = "report " + randomName(3);
    console.log(expenseName);
    console.log(expenseType);
    await page.getByRole("textbox", { name: "Title *" }).fill(`${expenseName}`);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("mss-approval", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    console.log(expenseName);
    console.log(expenseType);
    await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();

    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    console.log(expenseName);
    await page.getByText(`${expenseName}`).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Approve" })
      .click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("hr-reject", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expenses" })
      .click();
    test.slow();
    await page.getByRole("link", { name: "Monitor expense requests" }).click();
    test.slow();
    await page.getByRole("button", { name: "Load more" }).click();

    await page.waitForSelector("table tbody tr");
    // const expenseNamenew = "test 4"
    const rows = await page.$$("table tbody tr");
    for (const row of rows) {
      const reportNamecolumn = await row.$("td:nth-child(2)");
      const reportNametext = await reportNamecolumn.innerText();
      if (reportNametext?.trim().toLowerCase() === expenseName.toLowerCase()) {
        const ellipsis = await row.$("i.fa-ellipsis-h");
        if (ellipsis) {
          await ellipsis.click();
        }
      }
    }
    await page.getByRole("button", { name: "Reject" }).click();
    await page.getByRole("textbox", { name: "Add any comment *" }).click();
    await page
      .getByRole("textbox", { name: "Add any comment *" })
      .fill("rejected by hr");
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByText("Your request has been submitted")
    ).toBeVisible();
  });
});

test.describe("Expense type - 3 stages", () => {
  test("Expense Type", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.getByRole("link", { name: "Expert", exact: true }).click();
    await page.locator("#left-nav svg").nth(3).click();
    await page.getByRole("link", { name: "Expenses" }).click();
    await page.getByRole("link", { name: "Expense types" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.locator("#expenseTypes").click();
    expenseType = randomName(8).toUpperCase();
    console.log(expenseType);
    await page.locator("#expenseTypes").fill(expenseType);
    await page.locator(".selectize-input").click();
    await page
      .getByRole("option", { name: "Amount" })
      .locator("div")
      .first()
      .click();
    await page.locator("label").filter({ hasText: "Active" }).click();
    await page
      .locator("li > div > .responsive-section > .form-group > .flx-grid")
      .click();
    await page.getByRole("button", { name: "Stages" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by Manager").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by 2nd line manager").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by 3rd line manager").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Save" }).click();
    test.slow();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });

  test("ESS Submission", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    expenseName = "report " + randomName(3);
    await page.getByRole("textbox", { name: "Title *" }).fill(expenseName);
    console.log(expenseName);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("mss-approval", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();

    console.log(expenseName);
    console.log(expenseType);
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    console.log(expenseName);
    await page.getByText(`${expenseName}`).click();

    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Approve" })
      .click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("2nd line manager", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expenses" })
      .click();
    test.slow();
    console.log(expenseName);
    console.log(expenseType);
    await page.getByRole("link", { name: "Monitor expense requests" }).click();
    test.slow();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }

    await page.waitForSelector("table tbody tr");
    const rows = await page.$$("table tbody tr");
    for (const row of rows) {
      const reportNamecolumn = await row.$("td:nth-child(2)");
      const reportNametext = await reportNamecolumn.innerText();
      if (reportNametext?.trim().toLowerCase() === expenseName.toLowerCase()) {
        const ellipsis = await row.$("i.fa-ellipsis-h");
        if (ellipsis) {
          await ellipsis.click();
        }
      }
    }
    await page.getByRole("button", { name: "Approve" }).click();
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });

  test("3rd-line-manager", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.thirdlinemanager.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.thirdlinemanager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expenses" })
      .click();
    test.slow();
    console.log(expenseName);
    console.log(expenseType);
    await page.getByRole("link", { name: "Monitor expense requests" }).click();
    test.slow();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }

    await page.waitForSelector("table tbody tr");
    const rows = await page.$$("table tbody tr");
    for (const row of rows) {
      const reportNamecolumn = await row.$("td:nth-child(2)");
      const reportNametext = await reportNamecolumn.innerText();
      if (reportNametext?.trim().toLowerCase() === expenseName.toLowerCase()) {
        const ellipsis = await row.$("i.fa-ellipsis-h");
        if (ellipsis) {
          await ellipsis.click();
        }
      }
    }
    await page.getByRole("button", { name: "Approve" }).click();
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });
});

test.describe("Global HR approval stage", () => {
  test("Expense Type", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.getByRole("link", { name: "Expert", exact: true }).click();
    await page.locator("#left-nav svg").nth(3).click();
    await page.getByRole("link", { name: "Expenses" }).click();
    await page.getByRole("link", { name: "Expense types" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.locator("#expenseTypes").click();
    expenseType = randomName(8).toUpperCase();
    console.log(expenseType);
    await page.locator("#expenseTypes").fill(expenseType);
    await page.locator(".selectize-input").click();
    await page
      .getByRole("option", { name: "Amount" })
      .locator("div")
      .first()
      .click();
    await page.locator("label").filter({ hasText: "Active" }).click();
    await page
      .locator("li > div > .responsive-section > .form-group > .flx-grid")
      .click();
    await page.getByRole("button", { name: "Stages" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by HR Professional").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Save" }).click();
    test.slow();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });

  test("ESS Submission", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    expenseName = "report " + randomName(3);
    await page.getByRole("textbox", { name: "Title *" }).fill(expenseName);
    console.log(expenseName);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("Global HR", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.globalhr.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.globalhr.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expenses" })
      .click();
    test.slow();
    console.log(expenseName);
    console.log(expenseType);
    await page.getByRole("link", { name: "Monitor expense requests" }).click();
    test.slow();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }

    await page.waitForSelector("table tbody tr");
    const rows = await page.$$("table tbody tr");
    for (const row of rows) {
      const reportNamecolumn = await row.$("td:nth-child(2)");
      const reportNametext = await reportNamecolumn.innerText();
      if (reportNametext?.trim().toLowerCase() === expenseName.toLowerCase()) {
        const ellipsis = await row.$("i.fa-ellipsis-h");
        if (ellipsis) {
          await ellipsis.click();
        }
      }
    }
    await page.getByRole("button", { name: "Approve" }).click();
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });
});

test.describe("Expense draft - stage update", () => {
  test("ESS expense draft", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByText("Add report").click();
    expenseName = "report " + randomName(3);
    await page.getByRole("textbox", { name: "Title *" }).fill(expenseName);
    console.log(expenseName);
    test.slow();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Add expense" })
      .click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page
      .getByRole("searchbox", { name: "Select box" })
      .fill(`${expenseType}`);
    // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
    await page
      .getByRole("option", { name: `${expenseType}` })
      .locator("div")
      .first()
      .click();
    await page.getByRole("button", { name: "Select date" }).click();
    await page.getByRole("button", { name: "Today" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).click();
    await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
    await page.getByRole("button", { name: "Save" }).click();
    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Close" })
      .click();
  });

  test("Expense Type update", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.hradmin.username);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.hradmin.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.getByRole("link", { name: "Expert", exact: true }).click();
    await page.locator("#left-nav svg").nth(3).click();
    await page.getByRole("link", { name: "Expenses" }).click();
    await page.getByRole("link", { name: "Expense types" }).click();
    await page.getByText(`${expenseType}`).click();
    await page.getByRole("button", { name: "Stages" }).click();
    await page.getByRole("button", { name: "Toggle actions-" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Yes" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("searchbox", { name: "Select box" }).click();
    await page.getByText("Approval by Manager").click();
    await page.locator("#submit-btn").click();
    await page.getByRole("button", { name: "Save" }).click();

    test.slow();
    await expect(
      page.getByText("Your changes have been successfully saved.")
    ).toBeVisible();
  });

  test("ESS expense draft - submit", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
    await page.getByRole("heading", { name: `${expenseName}` }).click();
    test.slow();
    await page.getByRole("button", { name: "Submit" }).click();
  });

  test("updated stage - MSS approval", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.manager.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.manager.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/team/home");
    test.slow();
    await page
      .locator("#openInbox")
      .getByRole("button", { name: "Inbox" })
      .click();
    test.slow();
    await page
      .locator('sdf-tab[tabindex="-1"]:has-text("Notifications")')
      .click();

    await page.getByRole("button", { name: "View all" }).click();
    await page
      .locator('button.flx-btn:has-text("Expense Report submitted by")')
      .first()
      .click();

    console.log(expenseName);
    console.log(expenseType);
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    await page.locator("sdf-avatar").filter({ hasText: "BS" }).click();
    while (await page.getByRole("button", { name: "Load more" }).isVisible()) {
      await page.getByRole("button", { name: "Load more" }).click();
      await page.waitForTimeout(2000);
    }
    console.log(expenseName);
    await page.getByText(`${expenseName}`).click();

    await page
      .locator("#modal-top")
      .getByRole("button", { name: "Approve" })
      .click();
    await page.getByRole("button", { name: "Submit" }).click();
  });
});

test.describe("Multiple Expense", () => {
  test("ESS Multiple expense submission", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "User ID" })
      .fill(users.employee.userName);
    await page.getByRole("textbox", { name: "User ID" }).press("Enter");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(users.employee.password);
    await page.getByRole("textbox", { name: "Password" }).press("Enter");
    test.slow();
    await page
      .locator("#left-nav")
      .getByRole("link", { name: "Expense reports" })
      .click();
    test.slow();
  });
});

test("receipt", async ({ page }) => {
  await page
    .getByRole("textbox", { name: "User ID" })
    .fill(users.employee.userName);
  await page.getByRole("textbox", { name: "User ID" }).press("Enter");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(users.employee.password);
  await page.getByRole("textbox", { name: "Password" }).press("Enter");
  test.slow();
  await page
    .locator("#left-nav")
    .getByRole("link", { name: "Expense reports" })
    .click();
  test.slow();
  await page.getByText("Add report").click();
  expenseName = "report " + randomName(3);
  await page.getByRole("textbox", { name: "Title *" }).fill(expenseName);
  console.log(expenseName);
  test.slow();
  await page.getByRole("button", { name: "Next" }).click();
  await page
    .locator("#modal-top")
    .getByRole("button", { name: "Add expense" })
    .click();
  await page.getByRole("searchbox", { name: "Select box" }).click();
  await page.getByRole("searchbox", { name: "Select box" }).fill("BLDMTSEX");
  // await page.locator('div').filter({ hasText: `${expenseType}` }).click();
  await page
    .getByRole("option", { name: "BLDMTSEX" })
    .locator("div")
    .first()
    .click();
  await page.getByRole("button", { name: "Select date" }).click();
  await page.getByRole("button", { name: "Today" }).click();
  await page.getByRole("textbox", { name: "Amount *" }).click();
  await page.getByRole("textbox", { name: "Amount *" }).fill(`${amount}`);
  await page.getByText("Upload attachment").click();
  await page.setInputFiles(
    'input[type="file"]',
    "C:\\Users\\msushma\\Downloads\\Dependants (2).xlsx"
  );
  await page.waitForSelector("text=Dependants (2).xlsx", { timeout: 5000 });

  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Submit" }).click();
});
