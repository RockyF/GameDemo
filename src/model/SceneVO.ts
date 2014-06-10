/**
 * Created by lenovo on 2014/6/5.
 */

class SceneVO extends ValueObject{
	private static ID_INK:number = 0;

	skinName:string;

	name:string;
	sex:number;
	hp:number;
	mp:number;
	speed:number = 100;

	type:number = 0;
	keyName:string = "";

	isAlive:boolean = true;
	canMove:boolean = true;

	constructor(){
		this.id = SceneVO.ID_INK;
		SceneVO.ID_INK++;
	}
}