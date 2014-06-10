/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../support/IScript.ts"/>
///<reference path="../support/Behavior.ts"/>

class Cowboy extends Behavior implements IScript{
	ro:RoleObject;

	onStep():void {
		if(this.ro.x > 400){
			//this.ro.playAction("attack");
		}
	}

	onCreate():void {
		this.ro = <RoleObject>this.target;
		console.log("onCreate.", this.target);
	}

	onDestroy():void {
		console.log("onDestroy.");
	}

	onSwitchState():void {
		console.log("onSwitchState.");
	}
}