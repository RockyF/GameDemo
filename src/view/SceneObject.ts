/**
 * Created by lenovo on 2014/6/5.
 */

///<reference path="../support/GameObject.ts"/>
///<reference path="../model/GameSetting.ts"/>
///<reference path="../egret.d.ts"/>

class SceneObject extends egret.DisplayObjectContainer{
	vo:SceneVO;
	inScene:boolean = false;

	constructor(){
		super();

		this.init();
	}

	init(){

	}

	initData(vo:SceneVO){
		this.vo = vo;
	}
}