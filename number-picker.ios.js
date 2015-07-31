var common = require("./number-picker-common");

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

exports.NumberPicker = NumberPicker;