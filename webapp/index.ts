sap.ui.getCore().attachInit(function () {
  sap.ui.require(
    ["sap/ui/core/ComponentContainer"],
    function (ComponentContainer: typeof sap.ui.core.ComponentContainer) {
      new ComponentContainer("wizard", {
        name: "wizard",
        settings: {
          id: "wizard"
        }
      }).placeAt("container");
    }
  );
});
