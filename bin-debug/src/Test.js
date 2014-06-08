/**
* Created by lenovo on 14-6-5.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="egret.d.ts"/>
///<reference path="model/SceneVO.ts"/>
///<reference path="view/SceneObject.ts"/>
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);

        this.init();
    }
    Test.prototype.init = function () {
        this.graphics.beginFill(0xFFFF00, 0.5);
        this.graphics.drawRect(0, 0, 480, 800);
        this.graphics.endFill();

        var vo = new SceneObjectVO();
        vo.skinName = "cowboy";
        var so = new SceneObject();
        so.initData(vo);
        so.x = 300;
        so.y = 300;
        this.addChild(so);
        //so.playAction("stand");
    };
    return Test;
})(egret.Sprite);
