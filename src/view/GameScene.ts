/**
 * Created by lenovo on 14-6-5.
 */

///<reference path="../egret.d.ts"/>
///<reference path="../model/SceneVO.ts"/>
///<reference path="../view/SceneObject.ts"/>
///<reference path="../view/SceneGround.ts"/>
///<reference path="../control/MainController.ts"/>

class GameScene extends egret.Sprite{
	private static _instance:GameScene;
	public static getInstance():GameScene{
		return this._instance ? this._instance : this._instance = new GameScene();
	}
	
	ground:SceneGround;

	liveLayer:egret.DisplayObjectContainer;
	deadLayer:egret.DisplayObjectContainer;

	roles:any;

	public constructor(){
		super();

		this.init();
	}

	private init():void{
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
	}

	getRoleById(id:number):RoleObject{
		return this.roles[id];
	}

	private onSceneClicked(event:egret.TouchEvent):void{
		//console.log(event.localX, event.localY);
		this.roles[0].walkTo(event.localX, event.localY);
	}

	addToScene(id:number):void{
		var ro:RoleObject = this.getRoleById(id);
		if(ro){
			ro.vo.isAlive ? this.liveLayer.addChild(ro) : this.deadLayer.addChild(ro);
		}
	}

	removeFromScene(id:number):void{
		var ro:RoleObject = this.getRoleById(id);
		if(ro){
			ro.vo.isAlive ? this.liveLayer.removeChild(ro) : this.deadLayer.removeChild(ro);
		}
	}
}