/**
 * Created by lenovo on 2014/6/9.
 */

///<reference path="../view/RoleObject.ts"/>

class RoleManager{
	private static _instance:RoleManager;
	public static getInstance():RoleManager{
		return this._instance ? this._instance : this._instance = new RoleManager();
	}
	
	roles:Array = [];

	createRole(data:Object):RoleObject{
		return RoleObject.create(data);
	}

	getRoleById(id:number):RoleObject{
		return this.roles[id];
	}

	roleWalkTo(id:number, x:number, y:number):void{
		var ro:RoleObject = this.getRoleById(id);
		if(ro){
			ro.walkTo(x, y);
		}
	}

	roleFlashTo(id:number, x:number, y:number):void{
		var ro:RoleObject = this.getRoleById(id);
		if(ro){
			ro.flashTo(x, y);
		}
	}
}