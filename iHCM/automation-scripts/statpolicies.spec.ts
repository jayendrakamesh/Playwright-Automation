import { test, expect, Page } from "@playwright/test";
import { NexoLoginPage } from "../page-object-models/nexoPom.ts";
import { piCreds } from "../global-data/piCredentials.ts";
import { OnboardingBasePages, OnboardingDetailPages } from "../page-object-models/onboardingPom.ts";
import { OnboardingListPages } from "../page-object-models/onboardingPom.ts";
import { JobDetailsPages } from "../page-object-models/jobDetailsPom.ts";

//Employee data parameterized
const employeeData = {
  //Personal
  firstName: "Hands On", lastName: "JS", dateOfBirth: "01/01/2000", mobileNumber: "12345", email: "playwrighttest6@js1.com",
  nationality: "Dutch", gender: "Male", socialSecurityNumber: "258230150",
  //Job
  orgLevel: "0 - Company", company: "JSCOMP01 - Leaf Company",  payGroup: "JSPG03 - Leaf Secondary Monthly Paygroup", 
  jobTitle: "0000 - QA Engg", location: "Chennai", reportsTo: "61901 - Tony Stark",
  hireDate: "01/02/2025",  employeeCode: "619006", assignmentType: "Full Time", contractType: "Permanent", fixedVariable: "Casual Worker",
  //Address
  country: "Netherlands", street: "Sooper Street", buildingNumber: "1000", zipCode: "1000 AA", city: "Chennai",
  //Bank
  accountNumber: "ES37161972849397741035", swiftCode: "12-34-56",


  //Multi Contract - If contract code is same as original employee code multi contract will not be created, else it will create
  contractCode: "619006", primaryJob: 0, jobEffectiveDate: "01/10/2025", jobEndDate: "", fte: "1"
}

// Method - To fill stat policies for a contract
async function fillStatPolicies(page: Page, tempJobCode: string){ 

    await page.goto("https://preprod.ihcm.adp.com/");

    await page.getByRole('link',{name: 'Expert', exact: true}).click();

    await page.getByText('Active workforce').click();
    await page.getByRole('button', {name: 'Clear all'}).click();
    await page.getByRole('searchbox', { name: 'Find People' }).fill(employeeData.employeeCode);
    await page.getByRole('searchbox', { name: 'Find People' }).press('Enter');
    await page.getByRole('button').filter({hasText: employeeData.employeeCode}).click();
    
    //await page.waitForTimeout(6000);
    
    await page.getByRole('tab', {name: 'Pay'}).click();
    await page.getByRole('tab', {name: 'Statutory'}).click();
    await page.getByRole('button',{name: 'Contracts'}).click();

    const contractsPicklist = await page.locator('role=button').filter({hasText: 'Leaf'});
    
    if(!await expect(contractsPicklist).toBeDisabled ){
      await contractsPicklist.click();
      await page.locator('role=option').filter({hasText: tempJobCode}).click();
    }
    await page.getByRole('switch', {name: 'Use hire date'}).click();
  

    //Differentiated Disability Fund details accordion
    await page.getByRole('button', {name: 'Differentiated Disability'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    //await page.getByRole('combobox', {name: 'Date Of Birth'}).click(); //Pending expect validation
    await page.getByRole('button', { name: 'Income Relationship Type' }).click();
    await page.getByRole('option', { name: '15 (Loon/salaris Werknemer)' }).click();
    await page.getByRole('button', { name: 'Indication Small Or Large' }).click();
    await page.getByLabel('Insured Disability Fund').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Health Insurance Act details accordion
    await page.getByRole('button', {name: 'Health Insurance Act'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('button', {name: 'Special Situation Payroll Tax *'}).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByLabel('Apply VCR Calculation Method').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Code Health Insurance Act' }).click();
    await page.getByRole('option', { name: 'K' }).click();
    await page.getByLabel('Country Of Residence Factor').click();
    await page.getByLabel('Country Of Residence Factor').fill('1');
    await page.getByRole('button', { name: 'Save' }).click();

    //Income Tax details - Proration accordion
    await page.getByRole('button', {name: 'Income Tax'}).click();
    await page.getByRole('button', {name: 'Add information'}).first().click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Income Tax details - Tax Withholding Obligation accordion
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Tax Rebates').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Apply Day Table Nee' }).click();
    await page.getByRole('option', { name: 'Alleen Loonheffing' }).click();
    await page.getByLabel('Disable Proportional MIR').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Income From Arbeid (Wite Tabel)' }).click();
    await page.getByRole('option', { name: 'Arbeid (Wite Tabel)' }).click();
    await page.getByRole('spinbutton', { name: 'Paid Days' }).fill('21');
    await page.getByLabel('Single Elderly Tax Rebate Indicator').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Special Situation Payroll Tax Geen Herleiding (Std)' }).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Minimum Wages NL accordion
    await page.getByRole('button', {name: 'Minimum Wages NL'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByRole('spinbutton', { name: 'Standard Hours Per Week' }).fill('40'); 
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Salary Indicator' }).click();
    await page.getByRole('option', { name: 'Periodeloon' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Return To Work Fund accordion
    await page.getByRole('button', {name: 'Return To Work Fund'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Contribution Percentage WGA').fill('1');
    await page.getByLabel('Insured Disability Fund').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByLabel('Withholding Percentage WGA').fill('1');
    await page.getByRole('button', { name: 'Save' }).click();

    //Sickness Benefits Act accordion
    await page.getByRole('button', {name: 'Sickness Benefits Act'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Contribution Percentage ZW Flex').fill('1');
    await page.getByLabel('Amount Cost Reimbursement Decision').fill('200');
    await page.getByLabel('Insured Sickness Insurance Act').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Social Insurance Day And Maximum Capability accordion
    await page.getByRole('button', {name: 'Social Insurance Day And Maximum Capability'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByRole('textbox', {name: 'Amount Cost Reimbursement'}).fill('200');
    await page.getByRole('button', { name: 'Apply Day Table Alleen Loonheffing' }).click();
    await page.getByRole('option', { name: 'Alleen Loonheffing' }).click();
    await expect(page.getByRole('spinbutton', { name: 'Paid Days' })).toHaveValue('21');
    await page.getByRole('button', { name: 'Special Situation Payroll Tax Geen Herleiding (Std)' }).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Special Rewards Tax accordion 
    await page.getByRole('button', {name: 'Special Rewards Tax'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByRole('button', { name: 'Apply Day Table Alleen Loonheffing' }).click();
    await page.getByRole('option', { name: 'Alleen Loonheffing' }).click();
    await page.getByRole('button', { name: 'Income From Arbeid (Wite Tabel)' }).click();
    await page.getByRole('option', { name: 'Arbeid (Wite Tabel)' }).click();
    await page.getByLabel('New Starter Previous Year Annual Wage').fill('200');
    await page.getByLabel('Override Previous Year Annual Wage').fill('200');
    await page.getByLabel('Single Elderly Tax Rebate Indicator').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Special Situation Payroll Tax Geen Herleiding (Std)' }).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByLabel('Tax Rebates').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Surcharge Childcare Actaccordion 
    await page.getByRole('button', {name: 'Surcharge Childcare Act'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Insured Disability Fund').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

};

//Test 0 - Prerequisite to login and save authentication states of users
test("0 - Login and save authentication states of important users @slow", async ({page}) => { test.setTimeout(360000);

  const nexoLoginPage = new NexoLoginPage(page);

  await page.goto("https://preprod.ihcm.adp.com/");
  await nexoLoginPage.expertLogin(piCreds);

  await page.getByRole('button', { name: 'Show user menu' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();

});


test.describe.serial('1 - Test suite to complete employee data setup for Pi', () => {

  //Test 1.1 - Tes to onboard an employree to send them for filling stat policies
  test.use({storageState: 'iHCM/global-data/Auth/expertAuth.json'});
  test('1.1 - Test to onboard an employee to send them for filling stat policies', async({page}) => {

    const onboardingBasePages = new OnboardingBasePages(page);
    const onboardingListPages = new OnboardingListPages(page);

    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/expert/home");
    await onboardingBasePages.actionsMenuButton.click();
    await onboardingBasePages.actionsMenuDropdown.getByText('Onboarding').click();

    await onboardingListPages.addEmployeeButton.click();
    await onboardingListPages.legalFirstName.fill(employeeData.firstName);
    await onboardingListPages.legalLastName.fill(employeeData.lastName);
    await onboardingListPages.genderPicklist.click();
    await page.getByRole('option', {name: 'Male', exact: true}).click();

    await onboardingListPages.dateOfBirth.fill(employeeData.dateOfBirth);
    await onboardingListPages.mobileNumber.fill(employeeData.mobileNumber);
    await onboardingListPages.personalEmail.fill(employeeData.email);
    
    await onboardingListPages.jobDetailsAccordion.click();
    await onboardingListPages.companyPicklist.click();
    await page.getByRole('option', {name: employeeData.company, exact: true}).click();

    await onboardingListPages.hireDate.fill(employeeData.hireDate);
    await onboardingListPages.workEmail.fill(employeeData.email);

    await onboardingListPages.payGroupPicklist.click();
    await page.getByRole('option', {name: employeeData.payGroup, exact: true}).click();

    await onboardingListPages.jobTitlePicklist.click();
    await page.getByRole('option', {name: employeeData.jobTitle, exact: true}).click();

    await onboardingListPages.locationPicklist.click();
    await page.getByRole('option', {name: employeeData.location, exact: true}).click();

    await onboardingListPages.reportsToPicklist.click();
    await page.getByRole('option', {name: employeeData.reportsTo, exact: true}).click();

    await onboardingListPages.employeeCode.fill(employeeData.employeeCode);
    await onboardingListPages.referenceNumber.fill(employeeData.employeeCode);

    await onboardingListPages.submitButton.click();

  });

  test('1.2 - To completed 100% for newly onboarded employee', async({ page }) => {
    
    const onboardingBasePages = new OnboardingBasePages(page);
    const onboardingListPages = new OnboardingListPages(page);
    const onboardingDetailPages = new OnboardingDetailPages(page);

    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/expert/home");
    await onboardingBasePages.actionsMenuButton.click();
    await onboardingBasePages.actionsMenuDropdown.getByText('Onboarding').click();

    await onboardingListPages.peopleSearch.fill(employeeData.employeeCode);
    await onboardingListPages.peopleSearch.press('Enter');
    await page.getByRole('link').filter({hasText: employeeData.firstName}).click();
    
    await onboardingDetailPages.employeeDetailsAccordion.click();
    await expect(onboardingDetailPages.legalFirstName).toHaveValue(employeeData.firstName);
    await expect(onboardingDetailPages.legalLastName).toHaveValue(employeeData.lastName);
    await onboardingDetailPages.initials.fill('S');
    await expect(onboardingDetailPages.nationalityPicklist).toContainText(employeeData.nationality);
    await expect(onboardingDetailPages.genderPicklist).toContainText(employeeData.gender);
    await expect(onboardingDetailPages.dateOfBirth).toHaveValue(employeeData.dateOfBirth);
    await expect(onboardingDetailPages.workEmail).toHaveValue(employeeData.email);
    await onboardingDetailPages.socialSecurityNumber.fill(employeeData.socialSecurityNumber);
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.jobDetailsAccordion.click();
    await expect(onboardingDetailPages.referenceNumber).toHaveValue(employeeData.employeeCode);
    await expect(onboardingDetailPages.employeeCode).toHaveValue(employeeData.employeeCode);
    await expect(onboardingDetailPages.hireDate).toHaveValue(employeeData.hireDate);
    await expect(onboardingDetailPages.reportsToPicklist).toContainText(employeeData.reportsTo);
    await expect(onboardingDetailPages.continuousServiceDate).toHaveValue(employeeData.hireDate);
    await expect(onboardingDetailPages.jobTitle).toContainText(employeeData.jobTitle);
    await onboardingDetailPages.personalJobTitle.fill(employeeData.jobTitle);
    await onboardingDetailPages.assignmentTypePicklist.click();
    await page.getByRole('option', {name: employeeData.assignmentType, exact: true}).click();
    await onboardingDetailPages.contractTypePicklist.click();
    await page.getByRole('option', {name: employeeData.contractType, exact: true}).click();
    await onboardingDetailPages.orgLevelPicklist.click();
    await page.getByRole('option', {name: employeeData.orgLevel, exact: true}).click();
    await onboardingDetailPages.orgUnitPicklist.click();
    await onboardingDetailPages.orgUnitPicklist.getByRole('option', {name: employeeData.company, exact: true}).click();
    await onboardingDetailPages.fixedVariablePicklist.click();
    await page.getByRole('option', {name: employeeData.fixedVariable, exact: true}).click();
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.addressDetailsAccordion.click();
    await onboardingDetailPages.countryPicklist.click();
    await page.getByRole('option', {name: employeeData.country, exact: true}).click();
    await onboardingDetailPages.street.fill(employeeData.street);
    await onboardingDetailPages.buildingNumber.fill(employeeData.buildingNumber);
    await onboardingDetailPages.zipCode.fill(employeeData.zipCode);
    await onboardingDetailPages.city.fill(employeeData.city);
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.paymentMethodAccrdion.click();
    await onboardingDetailPages.paymentMethodPicklist.click();
    await page.getByRole('option', {name: 'SEPA', exact: true}).click();
    await onboardingDetailPages.paymentMethodEffectiveFromDate.fill(employeeData.hireDate);
    await onboardingDetailPages.bankAccountTypePicklist.click();
    await page.getByRole('option', {name: 'Primary', exact: true}).click();
    await onboardingDetailPages.bankAccount.fill(employeeData.accountNumber);
    await onboardingDetailPages.swiftCode.fill(employeeData.swiftCode);
    await onboardingDetailPages.beneficiaryName.fill(employeeData.firstName + " " + employeeData.lastName);
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.payGroupAssignmentAccordion.click();
    //await expect(onboardingDetailPages.payGroup).toHaveValue(employeeData.payGroup); //To Improvise
    //await expect(onboardingDetailPages.payGroupEffectiveFromDate).toHaveValue(employeeData.hireDate); //To Improvise
    

  });

  
  //Test 1.3 - Test to automate filling of stat policies
  test("1.3 - Test to automate filling of stat policies", async ({page}) => {

      await fillStatPolicies(page, employeeData.employeeCode);

  });

  //Test 1.4 - Test to create a multi contract
  test("1.4 - Test to create a multi contract record", async ({page}) => {

    //Condition to check whether to create or skip multi contract
    const creatMultiContract = employeeData.employeeCode === employeeData.contractCode;
    test.skip(creatMultiContract, 'No multi contract to create');

    const jobDetailPage = new JobDetailsPages(page);
    
    await page.goto("https://preprod.ihcm.adp.com/");

    await page.getByRole('link',{name: 'Expert', exact: true}).click();

    await page.getByText('Active workforce').click();
    await page.getByRole('searchbox', { name: 'Find People' }).fill(employeeData.employeeCode);
    await page.getByRole('searchbox', { name: 'Find People' }).press('Enter');
    await page.getByRole('button').filter({hasText: employeeData.employeeCode}).click();

    await page.getByRole('tab', {name: 'Employment'}).click();
    await page.getByRole('button', {name: 'Job details'}).click();
    await jobDetailPage.jobAddButton.click();

    if(employeeData.primaryJob === 1){ await jobDetailPage.primaryJobCheckbox.click(); }
    await jobDetailPage.jobEffectiveDate.fill(employeeData.jobEffectiveDate);
    await jobDetailPage.jobTitleForPayslip.fill(employeeData.jobTitle);
    await jobDetailPage.personalJobTitle.fill(employeeData.jobTitle);
    await jobDetailPage.jobTitlePicklist.click();
    await page.getByRole('option', { name: employeeData.jobTitle }).click();
    
    await jobDetailPage.assignmentTypePicklist.click();
    await page.getByRole('option', {name: employeeData.assignmentType, exact: true}).click();
    await jobDetailPage.contractTypePicklist.click();
    await page.getByRole('option', {name: employeeData.contractType, exact: true}).click();

    await jobDetailPage.fte.fill(employeeData.fte);
    await jobDetailPage.contractCode.fill(employeeData.contractCode);

    await jobDetailPage.locationPicklist.click();
    await page.getByRole('option', {name: employeeData.location, exact: true}).click();
    await jobDetailPage.companyPicklist.click();
    await page.getByRole('option', {name: employeeData.company, exact: true}).click();
    await jobDetailPage.orgLevelPicklist.click();
    await page.getByRole('option', {name: employeeData.orgLevel, exact: true}).click();
    await jobDetailPage.orgUnitPicklist.click();
    await jobDetailPage.orgUnitPicklist.getByRole('option', {name: employeeData.company, exact: true}).click();
    await jobDetailPage.fixedVariablePicklist.click();
    await page.getByRole('option', {name: employeeData.fixedVariable, exact: true}).click();

    await jobDetailPage.saveButton.click();


    await fillStatPolicies(page, employeeData.contractCode);
    
  });  
});


