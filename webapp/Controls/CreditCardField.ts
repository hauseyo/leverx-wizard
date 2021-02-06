sap.ui.define(
	["sap/m/Input", "wizard/Model/type/CreditCard"],
	function (Input: sap.m.Input, CreditCard: wizard.Model.CreditCard) {
		"use strict";

		/**
		 * Types of the credit cards.
		 * @constant
		 * @private
		 */
		enum CARD_TYPES {
			VISA = "VISA",
			MASTERCARD = "MasterCard",
			None = "",
		}
		/**
		 * Extended sap.m.Input class.
		 * Credit card type is indeed in this control.
		 */
		var CreditCardField = Input.extend("wizard.Controls.CreditCardField", {
			/**
			 * Method occurs before control rendering.
			 * It sets data type of the input to the CreditCardType.
			 * It attach an event to the input.
			 * @private
			 * @callback
			 */
			onBeforeRendering: function (): void {
				this._setInputType();
				this.attachChange(this._change);
			},
			/**
			 * Method to insert HTML template to the DOM.
			 * @private
			 * @callback
			 * @param  {sap.ui.core.RenderManager} oRm - Render Manager class.
			 * @param  {sap.m.Input} oInput - sap.m.Input class.
			 */
			renderer: function (oRm: sap.ui.model.RenderManager, oInput) {
				sap.m.InputRenderer.render(oRm, oInput);
			},
			/**
			 * Method occurs when input changes.
			 * It shows user the credit card type.
			 * @private
			 */
			_change: function () {
				var nCardNumber = this.getValue(),
					sCardType = this._getCardType(nCardNumber);

				this.setDescription(sCardType);
			},
			/**
			 * Method to get card type by given card number.
			 * @param  {number} sCardNumber - Credit card number.
			 * @return {string} Returns credit card type from CARD_TYPES object.
			 * @private
			 */
			_getCardType: function (sCardNumber: string): CARD_TYPES {
				var sNumbersOnly = sCardNumber.replace(/\s/g, ""),
					oRe = new RegExp("^4");

				if (sNumbersOnly.match(oRe)) {
					return CARD_TYPES.VISA;
				}

				oRe = new RegExp("^5[1-5]");
				if (sNumbersOnly.match(oRe)) {
					return CARD_TYPES.MASTERCARD;
				}

				return CARD_TYPES.None;
			},
			/**
			 * Method to set data type of the input.
			 * @private
			 */
			_setInputType: function () {
				var oType = new CreditCard();
				this.getBinding("value").setType(oType);
			},
		});

		return CreditCardField;
	},
	true
);
