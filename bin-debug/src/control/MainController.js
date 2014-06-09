/**
* Created by lenovo on 2014/6/9.
*/
///<reference path="AIController.ts"/>
var MainController = (function () {
    function MainController() {
    }
    MainController.getInstance = function () {
        return this._instance ? this._instance : this._instance = new MainController();
    };

    MainController.prototype.start = function () {
        AIController.getInstance().start();
    };

    MainController.prototype.stop = function () {
        AIController.getInstance().stop();
    };
    return MainController;
})();
