/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="SceneVO.ts"/>
///<reference path="../utils/Utils.ts"/>

class BulletVO extends SceneVO{
	static create(data:Object){
		var instance:BulletVO = new BulletVO();
		Utils.injectProp(instance, data);

		return instance;
	}

	group:number;
}