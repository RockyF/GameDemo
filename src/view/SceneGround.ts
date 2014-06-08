/**
 * Created by lenovo on 2014/6/6.
 */

///<reference path="../egret.d.ts"/>

class SceneGround extends egret.DisplayObjectContainer{
	url:string;
	bmp:egret.Bitmap;

	constructor(){
		super();
		this.init();
	}

	init(){
		this.bmp = new egret.Bitmap();
		this.addChild(this.bmp);
	}

	initData(id:number){
		this.url = "resources/assets/map/" + id + ".jpg";
		RES.getResByUrl(this.url, this.onCompleted, this, "image");
	}

	private onCompleted(res){
		this.bmp.texture = res;
	}
}