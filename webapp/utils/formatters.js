sap.ui.define([], function () {
    "use strict";
    return {
        /**
         * Method to mask credit card number except last 4 digits.
         * @param  {string} sCardNumber - Credit card number.
         * @return {string} Returns masked credit card number except last 4 digits.
         * @public
         */
        hideCardNumber: function (sCardNumber) {
            if (!sCardNumber) {
                return "";
            }
            var sNumbersOnly = sCardNumber.replace(/\s/g, ""), sMaskedNumber = sNumbersOnly.replace(/[0-9](?=([0-9]{4}))/g, "*");
            return sMaskedNumber;
        },
    };
});
