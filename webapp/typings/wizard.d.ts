declare namespace wizard {
  export class BaseController extends sap.ui.core.UIComponent {
    public getModel(): sap.ui.model.json.JSONModel;

    public getProperty(path: string): any;

    public setProperty(path: string, value: any): void | never;

    public getState(path: string): any;

    public setState(path: string, value: any): void;

    public loadFragment(fragmentName: string): Promise<sap.ui.core.Control>;
  }

  export class AppController extends BaseController {
    _navContainer: sap.m.NavContainer;

    _wizardContainer: sap.m.Wizard;

    _wizardPage: sap.f.DynamicPage;

    _discardPopover: sap.m.Popover;
  }

  export class Formatters {
    public maskCreditCardNumber(cardNumber: string): string;
  }

  enum CARD_TYPES {
    VISA = "VISA",
    MASTERCARD = "MasterCard",
    None = ""
  }
}
