/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../support/IScript.ts"/>

class ScriptObject{

	static STATE_IDLE:number = 0;
	static STATE_WALK:number = 1;
	static STATE_ATTACK:number = 2;
	static STATE_ESCAPE:number = 3;

	target:Object;
	keyName:string;

	state:number = ScriptObject.STATE_IDLE;

	private _scriptInstance:IScript;

	constructor(target:Object = null){
		this.target = target;

		if(typeof target == "string"){
			this.setKeyName(String(target));
		}else if(target instanceof RoleObject){
			this.setKeyName(this.target["vo"].keyName);
		}
	}

	setKeyName(keyName:string):void{
		this.keyName = keyName;
		var clazz = egret.getDefinitionByName(this.keyName);
		this.setInstance(new clazz());
	}

	setInstance(instance:IScript){
		this._scriptInstance = instance;
		Utils.injectProp(this._scriptInstance, {target: this.target});
		this._scriptInstance.onCreate();
	}

	step():void{
		this._scriptInstance.onStep();
	}

	destory():void{
		this._scriptInstance.onDestroy();
	}
}