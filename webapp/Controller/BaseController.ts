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

      public getModel() {
        return this.getView().getModel() as sap.ui.model.json.JSONModel;
      }

      public getProperty(path: string): unknown {
        return this.getModel().getProperty("/" + path);
      }

      public setProperty(path: string, value: unknown): void {
        this.getModel().setProperty("/" + path, value);
      }

      public getState(path: string): unknown {
        return this.getView()
          .getModel("states")
          .getProperty("/" + path);
      }

      public setState(path: string, value: unknown): void {
        const stateModel = this.getView().getModel(
          "states"
        ) as sap.ui.model.json.JSONModel;

        stateModel.setProperty("/" + path, value);
      }

      public loadFragment(
        fragmentName: string
      ): Promise<typeof sap.ui.core.Control> {
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
