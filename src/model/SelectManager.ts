/**
 * Created by lenovo on 2014/6/11.
 */

class SelectManager{
	private static _instance:SelectManager;
	public static getInstance():SelectManager{
		if(SelectManager._instance == undefined){
			SelectManager._instance = new SelectManager();
		}
		return SelectManager._instance;
	}

	selectedSo:SceneObject;
	
	setSelect(so:SceneObject):boolean{
		for(var i = 0, len = GameScene.getInstance().liveLayer.numChildren; i < len; i++){
			var tSo:SceneObject = <SceneObject>(GameScene.getInstance().liveLayer.getChildAt(i));
			if(tSo.selectable) {
				if (tSo == so) {
					tSo.setSelect(true, 0, 30);
				} else {
					tSo.setSelect(false);
				}
			}
		}
		this.selectedSo = so;
		return so.selectable;
	}

	getSelectSo():SceneObject{
		return this.selectedSo;
	}
}