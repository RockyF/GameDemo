/**
* Created by lenovo on 2014/6/5.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SceneVO = (function (_super) {
    __extends(SceneVO, _super);
    function SceneVO() {
        _super.apply(this, arguments);
        this.speed = 100;
        this.type = 0;
        this.keyName = "";
        this.isAlive = false;
        this.canMove = true;
    }
    return SceneVO;
})(ValueObject);
