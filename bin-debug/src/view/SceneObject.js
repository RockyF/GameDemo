/**
* Created by lenovo on 2014/6/5.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../support/GameObject.ts"/>
///<reference path="../model/GameSetting.ts"/>
///<reference path="../egret.d.ts"/>
var SceneObject = (function (_super) {
    __extends(SceneObject, _super);
    function SceneObject() {
        _super.call(this);
        this.inScene = false;

        this.init();
    }
    SceneObject.prototype.init = function () {
    };

    SceneObject.prototype.initData = function (vo) {
        this.vo = vo;
    };
    return SceneObject;
})(egret.DisplayObjectContainer);
