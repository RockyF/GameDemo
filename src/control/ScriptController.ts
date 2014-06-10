/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../egret.d.ts"/>
///<reference path="ScriptObject.ts"/>

class ScriptController{
	private static _instance:ScriptController;
	public static getInstance():ScriptController{
		if(ScriptController._instance == undefined){
			ScriptController._instance = new ScriptController();
		}
		return ScriptController._instance;
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

	register(clazz:Object){
		this.objects.push(new ScriptObject(clazz));
	}

	unregister(clazz:Object){

	}

	update():void{
		var item:ScriptObject;
		for(var i = 0, len = this.objects.length; i< len; i++){
			item = this.objects[i];
			item.step();
		}
	}
}