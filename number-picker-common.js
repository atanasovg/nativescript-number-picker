var view = require("ui/core/view");
var dObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");

var NumberPicker = (function (_super) {
    global.__extends(NumberPicker, _super);
    function NumberPicker() {
        _super.call(this);
    }
    Object.defineProperty(NumberPicker.prototype, "value", {
        get: function () {
            return this._getValue(NumberPicker.valueProperty);
        },
        set: function (value) {
            this._setValue(NumberPicker.valueProperty, value);
        }
    });
    NumberPicker.valueProperty = new dObservable.Property("value", "NumberPicker", new proxy.PropertyMetadata(0, dObservable.PropertyMetadataSettings.AffectsLayout));
    return NumberPicker;
})(view.View);

exports.NumberPicker = NumberPicker;