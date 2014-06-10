/**
 * Created by lenovo on 2014/6/9.
 */

class Utils{
	static injectProp(target:Object, data:Object = null):boolean{
		if(!data){
			return false;
		}

		var result = true;
		for(var key in data){
			/*if(target.hasOwnProperty(key)){
			 target[key] = data[key];
			 }else{
			 result = false;
			 }*/
			target[key] = data[key];
		}
		return result;
	}
}