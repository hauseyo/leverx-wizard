sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"], function (Controller, Fragment) {
    "use strict";
    return Controller.extend("wizard.Controller.BaseController", {
        /**
         * Method to get default state.
         * @private
         * @return {sap.ui.base.ManagedObject} - Returns managed object class.
         */
        getModel: function () {
            return this.getView().getModel();
        },
        /**
         * @param  {string} sPath - Path to the context of the default model.
         * @public
         * @return {void} Returns context value.
         */
        getProperty: function (sPath) {
            return this.getModel().getProperty("/" + sPath);
        },
        /**
         * Method to change context value of the default model.
         * @param  {string} sPath - Path to the context of the default model.
         * @param  {void} vValue - Value of the context that should be changed.
         * @public
         */
        setProperty: function (sPath, vValue) {
            this.getModel().setProperty("/" + sPath, vValue);
        },
        /**
         * Method to get state of the page.
         * @param  {string} sPath - Path to the state of the state model.
         * @return {void} Returns state value.
         * @public
         */
        getState: function (sPath) {
            return this.getView()
                .getModel("states")
                .getProperty("/" + sPath);
        },
        /**
         * Method to change state of the page.
         * @param  {string} sPath - Path to the state of the state model.
         * @param  {void} vValue - New value of the state that should be changed.
         * @public
         */
        setState: function (sPath, vValue) {
            this.getView()
                .getModel("states")
                .setProperty("/" + sPath, vValue);
        },
        /**
         * Method to load fragment by given name.
         * @param  {string} sFragmentName - Name of the fragment file.
         * @return {Promise<sap.ui.core.Component>} Returns promise.
         * @public
         */
        loadFragment: function (sFragmentName) {
            return Fragment.load({
                id: this.getView().getId(),
                name: "wizard.fragments." + sFragmentName,
                controller: this,
            });
        },
    });
});
