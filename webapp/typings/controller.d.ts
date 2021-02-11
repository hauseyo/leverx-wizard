declare namespace Controller {
  export class Base extends sap.ui.core.UIComponent {
    public getModel(): sap.ui.model.json.JSONModel;

    public getProperty(path: string): unknown;

    public setProperty(path: string, value: any): void | Error;

    public getState<
      T extends Model.view.State,
      K extends keyof Model.view.State
    >(path: K): T[K];

    public setState<
      T extends Model.view.State,
      K extends keyof Model.view.State
    >(path: K, value: T[K]): void;
    /**
     * Method to load fragment.
     */
    public loadFragment(
      fragmentName: string
    ): Promise<typeof sap.ui.core.Control>;
  }

  export class App extends Base {
    _navContainer: sap.m.NavContainer;

    _wizardContainer: sap.m.Wizard;

    _wizardPage: sap.f.DynamicPage;

    _discardPopover: sap.m.Popover;
  }
}
