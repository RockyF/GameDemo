/**
 * Created by lenovo on 2014/6/10.
 */

///<reference path="../egret.d.ts"/>

class UILayer extends egret.DisplayObjectContainer{
	private static _instance:UILayer;
	public static getInstance():UILayer{
		if(UILayer._instance == undefined){
			UILayer._instance = new UILayer();
		}
		return UILayer._instance;
	}

	private uiStage:egret.UIStage;
	
	constructor(){
		super();

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.loadGroup("ui");
	}

	private onResourceLoadComplete(event:RES.ResourceEvent):void {
		if (event.groupName == "ui") {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			this.init();
		}
	}

	init():void{
		//实例化GUI根容器
		var uiStage:egret.UIStage = new egret.UIStage();
		this.uiStage = uiStage;
		this.addChild(uiStage);

		var button:egret.Button = new egret.Button();
		button.skinName = ButtonSkin;
		button.left = 0;
		button.bottom = 0;
		button.label = "shoot";
		this.uiStage.addElement(button);
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
	}

	onTap(event:egret.TouchEvent):void{
		RoleManager.getInstance().roleAttack(0);
	}
}