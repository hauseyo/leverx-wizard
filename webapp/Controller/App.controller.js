sap.ui.define(
	["wizard/controller/BaseController", "wizard/utils/formatters"],
	function (BaseController, formatters) {
		"use strict";

		return BaseController.extend("wizard.Controller.App", {
			formatters: formatters,
			/**
			 * Method occurs when component initializes.
			 * @private
			 */
			onInit: function () {
				this._navContainer = this.byId("app");
				this._wizardContainer = this.byId("bankAccountCreation");
				this._wizardPage = this.byId("wizardPage");
				// this._generateBankLogin();
			},
			/**
			 * Event handler for "review" button.
			 * It navigates to the review page.
			 * @event
			 * @public
			 */
			onComplete: function () {
				this._navContainer.to(this.byId("reviewPage"));
				this._changeCurrentStepNumber(0);
			},
			/**
			 * Event handler for "next" button in wizard step controller.
			 * It opens the next step of the wizard.
			 * @event
			 * @public
			 */
			onCompleteStep: function () {
				var nCurrentStep = this.getState("currentStep");

				this._changeCurrentStepNumber(nCurrentStep + 1);
				this._checkLastStep();
			},
			/**
			 * Event handler for "next" button in footer of the wizard page.
			 * In opens the next step of the wizard.
			 * @event
			 * @public
			 */
			onNextStep: function () {
				this._wizardContainer.nextStep();

				console.log(this.getModel().getData());
			},
			/**
			 * Event handler for "previous step" button.
			 * It closes current wizard step and navigates to the previous step.
			 * @event
			 * @public
			 */
			onPrevStep: function () {
				var nPrevStep = this.getState("currentStep") - 1;

				this._changeCurrentStepNumber(nPrevStep);
				this._checkLastStep();
				this._wizardContainer.previousStep();
			},
			/**
			 * Event handler for "edit" butotn in review page.
			 * It opens wizard page and navigate to the certain step.
			 * @event
			 * @public
			 * @param  {sap.m.Link} oEvent - Source of the 'sap.m.Link' control.
			 */
			onEditStep: function (oEvent) {
				var nStep = oEvent.getSource().getCustomData()[0].getKey();

				this._navigateToWizardPage(nStep);
			},
			/**
			 * Event handler for 'cancel' button.
			 * It opens discard confirmation.
			 * @event
			 * @public
			 * @param  {sap.m.Button} oEvent Source object of the 'sap.m.Button' control.
			 */
			onCancel: function (oEvent) {
				this._loadDiscardPopover(oEvent.getSource());
			},
			/**
			 * Method to generate login.
			 * @private
			 * @public
			 */
			_generateBankLogin: function () {
				var sName = this.getProperty("Name"),
					sLogin = sName + (0 | Math.random());

				this.setProperty("Login", sLogin);
			},
			/**
			 * Method to load popover.
			 * @event
			 * @public
			 * @param  {Promise<sap.ui.m.Popover>} oSource - 'sap.ui.m.Popover' controller.
			 */
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
			/**
			 * Method to check is last current wizard step.
			 * @private
			 */
			_checkLastStep: function () {
				var nSteps = this._wizardContainer.getSteps().length,
					nCurrentStep = this.getState("currentStep"),
					bIsLastStep = nSteps === nCurrentStep;

				this.setState("isStepLast", !bIsLastStep);
			},
			/**
			 * Method to change current step number.
			 * @param  {number} nStepNumber - New number of the wizard step.
			 * @private
			 */
			_changeCurrentStepNumber: function (nStepNumber) {
				this.setState("currentStep", nStepNumber);
			},
			/**
			 * Method to navigate to the wizard page.
			 * @param  {number} nStepNum - Step number to navigate.
			 * @private
			 */
			_navigateToWizardPage: function (nStepNum) {
				this._navContainer.attachAfterNavigate(
					this._navigateToWizardStep.bind(this, nStepNum)
				);
				this._navContainer.backToPage(this._wizardPage.getId());
			},
			/**
			 * Method to navigate to the wizard step.
			 * @param  {number} nStepNum - Step number to navigate.
			 * @private
			 */
			_navigateToWizardStep: function (nStepNum) {
				var oStep = this._wizardContainer.getSteps()[nStepNum];

				this._wizardContainer.goToStep(oStep);

				// this._navContainer.detachAfterNavigate(this._navigateToWizardStep);
			},
		});
	}
);
