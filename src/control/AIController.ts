/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../egret.d.ts"/>

class AIController{
	private static _instance:AIController;
	public static getInstance():AIController{
		return this._instance ? this._instance : this._instance = new AIController();
	}

	rate:number;

	objects:Array;

	constructor(rate:number = 500){
		this.rate = rate;
		this.objects = [];
	}

	start():void{
		egret.Ticker.getInstance().register(this.update, this);
	}

	update():void{
		var item:AIObject;
		for(var i = 0, len = this.objects.length; i< len; i++){
			item.step();
		}
	}

	pause():void{
		egret.Ticker.getInstance().unregister(this.update, this);
	}

	resume():void{
		egret.Ticker.getInstance().register(this.update, this);
	}

	stop():void{
		egret.Ticker.getInstance().unregister(this.update, this);
	}
}