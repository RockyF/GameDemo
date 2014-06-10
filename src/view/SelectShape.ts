/**
 * Created by lenovo on 2014/6/10.
 */

///<reference path="../egret.d.ts"/>

class SelectShape extends egret.Shape{
	constructor(){
		super();

		this.scaleY = 0.5;
	}

	resize(size:number = 50, color:number = 0xff0000):void{
		this.graphics.clear();
		this.graphics.lineStyle(2, color);
		this.graphics.drawCircle(0, 0, size / 2);
	}
}