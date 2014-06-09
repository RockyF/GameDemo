/**
* Created by lenovo on 2014/6/9.
*/
var Utils = (function () {
    function Utils() {
    }
    Utils.injectProp = function (target, data) {
        if (typeof data === "undefined") { data = null; }
        if (!data) {
            return false;
        }

        var result = true;
        for (var key in data) {
            if (target.hasOwnProperty(key)) {
                target[key] = data[key];
            } else {
                result = false;
            }
        }
        return result;
    };
    return Utils;
})();
