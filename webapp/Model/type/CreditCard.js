sap.ui.define(
	["sap/ui/model/SimpleType", "sap/ui/model/ValidateException"],
	function (SimpleType, ValidateException) {
		"use strict";

		return SimpleType.extend("wizard.Model.type.CreditCard", {
			formatValue: function (sValue) {
				if (!sValue) return "";

				var aNumbers = [sValue],
					sMatch = (aNumbers && aNumbers[0]) || "",
					aParts = [];

				for (var i = 0; i < sMatch.length; i += 4) {
					aParts.push(sMatch.substring(i, i + 4));
				}

				return aParts.length ? aParts.join(" ") : sValue;
			},

			parseValue: function (sValue) {
				var sNumbersOnly = sValue.replace(/\s/g, ""),
					bIsNumber = Number.isInteger(+sNumbersOnly);

				if (!bIsNumber) {
					throw new ValidateException("Please enter numbers");
				}

				return sNumbersOnly;
			},

			validateValue: function (sValue) {
				if (sValue.length !== 16) {
					throw new ValidateException("Expected 16 numbers of the card");
				}
			},
		});
	}
);
