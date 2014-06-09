/**
 * Created by lenovo on 2014/6/9.
 */

///<reference path="AIController.ts"/>

class MainController{
	private static _instance:MainController;
	public static getInstance():MainController{
		return this._instance ? this._instance : this._instance = new MainController();
	}
	
	constructor(){

	}

	start():void{
		AIController.getInstance().start();
	}

	stop():void{
		AIController.getInstance().stop();
	}
}