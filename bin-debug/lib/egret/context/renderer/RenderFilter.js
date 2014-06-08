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
/// <reference path="../MainContext.ts"/>
/// <reference path="RendererContext.ts"/>
/// <reference path="../../display/Texture.ts"/>
/// <reference path="../../geom/Matrix.ts"/>
/// <reference path="../../geom/Rectangle.ts"/>
/// <reference path="../../utils/HashObject.ts"/>
/// <reference path="../../utils/Logger.ts"/>
var egret;
(function (egret) {
    /**
    * @class egret.RenderFilter
    * @classdesc
    * @extends egret.HashObject
    */
    var RenderFilter = (function (_super) {
        __extends(RenderFilter, _super);
        function RenderFilter() {
            _super.call(this);
            this._originalData = {};
            this._drawAreaList = [];
        }
        /**
        * @method egret.egret.getInstance
        * @returns {RenderFilter}
        */
        RenderFilter.getInstance = function () {
            if (RenderFilter.instance == null) {
                RenderFilter.instance = new RenderFilter();
            }
            return RenderFilter.instance;
        };

        /**
        * @method egret.egret#addDrawArea
        * @param area {egret.Rectangle}
        */
        RenderFilter.prototype.addDrawArea = function (area) {
            this._drawAreaList.push(area);
        };

        /**
        * @method egret.egret#clearDrawArea
        */
        RenderFilter.prototype.clearDrawArea = function () {
            this._drawAreaList = [];
        };

        /**
        * 绘制平铺位图
        */
        RenderFilter.prototype.drawRepeatImage = function (renderContext, data, destWidth, destHeight) {
            var texture = data._texture_to_render;
            if (!texture) {
                return;
            }
            var sourceX = texture._startX;
            var sourceY = texture._startY;
            var sourceWidth = texture._textureWidth;
            var sourceHeight = texture._textureHeight;
            var destX = texture._offsetX;
            var destY = texture._offsetY;

            for (var x = destX; x < destWidth; x += sourceWidth) {
                for (var y = destY; y < destHeight; y += sourceHeight) {
                    var destW = Math.min(sourceWidth, destWidth - x);
                    var destH = Math.min(sourceHeight, destHeight - y);
                    this.drawImage(renderContext, data, sourceX, sourceY, sourceWidth, sourceHeight, x, y, destW, destH);
                }
            }
        };

        /**
        * 绘制九宫格位图
        */
        RenderFilter.prototype.drawScale9GridImage = function (renderContext, data, scale9Grid, destWidth, destHeight) {
            var texture = data._texture_to_render;
            if (!texture || !scale9Grid) {
                return;
            }
            var sourceX = texture._startX;
            var sourceY = texture._startY;
            var sourceWidth = texture._textureWidth;
            var sourceHeight = texture._textureHeight;
            var destX = texture._offsetX;
            var destY = texture._offsetY;
            var roundedDrawX = Math.round(destX * destWidth / sourceWidth);
            var roundedDrawY = Math.round(destY * destHeight / sourceHeight);
            var s9g = egret.Rectangle.identity.initialize(scale9Grid.x - Math.round(destX), scale9Grid.y - Math.round(destX), scale9Grid.width, scale9Grid.height);
            if (sourceWidth - s9g.width > destWidth || sourceHeight - s9g.height > destHeight) {
                this.drawImage(renderContext, data, sourceX, sourceY, sourceWidth, sourceHeight, roundedDrawX, roundedDrawY, destWidth, destHeight);
                return;
            }

            //防止空心的情况出现。
            if (s9g.y == s9g.bottom) {
                if (s9g.bottom < sourceHeight)
                    s9g.bottom++;
                else
                    s9g.y--;
            }
            if (s9g.x == s9g.right) {
                if (s9g.right < sourceWidth)
                    s9g.right++;
                else
                    s9g.x--;
            }

            var sourceX2 = sourceX + s9g.x;
            var sourceX3 = sourceX + s9g.right;
            var sourceRightW = sourceWidth - s9g.right;
            var sourceY2 = sourceY + s9g.y;
            var sourceY3 = sourceY + s9g.bottom;
            var sourceBottomH = sourceHeight - s9g.bottom;

            var destX1 = roundedDrawX + s9g.x;
            var destScaleGridBottom = destHeight - (sourceHeight - s9g.bottom);
            var destScaleGridRight = destWidth - (sourceWidth - s9g.right);

            this.drawImage(renderContext, data, sourceX, sourceY, s9g.x, s9g.y, roundedDrawX, 0, s9g.x, s9g.y);
            this.drawImage(renderContext, data, sourceX2, sourceY, s9g.width, s9g.y, destX1, 0, destScaleGridRight - s9g.x, s9g.y);
            this.drawImage(renderContext, data, sourceX3, sourceY, sourceRightW, s9g.y, roundedDrawX + destScaleGridRight, 0, destWidth - destScaleGridRight, s9g.y);
            this.drawImage(renderContext, data, sourceX, sourceY2, s9g.x, s9g.height, roundedDrawX, s9g.y, s9g.x, destScaleGridBottom - s9g.y);
            this.drawImage(renderContext, data, sourceX2, sourceY2, s9g.width, s9g.height, destX1, s9g.y, destScaleGridRight - s9g.x, destScaleGridBottom - s9g.y);
            this.drawImage(renderContext, data, sourceX3, sourceY2, sourceRightW, s9g.height, roundedDrawX + destScaleGridRight, s9g.y, destWidth - destScaleGridRight, destScaleGridBottom - s9g.y);
            this.drawImage(renderContext, data, sourceX, sourceY3, s9g.x, sourceBottomH, roundedDrawX, destScaleGridBottom, s9g.x, destHeight - destScaleGridBottom);
            this.drawImage(renderContext, data, sourceX2, sourceY3, s9g.width, sourceBottomH, destX1, destScaleGridBottom, destScaleGridRight - s9g.x, destHeight - destScaleGridBottom);
            this.drawImage(renderContext, data, sourceX3, sourceY3, sourceRightW, sourceBottomH, roundedDrawX + destScaleGridRight, destScaleGridBottom, destWidth - destScaleGridRight, destHeight - destScaleGridBottom);
        };

        /**
        * 先检查有没有不需要绘制的区域，再把需要绘制的区域绘制出来
        * @method egret.egret#drawImage
        * @param renderContext {any}
        * @param data {RenderData}
        * @param sourceX {any}
        * @param sourceY {any}
        * @param sourceWidth {any}
        * @param sourceHeight {any}
        * @param destX {any}
        * @param destY {any}
        * @param destWidth {any}
        * @param destHeight {any}
        */
        RenderFilter.prototype.drawImage = function (renderContext, data, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight) {
            destX = destX || 0;
            destY = destY || 0;
            var locTexture = data._texture_to_render;
            if (locTexture == null || sourceHeight == 0 || sourceWidth == 0 || destWidth == 0 || destHeight == 0) {
                return;
            }
            this._originalData.sourceX = sourceX;
            this._originalData.sourceY = sourceY;
            this._originalData.sourceWidth = sourceWidth;
            this._originalData.sourceHeight = sourceHeight;
            this._originalData.destX = destX;
            this._originalData.destY = destY;
            this._originalData.destWidth = destWidth;
            this._originalData.destHeight = destHeight;

            var locDrawAreaList = this.getDrawAreaList();
            for (var j = 0; j < locDrawAreaList.length; j++) {
                var drawArea = locDrawAreaList[j];
                if (this.ignoreRender(data, drawArea, this._originalData.destX, this._originalData.destY)) {
                    continue;
                }

                //在设置过重绘区域时算出不需要绘制的区域
                if (this._drawAreaList.length != 0) {
                    //不能允许有旋转和斜切的显示对象跨过重绘区域
                    if (data.worldTransform.b != 0 || data.worldTransform.c != 0) {
                        //之前已经判断过是否出了重绘区域了
                        if (data.worldBounds.x + this._originalData.destX < drawArea.x || data.worldBounds.y + this._originalData.destY < drawArea.y || data.worldBounds.x + data.worldBounds.width + this._originalData.destX > drawArea.x + drawArea.width || data.worldBounds.y + data.worldBounds.height + this._originalData.destY > drawArea.y + drawArea.height) {
                            egret.Logger.fatal("请不要让带有旋转和斜切的显示对象跨过重绘区域");
                            return;
                        }
                    } else {
                        //因为有旋转和斜切时候不允许跨过重绘区域，所以缩放属性可以直接这么取
                        var scaleX = data.worldTransform.a;
                        var scaleY = data.worldTransform.d;
                        var offset;
                        if (data.worldBounds.x + this._originalData.destX < drawArea.x) {
                            offset = (drawArea.x - data.worldBounds.x) / scaleX - this._originalData.destX;
                            sourceX += offset / (destWidth / sourceWidth);
                            sourceWidth -= offset / (destWidth / sourceWidth);
                            destWidth -= offset;
                            destX += offset;
                        }
                        if (data.worldBounds.y + this._originalData.destY < drawArea.y) {
                            offset = (drawArea.y - data.worldBounds.y) / scaleY - this._originalData.destY;
                            sourceY += offset / (destHeight / sourceHeight);
                            sourceHeight -= offset / (destHeight / sourceHeight);
                            destHeight -= offset;
                            destY += offset;
                        }
                        if (data.worldBounds.x + data.worldBounds.width + this._originalData.destX > drawArea.x + drawArea.width) {
                            offset = (data.worldBounds.x + data.worldBounds.width - drawArea.x - drawArea.width) / scaleX + this._originalData.destX;
                            sourceWidth -= offset / (destWidth / sourceWidth);
                            destWidth -= offset;
                        }
                        if (data.worldBounds.y + data.worldBounds.height + this._originalData.destY > drawArea.y + drawArea.height) {
                            offset = (data.worldBounds.y + data.worldBounds.height - drawArea.y - drawArea.height) / scaleY + this._originalData.destY;
                            sourceHeight -= offset / (destHeight / sourceHeight);
                            destHeight -= offset;
                        }
                    }
                }

                renderContext.drawImage(locTexture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

                //测试代码，把画出来的区域用红框标出来
                //                renderContext.strokeRect(destX, destY, destWidth, destHeight, "#ff0000");
                sourceX = this._originalData.sourceX;
                sourceY = this._originalData.sourceY;
                sourceWidth = this._originalData.sourceWidth;
                sourceHeight = this._originalData.sourceHeight;
                destX = this._originalData.destX;
                destY = this._originalData.destY;
                destWidth = this._originalData.destWidth;
                destHeight = this._originalData.destHeight;
            }
        };

        RenderFilter.prototype.ignoreRender = function (data, rect, destX, destY) {
            var bounds = data.worldBounds;
            var destX = destX * data.worldTransform.a;
            var destY = destY * data.worldTransform.d;
            if (bounds.x + bounds.width + destX <= rect.x || bounds.x + destX >= rect.x + rect.width || bounds.y + bounds.height + destY <= rect.y || bounds.y + destY >= rect.y + rect.height) {
                return true;
            }
            return false;
        };

        /**
        * @method egret.egret#getDrawAreaList
        * @returns {Rectangle}
        */
        RenderFilter.prototype.getDrawAreaList = function () {
            var locDrawAreaList;

            //默认整个舞台都是重绘区域
            if (this._drawAreaList.length == 0) {
                if (!this._defaultDrawAreaList) {
                    this._defaultDrawAreaList = [new egret.Rectangle(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight)];
                }
                locDrawAreaList = this._defaultDrawAreaList;
            } else {
                locDrawAreaList = this._drawAreaList;
            }
            return locDrawAreaList;
        };
        return RenderFilter;
    })(egret.HashObject);
    egret.RenderFilter = RenderFilter;

    
})(egret || (egret = {}));
