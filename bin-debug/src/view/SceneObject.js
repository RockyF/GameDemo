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
        this.selectable = true;

        this.init();
    }
    SceneObject.prototype.init = function () {
        this._shadowBmp = new egret.Bitmap(RES.getRes("shadow_png"));
        this._shadowBmp.anchorX = 0.5;
        this._shadowBmp.anchorY = 0.5;
        this.addChild(this._shadowBmp);
    };

    SceneObject.prototype.initData = function (vo) {
        this.vo = vo;
    };

    /**
    *
    * */
    SceneObject.prototype.setSelect = function (visible, type, size) {
        if (typeof visible === "undefined") { visible = true; }
        if (typeof type === "undefined") { type = 0; }
        if (typeof size === "undefined") { size = 30; }
        if (visible) {
            this._selectShape.resize(size, type);
            if (!this.contains(this._selectShape)) {
                this.addChildAt(this._selectShape, 0);
            }
        } else {
            if (this.contains(this._selectShape)) {
                this.removeChild(this._selectShape);
            }
        }
    };
    return SceneObject;
})(egret.DisplayObjectContainer);
