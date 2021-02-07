sap.ui.define(
  ["sap/ui/core/UIComponent"],
  function (UIComponent: typeof sap.ui.core.UIComponent) {
    "use strict";

    class Component extends UIComponent {
      constructor(settings: object) {
        const uiComponentClass = UIComponent.extend("wizard.Component", {
          metadata: {
            manifest: "json"
          }
        });

        Component.prototype.getMetadata =
          uiComponentClass.prototype.getMetadata;

        super("wizard.Component", settings);
      }

      init(): void {
        UIComponent.prototype.init.apply(this, arguments);

        this.getRouter().initialize();
      }
    }

    return Component;
  }
);
