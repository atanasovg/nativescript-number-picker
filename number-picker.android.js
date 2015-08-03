var common = require("./number-picker-common");
var style = require("ui/styling");

function onValuePropertyChanged(data) {
    var picker = data.object;
    if (!picker.android) {
        return;
    }
    picker.android.setValue(data.newValue);
}

common.NumberPicker.valueProperty.metadata.onSetNativeValue = onValuePropertyChanged;
require("utils/module-merge").merge(common, module.exports);

var NumberPicker = (function (_super) {
    global.__extends(NumberPicker, _super);
    function NumberPicker() {
        _super.apply(this, arguments);
    }
    NumberPicker.prototype._createUI = function () {
        this._android = new android.widget.NumberPicker(this._context);

        var that = new WeakRef(this);
        var changeListener = new android.widget.NumberPicker.OnValueChangeListener({
            onValueChange: function(picker, oldVal, newVal){
                var instance = that.get();
                if(instance) {
                    instance._onPropertyChangedFromNative(NumberPicker.valueProperty, newVal);
                }
            }
        });

        this._android.setOnValueChangedListener(changeListener);
    };
    Object.defineProperty(NumberPicker.prototype, "android", {
        get: function () {
            return this._android;
        }
    });
    return NumberPicker;
})(common.NumberPicker);

exports.NumberPicker = NumberPicker;