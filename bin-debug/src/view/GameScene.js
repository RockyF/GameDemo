/**
* Created by lenovo on 14-6-5.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../egret.d.ts"/>
///<reference path="../model/SceneVO.ts"/>
///<reference path="../view/SceneObject.ts"/>
///<reference path="../view/SceneGround.ts"/>
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);

        this.init();
    }
    GameScene.prototype.init = function () {
        this.touchEnabled = true;
        this.graphics.beginFill(0x00FFFF, 0.5);
        this.graphics.drawRect(0, 0, 480, 800);
        this.graphics.endFill();

        this.roles = [];

        this.ground = new SceneGround();
        this.addChild(this.ground);
        this.ground.initData(1);

        var vo = new SceneVO();
        vo.skinName = "cowboy";
        var so = new RoleObject();
        so.initData(vo);
        so.x = 200;
        so.y = 400;
        this.addChild(so);
        this.roles.push(so);

        vo = new SceneVO();
        vo.skinName = "cowboy";
        var so = new RoleObject();
        so.initData(vo);
        so.x = 400;
        so.y = 400;
        this.addChild(so);
        this.roles.push(so);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneClicked, this);
    };

    GameScene.prototype.onSceneClicked = function (event) {
        //console.log(event.localX, event.localY);
        this.roles[0].walkTo(event.localX, event.localY);
        this.roles[1].walkTo(event.localX, event.localY);
    };
    return GameScene;
})(egret.Sprite);
