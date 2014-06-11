/**
 * Created by lenovo on 2014/6/5.
 */

///<reference path="../support/GameObject.ts"/>
///<reference path="../model/GameSetting.ts"/>
///<reference path="../egret.d.ts"/>

class SceneObject extends egret.DisplayObjectContainer{
	vo:SceneVO;
	inScene:boolean = false;
	selectable:boolean = true;

	_selectShape:SelectShape;
	_shadowBmp:egret.Bitmap;

	constructor(){
		super();

		this.init();
	}

	init(){
		this._shadowBmp = new egret.Bitmap(RES.getRes("shadow_png"));
		this._shadowBmp.anchorX = 0.5;
		this._shadowBmp.anchorY = 0.5;
		this.addChild(this._shadowBmp);
	}

	initData(vo:SceneVO){
		this.vo = vo;
	}

	/**
	 *
	 * */
	setSelect(visible:boolean = true, type:number = 0, size:number = 30):void{
		if(visible){
			this._selectShape.resize(size, type);
			if(!this.contains(this._selectShape)){
				this.addChildAt(this._selectShape, 0);
			}
		}else{
			if(this.contains(this._selectShape)){
				this.removeChild(this._selectShape);
			}
		}
	}
}