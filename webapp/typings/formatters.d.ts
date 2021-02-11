declare namespace Utils {
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

  declare namespace view {
    interface State {
      currentStep: number;
      isStepLast: boolean;
      obj: { string: string; number: number };
    }
  }
}
