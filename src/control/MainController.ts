/**
 * Created by lenovo on 2014/6/9.
 */

///<reference path="ScriptController.ts"/>

class MainController{
	private static _instance:MainController;
	public static getInstance():MainController{
		if(MainController._instance == undefined){
			MainController._instance = new MainController();
		}
		return MainController._instance;
	}
	
	constructor(){

	}

	start():void{
		setTimeout(function(){
			ScriptController.getInstance().start();
			ScriptController.getInstance().register("GameMain");
		}, 1000);
	}

	stop():void{
		ScriptController.getInstance().stop();
	}
}