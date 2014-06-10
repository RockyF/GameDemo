/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="SceneObject"/>

class RoleObject extends SceneObject{
	static create(data:Object){
		var instance:RoleObject = new RoleObject();
		var vo:RoleVO = RoleVO.create(data);
		instance.initData(vo);
		
		return instance;
	}
	
	armature:dragonBones.Armature;
	armatureDisplay:any;

	isWalking:boolean = false;
	desPoint:egret.Point = new egret.Point();

	_fadeinTime:number = -1;
	_autoPlay:boolean = true;
	_defaultActionName:string = NS.ACTION_IDLE;

	_hpBar:egret.ProgressBar;
	_selectShape:SelectShape;

	constructor(){
		super();
	}

	init(){
		super.init();

		this._hpBar = new egret.ProgressBar();
		this._selectShape = new SelectShape();
	}

	initData(vo:RoleVO){
		super.initData(vo);

		this._selectShape.resize();
		this.addChild(this._selectShape);

		if(RES.getRes(this.vo.skinName + "_skeleton_json")){
			this.initArmature();
		}else{
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.loadGroup(vo.skinName);
		}
	}

	private onResourceLoadComplete(event:RES.ResourceEvent):void {
		if (event.groupName == this.vo.skinName) {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			this.initArmature();
		}
	}

	initArmature():void{
		var skeletonData = RES.getRes(this.vo.skinName + "_skeleton_json");
		var textureData = RES.getRes(this.vo.skinName + "_texture_json");
		var texture = RES.getRes(this.vo.skinName + "_texture_png");

		var factory = new dragonBones.factorys.EgretFactory();
		factory.addSkeletonData(dragonBones.objects.DataParser.parseSkeletonData(skeletonData));
		factory.addTextureAtlas(new dragonBones.textures.EgretTextureAtlas(texture, textureData));

		this.armature = factory.buildArmature(this.vo.skinName);
		this.armatureDisplay = this.armature.getDisplay();
		dragonBones.animation.WorldClock.clock.add(this.armature);
		this.addChild(this.armatureDisplay);
		if(this._autoPlay){
			this.playAction(this._defaultActionName);
		}
	}

	playAction(actionName:string){
		if(this.armature.animation.hasAnimation(actionName)){
			this.armature.animation.gotoAndPlay(actionName, this._fadeinTime, -1, 0);
		}
	}

	walkTo(x:number, y:number):boolean{
		if(!this.setDesPoint(x, y)){
			return true;
		}

		this.armatureDisplay.scaleX = x > this.x ? -1 : 1;

		var distance = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
		if(this.isWalking){
			egret.Tween.removeTweens(this);
		}else{
			this.playAction(NS.ACTION_WALK);
			this.isWalking = true;
		}
		egret.Tween.get(this).to({x:x, y:y}, distance * (1000 / this.vo.speed)).call(function (){
			console.log("Move End!");
			this.playAction(NS.ACTION_IDLE);
			this.isWalking = false;
		});

		return true;
	}

	stop():void{
		if(this.isWalking){
			egret.Tween.removeTweens(this);
			console.log("Move End!");
			this.playAction(NS.ACTION_IDLE);
			this.isWalking = false;
		}
	}

	flashTo(x:number, y:number):boolean{
		if(!this.setDesPoint(x, y)){
			return true;
		}

		this.stop();
		this.x = x;
		this.y = y;

		return true;
	}

	setDesPoint(x:number, y:number):boolean{
		this.desPoint.x = x;
		this.desPoint.y = y;
		return this.desPoint.x != this.x && this.desPoint.y != this.y;
	}
}