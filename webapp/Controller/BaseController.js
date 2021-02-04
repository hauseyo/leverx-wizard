sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";

	return Controller.extend("wizard.Controller.BaseController", {
		getModel: function (sModelName) {
			return this.getView().getModel(sModelName || "");
		},

		getProperty: function (sPath) {
			return this.getModel().getProperty("/" + sPath);
		},

		setProperty: function (oData) {
			this.getModel(oData.model || "").setProperty(
				"/" + oData.path,
				oData.value
			);
		},

		getState: function (sPath) {
			return this.getModel("states").getProperty("/" + sPath);
		},

		setState: function (sPath, vValue) {
			this.getModel("states").setProperty("/" + sPath, vValue);
		},
	});
});
