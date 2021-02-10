declare namespace wizard {
  export class BaseController extends sap.ui.core.UIComponent {
    public getModel(): sap.ui.model.json.JSONModel;

    public getProperty(path: string): any;

    // public setProperty(path: string, value: any): void | Error;

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

  export class BindingClass extends sap.ui.model.Binding {
    /**
     * Method to set the data type.
     * @param  {sap.ui.model.SimpleType} type
     */
    public setType(type: sap.ui.model.SimpleType): void;
  }

  export class CommonControl extends sap.ui.base.EventProvider {
    public data(dataName: string): string;
  }
}
