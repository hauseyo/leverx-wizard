declare namespace Model {
  export class CommonControl extends sap.ui.base.EventProvider {
    public data(dataName: string): string;
  }

  declare namespace view {
    interface State {
      currentStep: number;
      isStepLast: boolean;
      obj: { string: string; number: number };
    }
  }
}
