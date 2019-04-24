sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
  return BaseObject.extend("ems.UI5Showcase.util.Message", {
    constructor: function(data) {
      this.author = data.author;
      this.info = data.info;
      this.text = data.text;
      this.timestamp = data.timestamp;
    }
  });
});
