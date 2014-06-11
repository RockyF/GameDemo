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
///<reference path="../model/RoleManager.ts"/>
///<reference path="../model/SelectManager.ts"/>
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
        if (GameScene._instance == undefined) {
            GameScene._instance = new GameScene();
        }
        return GameScene._instance;
    };

    GameScene.prototype.init = function () {
        this.touchEnabled = true;

        /*this.graphics.beginFill(0x00FFFF, 0.5);
        this.graphics.drawRect(0, 0, 480, 800);
        this.graphics.endFill();*/
        this.ground = new SceneGround();
        this.addChild(this.ground);
        this.ground.initData(1);

        this.deadLayer = new egret.DisplayObjectContainer();
        this.addChild(this.deadLayer);
        this.liveLayer = new egret.DisplayObjectContainer();
        this.addChild(this.liveLayer);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneClicked, this);

        MainController.getInstance().start();
    };

    GameScene.prototype.onSceneClicked = function (event) {
        if (event.target instanceof RoleObject) {
            if (!SelectManager.getInstance().setSelect((event.target))) {
                this.selectedObjectMoveTo(event.localX, event.localY);
            }
        } else {
            this.selectedObjectMoveTo(event.localX, event.localY);
        }
    };

    GameScene.prototype.selectedObjectMoveTo = function (x, y) {
        var ro = (SelectManager.getInstance().getSelectSo());
        if (ro) {
            ro.walkTo(x, y);
        }
    };

    GameScene.prototype.addToScene = function (id) {
        var ro = RoleManager.getInstance().getRoleById(id);
        if (ro) {
            if (ro.vo.isAlive) {
                this.liveLayer.addChild(ro);
            } else {
                this.deadLayer.addChild(ro);
            }
            ScriptController.getInstance().register(ro);
        }
    };

    GameScene.prototype.removeFromScene = function (id) {
        var ro = RoleManager.getInstance().getRoleById(id);
        if (ro) {
            ro.vo.isAlive ? this.liveLayer.removeChild(ro) : this.deadLayer.removeChild(ro);
        }
    };
    return GameScene;
})(egret.Sprite);
