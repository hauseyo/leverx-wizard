sap.ui.define(
  ["sap/ui/model/SimpleType", "sap/ui/model/ValidateException"],
  function (
    SimpleType: typeof sap.ui.model.SimpleType,
    ValidateException: typeof sap.ui.model.ValidateException
  ) {
    "use strict";
    /**
     * A new data type to validate credit card numbers.
     * @class
     */
    class CreditCardType extends SimpleType {
      /**
       * Method to format value in UI.
       * @param  {string} sValue - Credit card number.
       * @return {string} Returns formatted credit card number.
       * @private
       */
      formatValue(value: string): string {
        if (!value) return "";

        var numbers = [value],
          matchedString = (numbers && numbers[0]) || "",
          parts = [];

        for (var i = 0; i < matchedString.length; i += 4) {
          parts.push(matchedString.substring(i, i + 4));
        }

        return parts.length ? parts.join(" ") : value;
      }
      /**
       * Method to parse given value.
       * It match number only.
       * @param  {string} sValue - Credit card number.
       * @return {string | sap.ui.model.ValidateException} - If the given number is correct, a parsed value will be returned. otherwise sap.ui.model.ValidateException will be thrown.
       * @private
       */
      parseValue(value: string): string {
        var numbersOnly = value.replace(/\s/g, ""),
          isNumber = Number.isInteger(+numbersOnly);

        if (!isNumber) {
          throw new ValidateException("Please enter numbers");
        }

        return numbersOnly;
      }
      /**
       * Method to validate credit card number.
       * If validation failed, error will be thrown.
       * @param  {string} sValue - Credit card number.
       */
      validateValue(value: string): sap.ui.model.ValidateException | void {
        if (value.length !== 16) {
          throw new ValidateException("Expected 16 numbers of the card");
        }
      }
    }

    return CreditCardType;
  }
);
