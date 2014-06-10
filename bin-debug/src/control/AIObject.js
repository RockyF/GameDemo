/**
* Created by lenovo on 2014/6/6.
*/
///<reference path="../support/IScript.ts"/>
var AIObject = (function () {
    function AIObject(target) {
        this.state = AIObject.STATE_IDLE;
        this.target = target;
        this.keyName = this.target.vo.keyName;
        var clazz = egret.getDefinitionByName(this.keyName);
        this._aiInstance = new clazz();
        this._aiInstance.onCreate();
    }
    AIObject.prototype.step = function () {
        this._aiInstance.onStep();
    };

    AIObject.prototype.destory = function () {
        this._aiInstance.onDestroy();
    };
    AIObject.STATE_IDLE = 0;
    AIObject.STATE_WALK = 1;
    AIObject.STATE_ATTACK = 2;
    AIObject.STATE_ESCAPE = 3;
    return AIObject;
})();
