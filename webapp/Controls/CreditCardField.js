sap.ui.define(
	["sap/m/Input", "wizard/Model/type/CreditCard"],
	function (Input, CreditCard) {
		"use strict";

		var CARD_TYPES = {
			VISA: "Visa",
			MASTERCARD: "MasterCard",
		};

		var CreditCardField = Input.extend("wizard.Controls.CreditCardField", {
			onBeforeRendering: function () {
				this._setInputType();
				this.attachChange(this._change);
			},

			renderer: function (oRm, oInput) {
				sap.m.InputRenderer.render(oRm, oInput);
			},

			_change: function () {
				var nCardNumber = this.getValue(),
					sCardType = this._getCardType(nCardNumber);

				this.setDescription(sCardType);
			},

			_getCardType: function (sCardNumber) {
				var sNumbersOnly = sCardNumber.replace(/\s/g, ""),
					oRe = new RegExp("^4");

				if (sNumbersOnly.match(oRe)) {
					return CARD_TYPES.VISA;
				}

				oRe = new RegExp("^5[1-5]");
				if (sNumbersOnly.match(oRe)) {
					return CARD_TYPES.MASTERCARD;
				}

				return "";
			},

			_setInputType: function () {
				var oType = new CreditCard();
				this.getBinding("value").setType(oType);
			},
		});

		return CreditCardField;
	},
	true
);
