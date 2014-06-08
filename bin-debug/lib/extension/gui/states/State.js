/**
* Copyright (c) 2014,Egret-Labs.org
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the Egret-Labs.org nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../egret/utils/HashObject.ts"/>
/// <reference path="../core/IStateClient.ts"/>
/// <reference path="IOverride.ts"/>
var egret;
(function (egret) {
    /**
    * @class egret.State
    * @classdesc
    * State 类定义视图状态，即组件的特定视图。
    * @extends egret.HashObject
    */
    var State = (function (_super) {
        __extends(State, _super);
        /**
        * @method egret.State#constructor
        * @param properties {any}
        */
        function State(properties) {
            if (typeof properties === "undefined") { properties = null; }
            _super.call(this);
            /**
            * 已经初始化标志
            */
            this.initialized = false;
            /**
            * 该视图状态的覆盖，表现为实现 IOverride 接口的对象的数组。
            * 这些覆盖在进入状态时按顺序应用，在退出状态时按相反的顺序删除。
            * @member egret.State#overrides
            */
            this.overrides = [];
            /**
            * 此视图状态作为 String 数组所属的状态组。
            * @member egret.State#stateGroups
            */
            this.stateGroups = [];
            for (var p in properties) {
                this[p] = properties[p];
            }
        }
        /**
        * 初始化视图
        * @method egret.State#initialize
        * @param parent {IStateClient}
        */
        State.prototype.initialize = function (parent) {
            if (!this.initialized) {
                this.initialized = true;
                for (var i = 0; i < this.overrides.length; i++) {
                    (this.overrides[i]).initialize(parent);
                }
            }
        };
        return State;
    })(egret.HashObject);
    egret.State = State;
})(egret || (egret = {}));
