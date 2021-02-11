sap.ui.define(
  ["sap/m/Input", "wizard/Model/type/CreditCard"],
  function (
    Input: typeof sap.m.Input,
    CreditCard: typeof sap.ui.model.SimpleType
  ) {
    "use strict";

    /**
     * Types of the credit cards.
     * @constant
     * @private
     */
    enum CARD_TYPES {
      VISA = "VISA",
      MASTERCARD = "MasterCard",
      None = ""
    }

    interface Binding extends sap.ui.model.Binding {
      /**
       * Method to set the data type.
       * @param  {sap.ui.model.SimpleType} type
       */
      setType(type: sap.ui.model.SimpleType): void;
    }

    /**
     * Extended sap.m.Input class.
     * Credit card type is indeed in this control.
     */
    class CreditCardField extends Input {
      /**
       * Method occurs before control rendering.
       * It sets data type of the input to the CreditCardType.
       * It attach an event to the input.
       */
      public onBeforeRendering(): void {
        this.setInputType();
        this.attachChange(this.customChange);
      }
      /**
       * Method to insert HTML template to the DOM.
       * @callback
       * @param  {sap.ui.core.RenderManager} rM - Render Manager class.
       * @param  {sap.m.Input} input - sap.m.Input class.
       */
      private renderer(
        rM: typeof sap.ui.core.RenderManager,
        input: typeof Input
      ): void {
        sap.m.InputRenderer.render(rM, input);
      }
      /**
       * Method occurs when input changes.
       * It shows user the credit card type.
       * @private
       */
      private customChange(): void {
        const cardNumber = this.getValue();
        const cardType = this.getCardType(cardNumber);

        this.setDescription(cardType);
      }
      /**
       * Method to get card type by given card number.
       * @param  {string} cardNumber - Credit card number.
       * @return {string} Returns credit card type from CARD_TYPES object.
       * @private
       */
      private getCardType(cardNumber: string): CARD_TYPES {
        const numbersOnly = cardNumber.replace(/\s/g, "");
        let regex = new RegExp("^4");

        if (numbersOnly.match(regex)) {
          return CARD_TYPES.VISA;
        }

        regex = new RegExp("^5[1-5]");

        if (numbersOnly.match(regex)) {
          return CARD_TYPES.MASTERCARD;
        }

        return CARD_TYPES.None;
      }
      /**
       * Method to set data type of the input.
       * @private
       */
      private setInputType(): void {
        const inputType = new CreditCard();
        const inputBinding = this.getBinding("value") as Binding;

        inputBinding.setType(inputType);
      }
    }

    return CreditCardField;
  },
  true
);
