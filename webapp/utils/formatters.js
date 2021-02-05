sap.ui.define([], function () {
	"use strict";

	return {
		hideCardNumber: function (sCardNumber) {
			if (!sCardNumber) {
				return "";
			}

			var sNumbersOnly = sCardNumber.replace(/\s/g, ""),
				sMaskedNumber = sNumbersOnly.replace(/[0-9](?=([0-9]{4}))/g, "*");

			return sMaskedNumber;
		},
	};
});
