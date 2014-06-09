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
///<reference path="../control/MainController.ts"/>
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);

        this.init();
    }
    GameScene.getInstance = function () {
        return this._instance ? this._instance : this._instance = new GameScene();
    };

    GameScene.prototype.init = function () {
        this.touchEnabled = true;

        /*this.graphics.beginFill(0x00FFFF, 0.5);
        this.graphics.drawRect(0, 0, 480, 800);
        this.graphics.endFill();*/
        this.liveLayer = new egret.DisplayObjectContainer();
        this.deadLayer = new egret.DisplayObjectContainer();

        this.ground = new SceneGround();
        this.addChild(this.ground);
        this.ground.initData(1);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneClicked, this);

        MainController.getInstance().start();
    };

    GameScene.prototype.getRoleById = function (id) {
        return this.roles[id];
    };

    GameScene.prototype.onSceneClicked = function (event) {
        //console.log(event.localX, event.localY);
        this.roles[0].walkTo(event.localX, event.localY);
    };

    GameScene.prototype.addToScene = function (id) {
        var ro = this.getRoleById(id);
        if (ro) {
            ro.vo.isAlive ? this.liveLayer.addChild(ro) : this.deadLayer.addChild(ro);
        }
    };

    GameScene.prototype.removeFromScene = function (id) {
        var ro = this.getRoleById(id);
        if (ro) {
            ro.vo.isAlive ? this.liveLayer.removeChild(ro) : this.deadLayer.removeChild(ro);
        }
    };
    return GameScene;
})(egret.Sprite);
