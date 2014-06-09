/**
* Created by lenovo on 2014/6/6.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="SceneVO.ts"/>
///<reference path="../utils/Utils.ts"/>
var RoleVO = (function (_super) {
    __extends(RoleVO, _super);
    function RoleVO() {
        _super.apply(this, arguments);
        this.attackRange = 100;
        this.attackRate = 3;
    }
    RoleVO.create = function (data) {
        var instance = new RoleVO();
        Utils.injectProp(instance, data);

        return instance;
    };
    return RoleVO;
})(SceneVO);
