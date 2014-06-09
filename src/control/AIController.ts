/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../egret.d.ts"/>
///<reference path="../control/AIObject.ts"/>

class AIController{
	private static _instance:AIController;
	public static getInstance():AIController{
		return this._instance ? this._instance : this._instance = new AIController();
	}

	rate:number;

	private _timer:egret.Timer;

	objects:any;

	constructor(rate:number = 500){
		this.rate = rate;
		this.objects = [];

		this._timer = new egret.Timer(this.rate);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
	}

	start():void{
		this._timer.start();
	}

	pause():void{
		this._timer.stop();
		egret.Ticker.getInstance().unregister(this.update, this);
	}

	resume():void{
		this._timer.start();
	}

	stop():void{
		this._timer.stop();
	}

	update():void{
		var item:AIObject;
		for(var i = 0, len = this.objects.length; i< len; i++){
			item.step();
		}
	}
}