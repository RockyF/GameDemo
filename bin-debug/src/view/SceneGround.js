/**
* Created by lenovo on 2014/6/6.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../egret.d.ts"/>
var SceneGround = (function (_super) {
    __extends(SceneGround, _super);
    function SceneGround() {
        _super.call(this);
        this.init();
    }
    SceneGround.prototype.init = function () {
        this.bmp = new egret.Bitmap();
        this.addChild(this.bmp);
    };

    SceneGround.prototype.initData = function (id) {
        this.url = "resources/assets/map/" + id + ".jpg";
        RES.getResByUrl(this.url, this.onCompleted, this, "image");
    };

    SceneGround.prototype.onCompleted = function (res) {
        this.bmp.texture = res;
    };
    return SceneGround;
})(egret.DisplayObjectContainer);
