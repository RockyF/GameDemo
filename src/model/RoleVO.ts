/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="SceneVO.ts"/>
///<reference path="../utils/Utils.ts"/>

class RoleVO extends SceneVO{
	static create(data:Object){
		var instance:RoleVO = new RoleVO();
		Utils.injectProp(instance, data);

		return instance;
	}

	attackRange:number = 100;
	attackRate:number = 3;

	group:number;
}