/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../support/IAiScript.ts"/>

class AIObject{

	static STATE_IDLE:Number = 0;
	static STATE_WALK:Number = 1;
	static STATE_ATTACK:Number = 2;
	static STATE_ESCAPE:number = 3;

	target:RoleObject;
	keyName:string;

	state:number = AIObject.STATE_IDLE;

	private _aiInstance:IAiScript;

	constructor(target:RoleObject){
		this.target = target;
		this.keyName = this.target.vo.keyName;
		var clazz = egret.getDefinitionByName(this.keyName);
		this._aiInstance = new clazz();
		this._aiInstance.onCreate();
	}

	step():void{
		this._aiInstance.onStep();
	}

	destory():void{
		this._aiInstance.onDestroy();
	}
}