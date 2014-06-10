/**
 * Created by lenovo on 2014/6/9.
 */

///<reference path="../view/RoleObject.ts"/>

class RoleManager{
	private static _instance:RoleManager;
	public static getInstance():RoleManager{
		if(RoleManager._instance == undefined){
			RoleManager._instance = new RoleManager();
		}
		return RoleManager._instance;
	}
	
	roles:any = [];

	createRole(data:Object):RoleObject{
		var ro:RoleObject = RoleObject.create(data);
		this.roles[ro.vo.id] = ro;
		return ro;
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

	roleAttack(id:number):void{
		var ro:RoleObject = this.getRoleById(id);
		if(ro){
			ro.playAction("attack", false);
		}
	}
}