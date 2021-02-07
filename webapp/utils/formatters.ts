sap.ui.define([], function () {
  "use strict";
  return class Formatter {
    public maskCreditCardNumber(cardNumber: string) {
      if (cardNumber) {
        var sNumbersOnly = cardNumber.replace(/\s/g, ""),
          sMaskedNumber = sNumbersOnly.replace(/[0-9](?=([0-9]{4}))/g, "*");

        return sMaskedNumber;
      }

      return "";
    }
  };
});
