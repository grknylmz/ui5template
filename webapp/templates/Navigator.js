sap.ui.define([
    "sap/ui/base/Object",
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("gqs.tvv3.util.Navigator", {
        constructor: function () {
            this._baseUrl = window.location.origin;
        },
        _setCustomer360URL: function () {
            this._customer360Url = "dummy";
        },
        buildCustomer360URL: function (customerNo) {
            this._setCustomer360URL();
            this._fullCustUrl = this._baseUrl + this._customer360Url;
            if (this.fullCustUrl === undefined) {
                throw new Error('Cannot build the url.');
            }
        },
        openCustomer360: function () {
            window.open(this._fullCustUrl);
        }
    });
});