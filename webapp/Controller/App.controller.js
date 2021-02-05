sap.ui.define(
	["wizard/controller/BaseController", "wizard/utils/formatters"],
	function (BaseController, formatters) {
		"use strict";

		return BaseController.extend("wizard.Controller.App", {
			formatters: formatters,
			onInit: function () {
				this._navContainer = this.byId("app");
				this._wizardContainer = this.byId("bankAccountCreation");
				this._wizardPage = this.byId("wizardPage");
				// this._generateBankLogin();
			},

			_generateBankLogin: function () {
				var sName = this.getProperty("Name"),
					sLogin = sName + (0 | Math.random());

				this.setProperty("Login", sLogin);
			},

			onComplete: function () {
				this._navContainer.to(this.byId("reviewPage"));
				this._changeCurrentStepNumber(0);
			},

			onCompleteStep: function () {
				var nCurrentStep = this.getState("currentStep");

				this._changeCurrentStepNumber(nCurrentStep + 1);
				this._checkLastStep();
			},

			onNextStep: function () {
				this._wizardContainer.nextStep();

				console.log(this.getModel().getData());
			},

			onPrevStep: function () {
				var nPrevStep = this.getState("currentStep") - 1;

				this._changeCurrentStepNumber(nPrevStep);
				this._checkLastStep();
				this._wizardContainer.previousStep();
			},

			onEditStep: function (oEvent) {
				var nStep = oEvent.getSource().getCustomData()[0].getKey();

				this._navigateToWizardPage(nStep);
			},

			onCancel: function (oEvent) {
				this._loadDiscardPopover(oEvent.getSource());
			},

			_loadDiscardPopover: function (oSource) {
				if (!this.oDiscardPopover) {
					this.loadFragment("DiscardConfirmation").then(
						function (oPopover) {
							this.oPopover = oPopover;
							this.getView().addDependent(oPopover);
							oPopover.openBy(oSource);
						}.bind(this)
					);
				} else {
					this.oPopover.openBy(oSource);
				}
			},

			_checkLastStep: function () {
				var nSteps = this._wizardContainer.getSteps().length,
					nCurrentStep = this.getState("currentStep"),
					bIsLastStep = nSteps === nCurrentStep;

				this.setState("isStepLast", !bIsLastStep);
			},

			_changeCurrentStepNumber: function (nStepNumber) {
				this.setState("currentStep", nStepNumber);
			},

			_navigateToWizardPage: function (nStepNum) {
				this._navContainer.attachAfterNavigate(
					this._navigateToWizardStep.bind(this, nStepNum)
				);
				this._navContainer.backToPage(this._wizardPage.getId());
			},

			_navigateToWizardStep: function (nStepNum) {
				var oStep = this._wizardContainer.getSteps()[nStepNum];

				this._wizardContainer.goToStep(oStep);

				// this._navContainer.detachAfterNavigate(this._navigateToWizardStep);
			},
		});
	}
);
