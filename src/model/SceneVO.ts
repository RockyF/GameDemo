/**
 * Created by lenovo on 2014/6/5.
 */

class SceneVO extends ValueObject{
	skinName:string;

	name:string;
	sex:number;
	hp:number;
	mp:number;
	speed:number = 100;

	type:number = 0;
	keyName:string = "";

	isAlive:boolean = false;
	canMove:boolean = true;
}