/**
 * Created by lenovo on 2014/6/9.
 */

///<reference path="../support/IScript.ts"/>
///<reference path="../support/Behavior.ts"/>

class GameMain extends Behavior implements IScript{
	private static _instance:GameMain;
	public static getInstance():GameMain{
		if(GameMain._instance == undefined){
			GameMain._instance = new GameMain();
		}
		return GameMain._instance;
	}

	onCreate():void {
		this.createRole();
		//setInterval(this.createRole, 1000);
		for(var i = 0; i < 100; i++){
			this.createRole();
		}
	}

	createRole():void{
		var ro:RoleObject = RoleManager.getInstance().createRole({keyName:"Cowboy", skinName: "cowboy"});
		GameScene.getInstance().addToScene(ro.vo.id);
		RoleManager.getInstance().roleFlashTo(ro.vo.id, Math.random() * 800, Math.random() * 480);
	}

	onDestroy():void {
	}

	onStep():void {
	}

}