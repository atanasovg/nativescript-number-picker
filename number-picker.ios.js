var common = require("./number-picker-common");
var common = require("./number-picker-common");
var style = require("ui/styling");

function onValuePropertyChanged(data) {
    var picker = data.object;
    picker.ios.value = data.newValue;
}

common.NumberPicker.valueProperty.metadata.onSetNativeValue = onValuePropertyChanged;
require("utils/module-merge").merge(common, module.exports);

var ListenerClass = NSObject.extend({
    valueChanged: function(sender) {
        if(this._owner) {
            this._owner._onPropertyChangedFromNative(common.NumberPicker.valueProperty, sender.value);
        }
    }
}, {
    name: "ListenerClass",
    exposedMethods: {
        "valueChanged": { returns: interop.types.void, params: [ UIStepper ] }
    }
});

var NumberPicker = (function (_super) {
    global.__extends(NumberPicker, _super);
    function NumberPicker() {
        _super.apply(this, arguments);

        this._ios = new UIStepper();
        this._listener = new ListenerClass();
        this._listener._owner = this;
        this._ios.addTargetActionForControlEvents(this._listener, "valueChanged", UIControlEvents.UIControlEventValueChanged);
    }

    Object.defineProperty(NumberPicker.prototype, "ios", {
        get: function () {
            return this._ios;
        }
    });
    return NumberPicker;
})(common.NumberPicker);

// this function is called when the `color` Style property changes on a `NumberPicker` instance 
function setColor(view, value) {
    var nativePicker = view.ios;

    // value is UIColor, so we may apply it directly
    nativePicker.tintColor = value;
}

// this function is called when the `color` Style property changes and the new value is `undefined`
function resetColor(view, value) {
    var nativePicker = view.ios;

    // value is native UIColor, so apply it directly
    nativePicker.tintColor = value;
}

// this function is called when the `Styler` is about to reset the `color` property to its default (original) value.
function getNativeColorValue(view) {
    var nativePicker = view.ios;

    return nativePicker.tintColor;
}

var changedHandler = new style.stylers.StylePropertyChangedHandler(setColor, resetColor, getNativeColorValue);
style.stylers.registerHandler(style.properties.colorProperty, changedHandler, "NumberPicker");

exports.NumberPicker = NumberPicker;