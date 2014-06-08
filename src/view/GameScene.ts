/**
 * Created by lenovo on 14-6-5.
 */

///<reference path="../egret.d.ts"/>
///<reference path="../model/SceneVO.ts"/>
///<reference path="../view/SceneObject.ts"/>
///<reference path="../view/SceneGround.ts"/>

class GameScene extends egret.Sprite{
	ground:SceneGround;

	roles:any;

	public constructor(){
		super();

		this.init();
	}

	private init():void{
		this.touchEnabled = true;
		this.graphics.beginFill(0x00FFFF, 0.5);
		this.graphics.drawRect(0, 0, 480, 800);
		this.graphics.endFill();

		this.roles = [];

		this.ground = new SceneGround();
		this.addChild(this.ground);
		this.ground.initData(1);

		var vo:SceneVO = new SceneVO();
		vo.skinName = "cowboy";
		var so:SceneObject = new RoleObject();
		so.initData(vo);
		so.x = 200;
		so.y = 400;
		this.addChild(so);
		this.roles.push(so);

		vo = new SceneVO();
		vo.skinName = "cowboy";
		var so:SceneObject = new RoleObject();
		so.initData(vo);
		so.x = 400;
		so.y = 400;
		this.addChild(so);
		this.roles.push(so);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneClicked, this);
	}

	private onSceneClicked(event:egret.TouchEvent):void{
		//console.log(event.localX, event.localY);
		this.roles[0].walkTo(event.localX, event.localY);
	}
}