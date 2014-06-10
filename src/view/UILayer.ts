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
	
	constructor(){
		super();

		this.init();
	}

	init():void{
		var btn:egret.Bitmap = new egret.Bitmap(RES.getRes("btn_png"));
		btn.x = 600;
		btn.y = 400;
		btn.touchEnabled = true;
		this.addChild(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
	}

	onTap(event:egret.TouchEvent):void{
		console.log("onTap");
		RoleManager.getInstance().roleAttack(0);
	}
}