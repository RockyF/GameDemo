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
/// <reference path="../context/MainContext.ts"/>
/// <reference path="../context/renderer/RenderFilter.ts"/>
/// <reference path="../context/renderer/RendererContext.ts"/>
/// <reference path="DisplayObjectContainer.ts"/>
/// <reference path="RenderTexture.ts"/>
/// <reference path="Stage.ts"/>
/// <reference path="Texture.ts"/>
/// <reference path="../events/Event.ts"/>
/// <reference path="../events/EventDispatcher.ts"/>
/// <reference path="../geom/Matrix.ts"/>
/// <reference path="../geom/Point.ts"/>
/// <reference path="../geom/Rectangle.ts"/>
/// <reference path="../../jslib/NumberUtils.ts"/>
var egret;
(function (egret) {
    /**
    * @class egret.DisplayObject
    * @extends egret.EventDispatcher
    * @classdesc 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
    *
    * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
    *
    * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
    *
    * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
    *
    * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
    *
    * 任何继承自DisplayObject的类都必须实现以下方法
    * _render();
    * _measureBounds()
    * 不允许重写以下方法
    * _draw();
    * getBounds();
    *
    */
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            _super.call(this);
            this._parent = null;
            /**
            * 11111
            * @event egret.Event.event:ADDED_TO_STAGE
            */
            this._cacheAsBitmap = false;
            this._x = 0;
            this._y = 0;
            /**
            * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
            * @member {number} egret.DisplayObject#scaleX
            * @default 1
            */
            this._scaleX = 1;
            /**
            * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
            * @member {number} egret.DisplayObject#scaleY
            * @default 1
            */
            this._scaleY = 1;
            /**
            * 表示从对象绝对锚点X。
            * @member {number} egret.DisplayObject#anchorOffsetX
            * @default 0
            */
            this._anchorOffsetX = 0;
            /**
            * 表示从对象绝对锚点Y。
            * @member {number} egret.DisplayObject#anchorOffsetY
            * @default 0
            */
            this._anchorOffsetY = 0;
            /**
            * 表示从对象相对锚点X。
            * @member {number} egret.DisplayObject#anchorX
            * @default 0
            */
            this._anchorX = 0;
            /**
            * 表示从对象相对锚点Y。
            * @member {number} egret.DisplayObject#anchorY
            * @default 0
            */
            this._anchorY = 0;
            /**
            * 显示对象是否可见。
            * @member {boolean} egret.DisplayObject#visible
            */
            this.visible = true;
            /**
            * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位
            * @member {number} egret.DisplayObject#rotation
            * @default 0
            */
            this._rotation = 0;
            /**
            * 表示指定对象的 Alpha 透明度值
            * @member {number} egret.DisplayObject#alpha
            *  @default 1
            */
            this._alpha = 1;
            /**
            * 表示DisplayObject的x方向斜切
            * @member {number} egret.DisplayObject#skewX
            * @default 0
            */
            this._skewX = 0;
            /**
            * 表示DisplayObject的y方向斜切
            * @member {number} egret.DisplayObject#skewY
            * @default 0
            */
            this._skewY = 0;
            this._hasWidthSet = false;
            this._hasHeightSet = false;
            this.worldAlpha = 1;
            this.worldTransform = new egret.Matrix();
            this.worldBounds = new egret.Rectangle(0, 0, 0, 0);
            this._cacheBounds = new egret.Rectangle(0, 0, 0, 0);
        }
        Object.defineProperty(DisplayObject.prototype, "parent", {
            /**
            * 表示包含此显示对象的 DisplayObjectContainer 对象
            * @member {egret.DisplayObjectContainer} egret.DisplayObject#parent
            */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 仅供框架内部调用。
        */
        DisplayObject.prototype._parentChanged = function (parent) {
            this._parent = parent;
        };

        Object.defineProperty(DisplayObject.prototype, "x", {
            /**
            * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
            * @member {number} egret.DisplayObject#x
            */
            get: function () {
                return this._x;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._x = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "y", {
            /**
            * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
            * @member {number} egret.DisplayObject#y
            */
            get: function () {
                return this._y;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._y = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._scaleX = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () {
                return this._scaleY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._scaleY = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "anchorOffsetX", {
            get: function () {
                return this._anchorOffsetX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._anchorOffsetX = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "anchorOffsetY", {
            get: function () {
                return this._anchorOffsetY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._anchorOffsetY = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "anchorX", {
            get: function () {
                return this._anchorX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._anchorX = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "anchorY", {
            get: function () {
                return this._anchorY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._anchorY = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._rotation = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._alpha = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "skewX", {
            get: function () {
                return this._skewX;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._skewX = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "skewY", {
            get: function () {
                return this._skewY;
            },
            set: function (value) {
                if (egret.NumberUtils.isNumber(value)) {
                    this._skewY = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "touchEnabled", {
            /**
            * 指定此对象是否接收鼠标/触摸事件
            * @member {boolean} egret.DisplayObject#touchEnabled
            * @default true
            */
            get: function () {
                return this._touchEnabled;
            },
            set: function (value) {
                this._touchEnabled = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "scrollRect", {
            /**
            * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
            *  @member {egret.Rectangle} egret.DisplayObject#scrollRect
            */
            get: function () {
                return this._scrollRect;
            },
            set: function (value) {
                this._scrollRect = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DisplayObject.prototype, "measuredWidth", {
            /**
            * 测量宽度
            * @returns {number}
            */
            get: function () {
                return this._measureBounds().width;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DisplayObject.prototype, "measuredHeight", {
            /**
            * 测量高度
            * @returns {number}
            */
            get: function () {
                return this._measureBounds().height;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DisplayObject.prototype, "explicitWidth", {
            /**
            * 显式设置宽度
            * @returns {number}
            */
            get: function () {
                return this._explicitWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DisplayObject.prototype, "explicitHeight", {
            /**
            * 显式设置高度
            * @returns {number}
            */
            get: function () {
                return this._explicitHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DisplayObject.prototype, "width", {
            /**
            * 宽度，优先顺序为 显式设置宽度 > 测量宽度
            * @returns {number}
            */
            get: function () {
                return this.getBounds(egret.Rectangle.identity).width;
            },
            /**
            * 显式设置宽度
            * @param value
            */
            set: function (value) {
                this._setWidth(value);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DisplayObject.prototype, "height", {
            /**
            * 高度，优先顺序为 显式设置高度 > 测量高度
            * @returns {number}
            */
            get: function () {
                return this.getBounds(egret.Rectangle.identity).height;
            },
            /**
            * 显式设置高度
            * @param value
            */
            set: function (value) {
                this._setHeight(value);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @inheritDoc
        */
        DisplayObject.prototype._setWidth = function (value) {
            this._explicitWidth = value;
            this._hasWidthSet = egret.NumberUtils.isNumber(value);
        };


        /**
        * @inheritDoc
        */
        DisplayObject.prototype._setHeight = function (value) {
            this._explicitHeight = value;
            this._hasHeightSet = egret.NumberUtils.isNumber(value);
        };

        /**
        * @private
        * @param renderContext
        */
        DisplayObject.prototype._draw = function (renderContext) {
            if (!this.visible) {
                this.destroyCacheBounds();
                return;
            }
            var hasDrawCache = this.drawCacheTexture(renderContext);
            if (hasDrawCache) {
                this.destroyCacheBounds();
                return;
            }
            var o = this;
            renderContext.setAlpha(o.worldAlpha, o.blendMode);
            renderContext.setTransform(o.worldTransform);
            if (o.mask || o._scrollRect) {
                renderContext.save();
                if (o._scrollRect) {
                    renderContext.clip(o._scrollRect.x, o._scrollRect.y, o._scrollRect.width, o._scrollRect.height);
                } else {
                    renderContext.clip(o.mask.x, o.mask.y, o.mask.width, o.mask.height);
                }
            }
            this._render(renderContext);
            if (o.mask || o._scrollRect) {
                renderContext.restore();
            }
            this.destroyCacheBounds();
        };

        DisplayObject.prototype.drawCacheTexture = function (renderContext) {
            var display = this;
            if (display._cacheAsBitmap) {
                var renderTexture = display._texture_to_render;
                var offsetX = renderTexture._offsetX;
                var offsetY = renderTexture._offsetY;
                var width = renderTexture._textureWidth;
                var height = renderTexture._textureHeight;
                display._updateTransform();
                renderContext.setAlpha(display.worldAlpha, display.blendMode);
                renderContext.setTransform(display.worldTransform);
                if (display.mask) {
                    renderContext.save();
                    renderContext.clip(display.mask.x, display.mask.y, display.mask.width, display.mask.height);
                }
                var scale_factor = egret.MainContext.instance.rendererContext.texture_scale_factor;
                var renderFilter = egret.RenderFilter.getInstance();
                renderFilter.drawImage(renderContext, display, 0, 0, width * scale_factor, height * scale_factor, offsetX, offsetY, width, height);
                if (display.mask) {
                    renderContext.restore();
                }
                return true;
            } else {
                return false;
            }
        };

        /**
        * @private
        * @param renderContext
        */
        DisplayObject.prototype._updateTransform = function () {
            var o = this;
            o.worldTransform.identity();
            o.worldTransform = o.worldTransform.appendMatrix(o._parent.worldTransform);
            var anchorX, anchorY;
            if (o._anchorX != 0 || o._anchorY != 0) {
                var bounds = o.getBounds(egret.Rectangle.identity);
                anchorX = bounds.width * o._anchorX;
                anchorY = bounds.height * o._anchorY;
            } else {
                anchorX = o._anchorOffsetX;
                anchorY = o._anchorOffsetY;
            }
            o.worldTransform.appendTransform(o._x, o._y, o._scaleX, o._scaleY, o._rotation, o._skewX, o._skewY, anchorX, anchorY);
            if (o._scrollRect) {
                o.worldTransform.append(1, 0, 0, 1, -o._scrollRect.x, -o._scrollRect.y);
            }
            var bounds = DisplayObject.getTransformBounds(o.getBounds(egret.Rectangle.identity), o.worldTransform);
            o.worldBounds.initialize(bounds.x, bounds.y, bounds.width, bounds.height);
            o.worldAlpha = o._parent.worldAlpha * o._alpha;
        };

        /**
        * @private
        * @param renderContext
        */
        DisplayObject.prototype._render = function (renderContext) {
        };

        /**
        * 获取显示对象的测量边界
        * @method egret.DisplayObject#getBounds
        * @param resultRect {Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
        * @returns {Rectangle}
        */
        DisplayObject.prototype.getBounds = function (resultRect) {
            if (this._cacheBounds.x == 0 && this._cacheBounds.y == 0 && this._cacheBounds.width == 0 && this._cacheBounds.height == 0) {
                var rect = this._measureBounds();
                var w = this._hasWidthSet ? this._explicitWidth : rect.width;
                var h = this._hasHeightSet ? this._explicitHeight : rect.height;
                var x = rect.x;
                var y = rect.y;
                var anchorX, anchorY;
                if (this._anchorX != 0 || this._anchorY != 0) {
                    anchorX = w * this._anchorX;
                    anchorY = h * this._anchorY;
                } else {
                    anchorX = this._anchorOffsetX;
                    anchorY = this._anchorOffsetY;
                }
                this._cacheBounds.initialize(x - anchorX, y - anchorY, w, h);
            }
            var result = this._cacheBounds;
            if (!resultRect) {
                resultRect = new egret.Rectangle();
            }
            return resultRect.initialize(result.x, result.y, result.width, result.height);
        };

        DisplayObject.prototype.destroyCacheBounds = function () {
            this._cacheBounds.x = 0;
            this._cacheBounds.y = 0;
            this._cacheBounds.width = 0;
            this._cacheBounds.height = 0;
        };

        DisplayObject.prototype._getConcatenatedMatrix = function () {
            var matrix = DisplayObject.identityMatrixForGetConcatenated.identity();
            var o = this;
            while (o != null) {
                if (o.anchorX != 0 || o.anchorY != 0) {
                    var bounds = o.getBounds(egret.Rectangle.identity);
                    matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, bounds.width * o.anchorX, bounds.height * o.anchorY);
                } else {
                    matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.anchorOffsetX, o.anchorOffsetY);
                }
                o = o.parent;
            }
            return matrix;
        };

        /**
        * 将 point 对象从显示对象的（本地）坐标转换为舞台（全局）坐标。
        * @method egret.DisplayObject#localToGlobal
        * @param x {number} 本地x坐标
        * @param y {number} 本地y坐标
        * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
        * @returns {egret.Point}
        */
        DisplayObject.prototype.localToGlobal = function (x, y, resultPoint) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            var mtx = this._getConcatenatedMatrix();
            mtx.append(1, 0, 0, 1, x, y);
            if (!resultPoint) {
                resultPoint = new egret.Point();
            }
            resultPoint.x = mtx.tx;
            resultPoint.y = mtx.ty;
            return resultPoint;
        };

        /**
        * 将指定舞台坐标（全局）转换为显示对象（本地）坐标。
        * @method egret.DisplayObject#globalToLocal
        * @param x {number} 全局x坐标
        * @param y {number} 全局y坐标
        * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
        * @returns {egret.Point}
        */
        DisplayObject.prototype.globalToLocal = function (x, y, resultPoint) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            var mtx = this._getConcatenatedMatrix();
            mtx.invert();
            mtx.append(1, 0, 0, 1, x, y);
            if (!resultPoint) {
                resultPoint = new egret.Point();
            }
            resultPoint.x = mtx.tx;
            resultPoint.y = mtx.ty;
            return resultPoint;
        };

        /**
        * 检测指定坐标是否在显示对象内
        * @method egret.DisplayObject#hitTest
        * @param x {number}
        * @param y {number}
        * @param ignoreTouchEnabled 是否忽略TouchEnabled
        * @returns {*}
        */
        DisplayObject.prototype.hitTest = function (x, y, ignoreTouchEnabled) {
            if (typeof ignoreTouchEnabled === "undefined") { ignoreTouchEnabled = false; }
            if (!this.visible || (!ignoreTouchEnabled && !this._touchEnabled)) {
                return null;
            }
            var bound = this.getBounds(egret.Rectangle.identity);
            if (0 < x && x < bound.width && 0 < y && y < bound.height) {
                if (this.mask || this._scrollRect) {
                    if (this._scrollRect && x < this._scrollRect.width && y < this._scrollRect.height) {
                        return this;
                    } else if (this.mask && this.mask.x < x && x < this.mask.x + this.mask.width && this.mask.y < y && y < this.mask.y + this.mask.height) {
                        return this;
                    }
                    return null;
                }
                return this;
            } else {
                return null;
            }
        };

        DisplayObject.prototype._getMatrix = function () {
            return egret.Matrix.identity.identity().appendTransformFromDisplay(this);
        };

        /**
        * 测量显示对象坐标，这个方法需要子类重写
        * @returns {egret.Rectangle}
        * @private
        */
        DisplayObject.prototype._measureBounds = function () {
            return egret.Rectangle.identity.initialize(0, 0, 0, 0);
        };

        DisplayObject.prototype._getOffsetPoint = function () {
            var o = this;
            var regX = o.anchorOffsetX;
            var regY = o.anchorOffsetY;
            if (o.anchorX != 0 || o.anchorY != 0) {
                var bounds = o.getBounds(egret.Rectangle.identity);
                regX = o.anchorX * bounds.width;
                regY = o.anchorY * bounds.height;
            }
            var result = egret.Point.identity;
            result.x = regX;
            result.y = regY;
            return result;
        };

        DisplayObject.prototype._onAddToStage = function () {
            this._stage = egret.MainContext.instance.stage;
            this.dispatchEventWith(egret.Event.ADDED_TO_STAGE);
        };

        DisplayObject.prototype._onRemoveFromStage = function () {
            this._stage = null;
            this.dispatchEventWith(egret.Event.REMOVED_FROM_STAGE);
        };

        Object.defineProperty(DisplayObject.prototype, "stage", {
            /**
            * 获取舞台对象。当该显示对象不在舞台上时，此属性返回 undefined
            * @returns {egret.Stage}
            */
            get: function () {
                return this._stage;
            },
            enumerable: true,
            configurable: true
        });

        DisplayObject.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            if (typeof priority === "undefined") { priority = 0; }
            _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if (isEnterFrame || type == egret.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject._enterFrameCallBackList : DisplayObject._renderCallBackList;
                this._insertEventBin(list, listener, thisObject, priority);
            }
        };

        DisplayObject.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if (isEnterFrame || type == egret.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject._enterFrameCallBackList : DisplayObject._renderCallBackList;
                this._removeEventBin(list, listener, thisObject);
            }
        };

        DisplayObject.prototype.dispatchEvent = function (event) {
            if (!event._bubbles) {
                return _super.prototype.dispatchEvent.call(this, event);
            }

            var list = [];
            var target = this;
            while (target) {
                list.unshift(target);
                target = target.parent;
            }

            var length = list.length;
            var targetIndex = length - 1;
            for (var i = length - 2; i >= 0; i--) {
                list.push(list[i]);
            }
            event._reset();
            this._dispatchPropagationEvent(event, list, targetIndex);
            return !event.isDefaultPrevented();
        };

        DisplayObject.prototype._dispatchPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event._setCurrentTarget(currentTarget);
                event._target = this;
                if (i < targetIndex)
                    event._eventPhase = 1;
                else if (i == targetIndex)
                    event._eventPhase = 2;
                else
                    event._eventPhase = 3;
                currentTarget._notifyListener(event);
                if (event._isPropagationStopped || event._isPropagationImmediateStopped) {
                    break;
                }
            }
        };

        DisplayObject.prototype.willTrigger = function (type) {
            var parent = this;
            while (parent) {
                if (parent.hasEventListener(type))
                    return true;
                parent = parent._parent;
            }
            return false;
        };

        DisplayObject.prototype.cacheAsBitmap = function (bool) {
            this._cacheAsBitmap = bool;
            if (bool) {
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(this);
                this._texture_to_render = renderTexture;
            }
        };

        DisplayObject.getTransformBounds = function (bounds, mtx) {
            var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;

            //            if (x || y) {
            //                mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y);
            //            }
            //        if (matrix) { mtx.prependMatrix(matrix); }
            var x_a = width * mtx.a, x_b = width * mtx.b;
            var y_c = height * mtx.c, y_d = height * mtx.d;
            var tx = mtx.tx, ty = mtx.ty;

            var minX = tx, maxX = tx, minY = ty, maxY = ty;

            if ((x = x_a + tx) < minX) {
                minX = x;
            } else if (x > maxX) {
                maxX = x;
            }
            if ((x = x_a + y_c + tx) < minX) {
                minX = x;
            } else if (x > maxX) {
                maxX = x;
            }
            if ((x = y_c + tx) < minX) {
                minX = x;
            } else if (x > maxX) {
                maxX = x;
            }

            if ((y = x_b + ty) < minY) {
                minY = y;
            } else if (y > maxY) {
                maxY = y;
            }
            if ((y = x_b + y_d + ty) < minY) {
                minY = y;
            } else if (y > maxY) {
                maxY = y;
            }
            if ((y = y_d + ty) < minY) {
                minY = y;
            } else if (y > maxY) {
                maxY = y;
            }

            return bounds.initialize(minX, minY, maxX - minX, maxY - minY);
        };
        DisplayObject.identityMatrixForGetConcatenated = new egret.Matrix();

        DisplayObject._enterFrameCallBackList = [];
        DisplayObject._renderCallBackList = [];
        return DisplayObject;
    })(egret.EventDispatcher);
    egret.DisplayObject = DisplayObject;
})(egret || (egret = {}));
