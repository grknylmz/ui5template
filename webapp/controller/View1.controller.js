sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "ui5test/ui5test/templates/ClassTemplate",
    "ui5test/ui5test/templates/StaticMethods"
  ],
  function(Controller, ClassTemplate, StaticMethods) {
    "use strict";

    return Controller.extend("ui5test.ui5test.controller.View1", {
      onInit: function() {
        let instanceClass = new ClassTemplate();
        instanceClass.ownMethod();

        StaticMethods.staticMethod();
      }
    });
  }
);
