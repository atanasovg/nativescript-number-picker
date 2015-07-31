var common = require("./number-picker-common");
var style = require("ui/styling");
var colorModule = require("color");

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

var defaultColor;

function setColor(view, value) {
    var nativePicker = view.android;

    var size = 0;
    var count = nativePicker.getChildCount();
    for(var i = 0; i < count; i++) {
        var child = nativePicker.getChildAt(i);
        if(child instanceof android.widget.TextView) {
            child.setTextColor(value);
        }
    }
}

function resetColor(view, value) {
    setFontSize(defaultTextSize);
}

function getNativeColorValue(view) {
    if(defaultColor) {
        return defaultColor;
    }

    var nativePicker = view.android;

    var color;
    var count = nativePicker.getChildCount();

    for(var i = 0; i < count; i++) {
        var child = nativePicker.getChildAt(i);
        if(child instanceof android.widget.TextView) {
            defaultColor = new colorModule.Color(child.getTextColor());
            break;
        }
    }

    return defaultColor;
}

var changedHandler = new style.stylers.StylePropertyChangedHandler(setColor, resetColor, getNativeColorValue);
style.stylers.registerHandler(style.properties.colorProperty, changedHandler, "NumberPicker");

exports.NumberPicker = NumberPicker;