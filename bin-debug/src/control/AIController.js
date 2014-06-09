/**
* Created by lenovo on 2014/6/6.
*/
///<reference path="../egret.d.ts"/>
///<reference path="../control/AIObject.ts"/>
var AIController = (function () {
    function AIController(rate) {
        if (typeof rate === "undefined") { rate = 500; }
        this.rate = rate;
        this.objects = [];

        this._timer = new egret.Timer(this.rate);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
    }
    AIController.getInstance = function () {
        return this._instance ? this._instance : this._instance = new AIController();
    };

    AIController.prototype.start = function () {
        this._timer.start();
    };

    AIController.prototype.pause = function () {
        this._timer.stop();
        egret.Ticker.getInstance().unregister(this.update, this);
    };

    AIController.prototype.resume = function () {
        this._timer.start();
    };

    AIController.prototype.stop = function () {
        this._timer.stop();
    };

    AIController.prototype.update = function () {
        var item;
        for (var i = 0, len = this.objects.length; i < len; i++) {
            item.step();
        }
    };
    return AIController;
})();
