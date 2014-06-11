/**
 * Created by lenovo on 14-6-5.
 */

///<reference path="../egret.d.ts"/>
///<reference path="../model/SceneVO.ts"/>
///<reference path="../model/RoleManager.ts"/>
///<reference path="../model/SelectManager.ts"/>
///<reference path="../view/SceneObject.ts"/>
///<reference path="../view/SceneGround.ts"/>
///<reference path="../control/MainController.ts"/>

class GameScene extends egret.Sprite{
	private static _instance:GameScene;
	public static getInstance():GameScene{
		if(GameScene._instance == undefined){
			GameScene._instance = new GameScene();
		}
		return GameScene._instance;
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

		this.ground = new SceneGround();
		this.addChild(this.ground);
		this.ground.initData(1);

		this.deadLayer = new egret.DisplayObjectContainer();
		this.addChild(this.deadLayer);
		this.liveLayer = new egret.DisplayObjectContainer();
		this.addChild(this.liveLayer);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneClicked, this);

		MainController.getInstance().start();
	}

	private onSceneClicked(event:egret.TouchEvent):void{
		if(event.target instanceof RoleObject){
			if(!SelectManager.getInstance().setSelect(<SceneObject>(event.target))){
				this.selectedObjectMoveTo(event.localX, event.localY);
			}
		}else{
			this.selectedObjectMoveTo(event.localX, event.localY);
		}
	}

	selectedObjectMoveTo(x:number, y:number):void{
		var ro:RoleObject = <RoleObject>(SelectManager.getInstance().getSelectSo());
		if(ro){
			ro.walkTo(x, y);
		}
	}

	addToScene(id:number):void{
		var ro:RoleObject = RoleManager.getInstance().getRoleById(id);
		if(ro){
			if(ro.vo.isAlive){
				this.liveLayer.addChild(ro)
			}else{
				this.deadLayer.addChild(ro);
			}
			ScriptController.getInstance().register(ro);
		}
	}

	removeFromScene(id:number):void{
		var ro:RoleObject = RoleManager.getInstance().getRoleById(id);
		if(ro){
			ro.vo.isAlive ? this.liveLayer.removeChild(ro) : this.deadLayer.removeChild(ro);
		}
	}
}