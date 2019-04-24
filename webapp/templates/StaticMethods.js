// declare the module (also ensures existance of ui5test.templates)
jQuery.sap.declare("ui5test.ui5test.templates.StaticMethods");

sap.ui.define([], function() {
  "use strict";
  var _privateStaticVariable;
  var staticVariable;
  return {
    staticMethod: function() {
      console.warn("called staticMethod!");
    },
    _privateStaticMethod: function() {
      console.warn(_privateStaticVariable);
    }
  };
});
