/**
 * Created by lenovo on 2014/6/9.
 */

///<reference path="../support/IAiScript.ts"/>

class GameMain implements IAiScript{
	private static _instance:GameMain;
	public static getInstance():GameMain{
		if(GameMain._instance == undefined){
			GameMain._instance = new GameMain();
		}
		return GameMain._instance;
	}

	onCreate():void {
		var ro:RoleObject = RoleManager.getInstance().createRole({keyName:"Cowboy", skinName: "cowboy"});
		GameScene.getInstance().addToScene(ro.vo.id);
		//RoleManager.getInstance().roleWalkTo(ro.vo.id, 300, 300);
		RoleManager.getInstance().roleFlashTo(ro.vo.id, 300, 300);
	}

	onDestroy():void {
	}

	onStep():void {
	}

}