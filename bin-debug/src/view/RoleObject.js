/**
* Created by lenovo on 2014/6/6.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="SceneObject"/>
var RoleObject = (function (_super) {
    __extends(RoleObject, _super);
    function RoleObject() {
        var _this = this;
        _super.call(this);
        this.isWalking = false;
        this.desPoint = new egret.Point();
        this._fadeinTime = -1;
        this._autoPlay = true;
        this._defaultActionName = NS.ACTION_IDLE;
        this.onComplete = function (event) {
            _this.playAction(NS.ACTION_IDLE);
        };
    }
    RoleObject.create = function (data) {
        var instance = new RoleObject();
        var vo = RoleVO.create(data);
        instance.initData(vo);

        return instance;
    };

    RoleObject.prototype.init = function () {
        _super.prototype.init.call(this);

        this._hpBar = new egret.ProgressBar();
        //this._selectShape = new SelectShape();
    };

    RoleObject.prototype.initData = function (vo) {
        _super.prototype.initData.call(this, vo);

        //this._selectShape.resize();
        //this.addChild(this._selectShape);
        if (RES.getRes(this.vo.skinName + "_skeleton_json")) {
            this.initArmature();
        } else {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.loadGroup(vo.skinName);
        }
    };

    RoleObject.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == this.vo.skinName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.initArmature();
        }
    };

    RoleObject.prototype.initArmature = function () {
        var skeletonData = RES.getRes(this.vo.skinName + "_skeleton_json");
        var textureData = RES.getRes(this.vo.skinName + "_texture_json");
        var texture = RES.getRes(this.vo.skinName + "_texture_png");

        var factory = new dragonBones.factorys.EgretFactory();
        factory.addSkeletonData(dragonBones.objects.DataParser.parseSkeletonData(skeletonData));
        factory.addTextureAtlas(new dragonBones.textures.EgretTextureAtlas(texture, textureData));

        this.armature = factory.buildArmature(this.vo.skinName);
        this.armature.addEventListener(dragonBones.events.AnimationEvent.COMPLETE, this.onComplete);
        this.armatureDisplay = this.armature.getDisplay();
        dragonBones.animation.WorldClock.clock.add(this.armature);
        this.addChild(this.armatureDisplay);
        if (this._autoPlay) {
            this.playAction(this._defaultActionName);
        }
    };

    RoleObject.prototype.playAction = function (actionName, loop) {
        if (typeof loop === "undefined") { loop = true; }
        if (this.armature.animation.hasAnimation(actionName)) {
            this.armature.animation.gotoAndPlay(actionName, this._fadeinTime, -1, loop ? 0 : 1);
        }
    };

    RoleObject.prototype.walkTo = function (x, y) {
        if (!this.setDesPoint(x, y)) {
            return true;
        }

        this.armatureDisplay.scaleX = x > this.x ? -1 : 1;

        var distance = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
        if (this.isWalking) {
            egret.Tween.removeTweens(this);
        } else {
            this.playAction(NS.ACTION_WALK);
            this.isWalking = true;
        }
        egret.Tween.get(this).to({ x: x, y: y }, distance * (1000 / this.vo.speed)).call(function () {
            console.log("Move End!");
            this.playAction(NS.ACTION_IDLE);
            this.isWalking = false;
        });

        return true;
    };

    RoleObject.prototype.stop = function () {
        if (this.isWalking) {
            egret.Tween.removeTweens(this);

            //console.log("Move End!");
            this.playAction(NS.ACTION_IDLE);
            this.isWalking = false;
        }
    };

    RoleObject.prototype.flashTo = function (x, y) {
        if (!this.setDesPoint(x, y)) {
            return true;
        }

        this.stop();
        this.x = x;
        this.y = y;

        return true;
    };

    RoleObject.prototype.setDesPoint = function (x, y) {
        this.desPoint.x = x;
        this.desPoint.y = y;
        return this.desPoint.x != this.x && this.desPoint.y != this.y;
    };
    return RoleObject;
})(SceneObject);
