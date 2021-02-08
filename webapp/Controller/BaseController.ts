sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
  function (
    Controller: typeof sap.ui.core.mvc.Controller,
    Fragment: typeof sap.ui.core.Fragment
  ) {
    "use strict";

    class BaseController extends Controller {
      constructor() {
        const controllerClass = Controller.extend(
          "wizard.Controller.BaseController",
          {}
        );

        BaseController.prototype.getMetadata =
          controllerClass.prototype.getMetadata;

        super("wizard.Controller.BaseController");
      }

      public getModel(): sap.ui.model.json.JSONModel {
        return this.getView().getModel();
      }

      public getProperty(path: string): any {
        return this.getModel().getProperty("/" + path);
      }

      public setProperty(path: string, value: any): void {
        this.getModel().setProperty("/" + path, value);
      }

      public getState(path: string): any {
        return this.getView()
          .getModel("states")
          .getProperty("/" + path);
      }

      public setState(path: string, value: any): void {
        const stateModel: sap.ui.model.json.JSONModel = this.getView().getModel(
          "states"
        );

        stateModel.setProperty("/" + path, value);
      }

      public loadFragment(fragmentName: string): Promise<sap.ui.core.Control> {
        return Fragment.load({
          id: this.getView().getId(),
          name: "wizard.fragments." + fragmentName,
          controller: this
        });
      }
    }

    return BaseController;
  }
);
