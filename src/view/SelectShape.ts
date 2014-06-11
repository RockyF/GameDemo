/**
 * Created by lenovo on 2014/6/10.
 */

///<reference path="../egret.d.ts"/>

class SelectShape extends egret.Shape{
	static colorMap:any = [0xFF0000, 0x00FF00, 0xFFFF00];

	constructor(){
		super();

		this.scaleY = 0.5;
	}

	resize(size:number = 50, colorType:number = 0):void{
		this.graphics.clear();
		this.graphics.lineStyle(2, SelectShape.colorMap[colorType]);
		this.graphics.drawCircle(0, 0, size / 2);
	}
}