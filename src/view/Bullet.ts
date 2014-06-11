/**
 * Created by lenovo on 2014/6/11.
 */

///<reference path="../egret.d.ts"/>

class Bullet extends SceneObject{
	static create(data:Object){
		var instance:Bullet = new Bullet();
		Utils.injectProp(instance, data);

		return instance;
	}

	start():void{
		egret.Ticker.getInstance().register(this.onEnterFrame, this);
	}

	stop():void{
		egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
	}

	onEnterFrame():void{
		this.x += this.vo.speed;
		this.y += this.vo.speed;
	}
}