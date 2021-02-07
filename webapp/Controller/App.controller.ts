sap.ui.define(
  ["wizard/controller/BaseController", "wizard/utils/formatters"],
  function (
    BaseController: typeof wizard.AppController,
    Formatters: typeof sap.ui.model.SimpleType
  ) {
    "use strict";

    class AppController extends BaseController {
      formatters = new Formatters();

      onInit() {
        // this._generateBankLogin();
        this._navContainer = this.byId("app");
        this._wizardContainer = this.byId("bankAccountCreation");
        this._wizardPage = this.byId("wizardPage");
      }

      public onComplete(): void {
        this._navContainer.to(this.byId("reviewPage"), "slide", {}, {});
        this.changeCurrentStepNumber(0);
      }

      public onCompleteStep(): void {
        var nCurrentStep = this.getState("currentStep");

        this.changeCurrentStepNumber(nCurrentStep + 1);
        this.checkLastStep();
      }

      public onNextStep(): void {
        this._wizardContainer.nextStep();
      }

      public onPrevStep(): void {
        var nPrevStep = this.getState("currentStep") - 1;

        this.changeCurrentStepNumber(nPrevStep);
        this.checkLastStep();
        this._wizardContainer.previousStep();
      }

      public onEditStep(oEvent: sap.ui.base.Event): void {
        var nStep = oEvent.getSource().getCustomData()[0].getKey();

        this.navigateToWizardPage(nStep);
      }

      public onCancel(oEvent: sap.ui.base.Event): void {
        this.loadDiscardPopover(oEvent.getSource());
      }

      private generateBankLogin(): void {
        var sName = this.getProperty("Name"),
          sLogin = sName + (0 | Math.random());

        this.setProperty("Login", sLogin);
      }

      private loadDiscardPopover(oSource: sap.m.Button): void {
        if (!this.oDiscardPopover) {
          this.loadFragment("DiscardConfirmation").then(
            function (oPopover: sap.m.Popover) {
              this.oDiscardPopover = oPopover;
              this.getView().addDependent(oPopover);
              oPopover.openBy(oSource, true);
            }.bind(this)
          );
        } else {
          this.oDiscardPopover.openBy(oSource, true);
        }
      }

      private checkLastStep(): void {
        var nSteps = this._wizardContainer.getSteps().length,
          nCurrentStep = this.getState("currentStep"),
          bIsLastStep = nSteps === nCurrentStep;

        this.setState("isStepLast", !bIsLastStep);
      }

      private changeCurrentStepNumber(stepNumber: number): void {
        this.setState("currentStep", stepNumber);
      }

      private navigateToWizardPage(stepNumber: number): void {
        this._navContainer.attachAfterNavigate(
          this.navigateToWizardStep.bind(this, stepNumber)
        );
        this._navContainer.backToPage(this._wizardPage.getId(), {}, {});
      }

      private navigateToWizardStep(stepNumber: number) {
        var oStep = this._wizardContainer.getSteps()[stepNumber];

        this._wizardContainer.goToStep(oStep, true);

        this._navContainer.detachAfterNavigate(this.navigateToWizardStep);
      }
    }

    return AppController;
  }
);
