import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';
import { baseCreds } from '../global-data/globalCredentials.js';

export class OnboardingBasePages {

  //Expert home page components
  readonly page: Page
  readonly actionsMenuButton: Locator
  readonly actionsMenuDropdown: Locator

  constructor(page: Page){
    this.page = page 
    this.actionsMenuButton = page.getByRole('button', { name: 'Actions'});
    this.actionsMenuDropdown = page.getByRole('menu');
  }
}

export class OnboardingListPages {

  //Onboarding list view components
  readonly page: Page
  readonly addEmployeeButton: Locator
  readonly personalDetailsAccordion: Locator
  readonly jobDetailsAccordion: Locator
  readonly legalFirstName: Locator
  readonly legalLastName: Locator
  readonly genderPicklist: Locator
  readonly dateOfBirth: Locator
  readonly mobileNumber: Locator
  readonly personalEmail: Locator
  readonly companyPicklist: Locator
  readonly hireDate: Locator
  readonly workEmail: Locator
  readonly payGroupPicklist: Locator
  readonly jobTitlePicklist: Locator
  readonly locationPicklist: Locator
  readonly reportsToPicklist: Locator
  readonly employeeCode: Locator
  readonly referenceNumber: Locator
  readonly submitButton: Locator
  readonly peopleSearch: Locator

  constructor(page: Page){
    this.page = page 
    this.addEmployeeButton = page.getByRole('button', {name: 'Add an employee'});
    this.personalDetailsAccordion = page.getByRole('button', {name: 'Personal details'});
    this.jobDetailsAccordion = page.getByRole('button', {name: 'Job details'});
    this.legalFirstName = page.getByLabel('Legal first name');
    this.legalLastName = page.getByLabel('Legal last name');
    this.genderPicklist = page.locator('#ihcm-picklist-gender').getByRole('searchbox');
    this.dateOfBirth = page.getByLabel('Date of birth');
    this.mobileNumber = page.getByLabel('Mobile number');
    this.personalEmail = page.getByLabel('Personal email address');
    this.companyPicklist = page.locator('#ihcm-lookup-nWUHInternalCompany').getByRole('searchbox');
    this.hireDate = page.getByLabel('Hire date');
    this.workEmail = page.getByRole('textbox', {name: 'Work email address'});
    this.payGroupPicklist = page.locator('#ihcm-lookup-nXGPRPaygroup').getByRole('searchbox');
    this.jobTitlePicklist = page.locator('#ihcm-lookup-jobTitle').getByRole('searchbox');
    this.locationPicklist = page.locator('#ihcm-lookup-location').getByRole('searchbox');
    this.reportsToPicklist = page.locator('#ihcm-lookup-reportsTo').getByRole('searchbox');
    this.employeeCode = page.getByLabel('Employee code');
    this.referenceNumber = page.getByLabel('Reference number');
    this.submitButton = page.getByRole('button', {name: 'Submit'});
    this.peopleSearch = page.getByRole('searchbox', { name: 'Name' });
  }
}

export class OnboardingDetailPages {

  //Onboarding detail view components
  readonly page: Page

  readonly employeeDetailsAccordion: Locator
  readonly legalFirstName: Locator
  readonly legalLastName: Locator
  readonly initials: Locator
  readonly genderPicklist: Locator
  readonly nationalityPicklist: Locator
  readonly dateOfBirth: Locator
  readonly workEmail: Locator
  readonly socialSecurityNumber: Locator

  readonly jobDetailsAccordion: Locator
  readonly referenceNumber: Locator
  readonly employeeCode: Locator
  readonly hireDate: Locator
  readonly reportsToPicklist: Locator
  readonly continuousServiceDate: Locator
  readonly jobTitle: Locator
  readonly personalJobTitle: Locator
  readonly assignmentTypePicklist: Locator
  readonly contractTypePicklist: Locator
  readonly orgLevelPicklist: Locator
  readonly orgUnitPicklist: Locator
  readonly orgStructurePicklist: Locator
  readonly companyPicklist: Locator
  readonly fixedVariablePicklist: Locator
  readonly workPatternPicklist: Locator
  readonly workCrewPicklist: Locator

  readonly addressDetailsAccordion: Locator
  readonly countryPicklist: Locator
  readonly street: Locator
  readonly buildingNumber: Locator
  readonly zipCode: Locator
  readonly city: Locator

  readonly leavePoliciesAccordion: Locator

  readonly paymentMethodAccrdion: Locator
  readonly paymentMethodPicklist: Locator
  readonly paymentMethodEffectiveFromDate: Locator
  readonly bankAccountTypePicklist: Locator
  readonly bankAccount: Locator
  readonly swiftCode: Locator
  readonly beneficiaryName: Locator

  readonly payGroupAssignmentAccordion: Locator
  readonly payGroup: Locator
  readonly payGroupEffectiveFromDate: Locator

  readonly tasksAccordion: Locator
  readonly submitButton: Locator

  constructor(page: Page){

  this.employeeDetailsAccordion = page.getByRole('button', {name: 'Employee details'});
  this.legalFirstName = page.getByLabel('Legal first name');
  this.legalLastName = page.getByLabel('Legal last name');
  this.initials = page.getByLabel('Initials');
  this.genderPicklist = page.locator('#ihcm-picklist-gender');
  this.nationalityPicklist = page.locator('#ihcm-picklist-nLHRNationality2');
  this.dateOfBirth = page.getByLabel('Date of birth');
  this.workEmail = page.getByLabel('Work email');
  this.socialSecurityNumber = page.getByLabel('Social security number');

  this.jobDetailsAccordion = page.getByRole('button', {name: 'Job details'});
  this.referenceNumber = page.getByLabel('Reference number');
  this.employeeCode = page.getByRole('group', { name: 'Employment details' }).locator('#employeeCode');
  this.hireDate = page.getByLabel('Hire date');
  this.reportsToPicklist = page.locator('#ihcm-lookup-reportsTo');
  this.continuousServiceDate = page.getByLabel('Continuous service date');
  this.jobTitle = page.locator('#ihcm-lookup-jobTitle');
  this.personalJobTitle = page.getByLabel('Personal job title');
  this.assignmentTypePicklist = page.locator('#ihcm-picklist-assignmentType');
  this.contractTypePicklist = page.locator('#ihcm-picklist-contract');
  this.orgLevelPicklist = page.locator('#ihcm-lookup-nWUHorganisationLevel');
  this.orgUnitPicklist = page.locator('#ihcm-lookup-nWUHorganisationUnit');
  this.orgStructurePicklist = page.locator('#ihcm-lookup-nWUHorganisationStructure');
  this.companyPicklist = page.locator('#ihcm-lookup-nWUHinternalCompany');
  this.fixedVariablePicklist = page.locator('#ihcm-picklist-fixedOrVariable');
  this.workPatternPicklist = page.locator('#ihcm-lookup-workPattern');
  this.workCrewPicklist = page.locator('#ihcm-lookup-workCrew');

  this.addressDetailsAccordion = page.getByRole('button', {name: 'Address details'});
  this.countryPicklist = page.locator('#ihcm-picklist-country');
  this.street = page.getByLabel('Street');
  this.buildingNumber = page.getByLabel('Building number *');
  this.zipCode = page.getByLabel('Zip code');
  this.city = page.getByLabel('City *');

  this.leavePoliciesAccordion = page.getByRole('button', {name: 'Leave and absence policies'});

  this.paymentMethodAccrdion = page.getByRole('button', {name: 'Payment method'});
  this.paymentMethodPicklist = page.locator('#ihcm-picklist-paymentMethod');
  this.paymentMethodEffectiveFromDate = page.getByLabel('Effective From');
  this.bankAccountTypePicklist = page.locator('#ihcm-picklist-accountType');
  this.bankAccount = page.getByLabel('Bank Account');
  this.swiftCode = page.getByLabel('BIC/SWIFT Code');
  this.beneficiaryName = page.getByLabel('Beneficiary');

  this.payGroupAssignmentAccordion = page.getByRole('button', {name: 'Pay group assignment'});
  this.payGroup = page.getByLabel('Pay Group');
  this.payGroupEffectiveFromDate = page.getByLabel('Effective From');

  this.tasksAccordion = page.getByRole('button', {name: 'Tasks'});
  
  this.submitButton = page.getByRole('button', {name: 'Submit', exact: true});

  }
}