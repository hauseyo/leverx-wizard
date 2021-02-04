sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";

	return Controller.extend("wizard.Controller.App", {
		onInit: function () {
			this._navContainer = this.byId("app");
			this._wizardContainer = this.byId("bankAccountCreation");
			// this._generateBankLogin();
		},

		_generateBankLogin: function () {
			var sName = this.getView().getModel().getProperty("Name"),
				sLogin = sName + (0 | Math.random());

			console.log(sLogin);

			console.log(sName);

			this.getView().getModel().setProperty("/Login", sLogin);
		},

		onComplete: function () {
			this._navContainer.to(this.byId("reviewPage"));
		},

		onEditFirstStep: function () {
			var oStep = this._wizardContainer.getSteps()[0],
				fnAfterNavigate = function () {
					this._wizardContainer.goToStep(this._wizardContainer.getSteps()[0]);

					this._navContainer.detachAfterNavigate(fnAfterNavigate);
				};

			var foo = this._wizardContainer.getSteps()[0];

			this._navContainer.attachAfterNavigate(fnAfterNavigate);

			this._wizardContainer.goToStep(oStep);
		},

		// _afterNavigate: function (nStepNum) {
		// 	return function () {
		// 		this._wizardContainer.goToStep(
		// 			this._wizardContainer.getSteps()[nStepNum]
		// 		);

		// 		this._navContainer.detachAfterNavigate(this._afterNavigate);
		// 	};
		// },
	});
});
