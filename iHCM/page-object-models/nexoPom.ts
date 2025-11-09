import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';
import { baseCreds } from '../global-data/globalCredentials.js';

export const nexoLoginPageTranslations = [
   {
    menuItem: "English (US)",
    lockInfo: "Information you share, send, or receive through the site is secure. For your security, please review the URL address of your ADP website.",
    languageDropdown: "Languages",
    welcomeMessage: "Welcome to ADP iHCM®",
    userIdLabel: "User ID",
    passwordLabel: "Password",
    rememberUserIdCheckbox: "Remember user ID",
    rememberUserIdInfo: "Select this option to autofill your user ID when you visit this page using this web browser on this device. Clearing your cache or cookies will remove this value.",
    rememberUserIdBanner: "Select this option on your private or personal device. Do not use this option on devices shared with other users in your company.",
    needHelpSigningInLink: "Need help signing in?",
    nextButton: "Next",
    signInButton: "Sign in",
    errorBanner: "Your user ID and/or password are incorrect. Please try again"
  },

  {
    menuItem: "Nederlands (NL)",
    lockInfo: "Informatie die u deelt, verzendt of ontvangt via de site is beveiligd. Controleer het URL-adres van de ADP-website voor uw eigen veiligheid.",
    languageDropdown: "Talen",
    welcomeMessage: "Welkom bij ADP iHCM®", 
    userIdLabel: "Gebruikers-ID",
    passwordLabel: "Wachtwoord",
    rememberUserIdCheckbox: "Onthoud gebruikersnaam",
    rememberUserIdInfo: "Selecteer deze optie om uw gebruikersnaam automatisch in te vullen als u deze pagina bezoekt met deze webbrowser op dit apparaat. Deze waarde verdwijnt als u uw cache leegmaakt of uw cookies verwijdert.",
    rememberUserIdBanner: "Selecteer deze optie op uw privé- of persoonlijke apparaat. Gebruik deze optie niet op apparaten die worden gedeeld met andere gebruikers binnen uw bedrijf.",
    needHelpSigningInLink: "Hebt u hulp nodig bij het inloggen?",
    nextButton: "Volgende",
    signInButton: "Aanmelden",
    errorBanner: "Uw gebruikers-id en / of wachtwoord zijn onjuist. Probeer het alsjeblieft opnieuw"
  }
]

export class NexoLoginPage {

  //Nexo login page components
  readonly page: Page
  readonly lockIconInfo: Locator
  readonly welcomeMessage: Locator
  readonly languageDropdown: Locator
  readonly rememberUserIdCheckbox: Locator
  readonly rememberUserIdInfo: Locator
  readonly rememberUserIdBanner: Locator
  readonly userIdField: Locator
  readonly userIdLabel: Locator
  readonly passwordField: Locator
  readonly passwordLabel: Locator
  readonly errorBanner: Locator
  readonly needHelpSigningInLink: Locator
  readonly nextButton: Locator
  readonly signInButton: Locator
  readonly loginPopupCloseButton: Locator


  constructor(page: Page){
    this.page = page

    this.lockIconInfo = page.locator('sdf-tooltip[trigger="hover"]');

    this.welcomeMessage = page.locator('h2').filter({ hasText: 'iHCM'});
    this.languageDropdown = page.locator('sdf-action-menu[id="language_dropdown"]');

    this.rememberUserIdCheckbox = page.locator('sdf-checkbox[id="user-remember-checkbox"]');
    this.rememberUserIdInfo = page.locator('sdf-tooltip[trigger="click"]');
    this.rememberUserIdBanner = page.locator('sdf-alert[status="warning"]');  

    this.userIdLabel = page.locator('sdf-input[id="login-form_username"]');
    this.userIdField = this.userIdLabel.locator('input[type="text"]');

    this.passwordLabel = page.locator('sdf-input[id="login-form_password"]');
    this.passwordField = this.passwordLabel.locator('input[type="password"]');

    this.needHelpSigningInLink = page.locator('sdf-button[id="forgot_UID_Btn_signin.needHelp"]');
    this.nextButton = page.locator('#verifUseridBtn');
    this.signInButton = page.locator('#signBtn');

    this.errorBanner = page.locator('sdf-alert[status="error"]');

    this.loginPopupCloseButton = page.locator('button:text("pendo")');
  }

  //Function to login as expert user and to save their authentication state
  async expertLogin(){

      await this.userIdField.fill(baseCreds.expertUser.username);
      await this.userIdField.press('Enter');
      
      await this.passwordField.fill(baseCreds.expertUser.password);
      await this.passwordField.press('Enter');
      
      await this.page.getByRole('link', { name: 'Expert' }).click();
  
      await this.page.context().storageState({ path: "./iHCM/global-data/Auth/expertAuth.json"});
  };

  //Function to login as mss user and to save their authentication state
  async mssLogin(){

      await this.userIdField.fill(baseCreds.mssUser.username);
      await this.userIdField.press('Enter');
      
      await this.passwordField.fill(baseCreds.mssUser.password);
      await this.passwordField.press('Enter');
      
      await this.page.getByRole('link', { name: 'My Team' }).click();
  
      await this.page.context().storageState({ path: "./iHCM/global-data/Auth/mssAuth.json"});
  };

  //Function to login as ess user and to save their authentication state
  async essLogin(){

      await this.userIdField.fill(baseCreds.essUser.username);
      await this.userIdField.press('Enter');
      
      await this.passwordField.fill(baseCreds.essUser.password);
      await this.passwordField.press('Enter');
      
      await this.page.getByLabel('Me').click();
  
      await this.page.context().storageState({ path: "./iHCM/global-data/Auth/essAuth.json"});
  };

  async closeLoginPopup(){

      await this.loginPopupCloseButton.click();
      
  };

}


export default NexoLoginPage;