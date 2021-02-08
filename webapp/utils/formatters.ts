sap.ui.define([], function () {
  "use strict";
  return class Formatter {
    public maskCreditCardNumber(cardNumber: string) {
      if (cardNumber) {
        const numbersOnly = cardNumber.replace(/\s/g, ""),
          maskedNumber = numbersOnly.replace(/[0-9](?=([0-9]{4}))/g, "*");

        return maskedNumber;
      }

      return "";
    }
  };
});
