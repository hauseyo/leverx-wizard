sap.ui.define(
  ["wizard/controller/BaseController", "wizard/utils/formatters"],
  function (
    BaseController: typeof Controller.App,
    Formatters: typeof Utils.Formatters
  ) {
    "use strict";

    class AppController extends BaseController {
      formatters = new Formatters();

      onInit() {
        // this._generateBankLogin();
        this._navContainer = this.byId("app") as sap.m.NavContainer;
        this._wizardContainer = this.byId(
          "bankAccountCreation"
        ) as sap.m.Wizard;
        this._wizardPage = this.byId("wizardPage") as sap.f.DynamicPage;
      }

      public onComplete(): void {
        const reviewPageId = this.byId("reviewPage").getId();

        this._navContainer.to(reviewPageId, "slide", {}, {});
        this.changeCurrentStepNumber(0);
      }

      public onCompleteStep(): void {
        const currentStep: number = this.getState("currentStep");

        this.changeCurrentStepNumber(currentStep + 1);
        this.checkLastStep();
      }

      public onNextStep(): void {
        this._wizardContainer.nextStep();
      }

      public onPrevStep(): void {
        const prevStep: number = this.getState("currentStep") - 1;

        this.changeCurrentStepNumber(prevStep);
        this.checkLastStep();
        this._wizardContainer.previousStep();
      }

      public onEditStep(event: sap.ui.base.Event): void {
        const source = event.getSource() as EventProvider.SourceControl;
        const stepNumber: number = +source.data("step");

        this.navigateToWizardPage(stepNumber);
      }

      public onCancel(event: sap.ui.base.Event): void {
        const source = event.getSource() as EventProvider.SourceControl;
        this.loadDiscardPopover(source);
      }

      private generateBankLogin(): void {
        const name = this.getProperty("Name") as string,
          login: string = name + (0 | Math.random());

        this.setProperty("Login", login);
      }

      private loadDiscardPopover(source: sap.ui.base.EventProvider): void {
        if (!this._discardPopover) {
          this.loadFragment("DiscardConfirmation").then(
            function (popover: sap.m.Popover) {
              this._discardPopover = popover;
              this.getView().addDependent(popover);
              popover.openBy(source, true);
            }.bind(this)
          );
        } else {
          this._discardPopover.openBy(source, true);
        }
      }

      private checkLastStep(): void {
        const totalSteps: number = this._wizardContainer.getSteps().length,
          currentStep: number = this.getState("currentStep"),
          isLastStep: boolean = totalSteps === currentStep;

        this.setState("isStepLast", !isLastStep);
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
        const wizardStep = this._wizardContainer.getSteps()[stepNumber];

        this._wizardContainer.goToStep(wizardStep, true);

        this._navContainer.detachAfterNavigate(this.navigateToWizardStep);
      }
    }

    return AppController;
  }
);
