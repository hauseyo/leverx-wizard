sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
	function (Controller, Fragment) {
		"use strict";

		return Controller.extend("wizard.Controller.BaseController", {
			getModel: function () {
				return this.getView().getModel();
			},

			getProperty: function (sPath) {
				return this.getModel().getProperty("/" + sPath);
			},

			setProperty: function (sPath, vValue) {
				this.getModel().setProperty("/" + sPath, vValue);
			},

			getState: function (sPath) {
				return this.getView()
					.getModel("states")
					.getProperty("/" + sPath);
			},

			setState: function (sPath, vValue) {
				this.getView()
					.getModel("states")
					.setProperty("/" + sPath, vValue);
			},

			loadFragment: function (sFragmentName) {
				return Fragment.load({
					id: this.getView().getId(),
					name: "wizard.fragments." + sFragmentName,
					controller: this,
				});
			},
		});
	}
);
