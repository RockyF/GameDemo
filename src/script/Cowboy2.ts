/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../support/IAiScript.ts"/>

class Cowboy implements IAiScript{
	onStep():void {
	}

	onCreate():void {
		console.log("onCreate.");
	}

	onDestroy():void {
		console.log("onDestroy.");
	}

	onSwitchState():void {
		console.log("onSwitchState.");
	}
}