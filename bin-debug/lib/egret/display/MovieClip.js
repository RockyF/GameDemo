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
/// <reference path="../context/Ticker.ts"/>
/// <reference path="Bitmap.ts"/>
/// <reference path="DisplayObjectContainer.ts"/>
/// <reference path="SpriteSheet.ts"/>
/// <reference path="Texture.ts"/>
/// <reference path="../utils/Logger.ts"/>
var egret;
(function (egret) {
    /**
    * MovieClip是位图动画序列类，由FlashPro + egret插件生成配置文件
    */
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(data, texture) {
            _super.call(this);
            this.data = data;
            this._resPool = {};
            this._currentFrameIndex = 0;
            this._totalFrame = 0;
            this._interval = 0;
            this._currentInterval = 0;
            this._isPlaying = false;
            this._passTime = 0;
            this._oneFrameTime = 1000 / 60;
            this._frameData = data;
            this._spriteSheet = new egret.SpriteSheet(texture._bitmapData);
            this._oneFrameTime = 1000 / egret.MainContext.instance.deviceContext.frameRate;
        }
        /**
        * 播放指定动画
        * @param frameName
        */
        MovieClip.prototype.gotoAndPlay = function (frameName) {
            this.checkHasFrame(frameName);
            this._isPlaying = true;
            this._currentFrameIndex = 0;
            this._currentInterval = 0;
            this._currentFrameName = frameName;
            this._totalFrame = this._frameData.frames[frameName].totalFrame;
            this.playNextFrame();
            this._passTime = 0;
            egret.Ticker.getInstance().register(this.update, this);
        };

        /**
        * 播放并暂停指定动画
        * @param frameName
        */
        MovieClip.prototype.gotoAndStop = function (frameName) {
            this.checkHasFrame(frameName);
            this.stop();
            this._currentFrameIndex = 0;
            this._currentInterval = 0;
            this._currentFrameName = frameName;
            this._totalFrame = this._frameData.frames[frameName].totalFrame;
            this.playNextFrame();
        };

        MovieClip.prototype.checkHasFrame = function (name) {
            if (this._frameData.frames[name] == undefined) {
                egret.Logger.fatal("MovieClip没有对应的frame：", name);
            }
        };

        /**
        * 暂停动画
        */
        MovieClip.prototype.stop = function () {
            this._isPlaying = false;
            egret.Ticker.getInstance().unregister(this.update, this);
        };

        MovieClip.prototype.update = function (frameTime) {
            //设置间隔之后，间隔不到则不处理
            if (this._interval != this._currentInterval) {
                this._currentInterval++;
                return;
            }
            var last = this._passTime % this._oneFrameTime;
            var num = Math.floor((last + frameTime) / this._oneFrameTime);
            while (num >= 1) {
                if (num == 1) {
                    this.playNextFrame();
                } else {
                    this.playNextFrame(false);
                }
                num--;
            }
            this._passTime += frameTime;
        };

        MovieClip.prototype.playNextFrame = function (needShow) {
            if (typeof needShow === "undefined") { needShow = true; }
            this._currentInterval = 0;
            var frameData = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (needShow) {
                var bitmap = this.getBitmap(frameData.res);
                bitmap.x = frameData.x;
                bitmap.y = frameData.y;
                this.removeChildren();
                this.addChild(bitmap);
            }

            if (frameData.action != null) {
                this.dispatchEventWith(frameData.action);
            }

            this._currentFrameIndex++;
            if (this._currentFrameIndex == this._totalFrame) {
                this._currentFrameIndex = 0;
            }
        };

        MovieClip.prototype.getBitmap = function (name) {
            var result;
            if (this._resPool[name] != null) {
                result = this._resPool[name];
            } else {
                var resData = this._frameData.res[name];
                result = new egret.Bitmap();
                var texture = this._spriteSheet.getTexture(name);
                if (!texture) {
                    texture = this._spriteSheet.createTexture(name, resData.x, resData.y, resData.w, resData.h);
                }
                result.texture = texture;
                this._resPool[name] = result;
            }
            return result;
        };

        MovieClip.prototype.release = function () {
            for (var key in this._resPool) {
                delete this._resPool[key];
            }
        };

        MovieClip.prototype.getCurrentFrameIndex = function () {
            return this._currentFrameIndex;
        };

        MovieClip.prototype.getTotalFrame = function () {
            return this._totalFrame;
        };

        /**
        * 设置间隔
        * @param value
        */
        MovieClip.prototype.setInterval = function (value) {
            this._interval = value;
        };

        /**
        * 判断当前动画是否正在播放
        * @stable D 这个API需要改为 isPlaying()
        * @returns {Boolean}
        */
        MovieClip.prototype.getIsPlaying = function () {
            return this._isPlaying;
        };
        return MovieClip;
    })(egret.DisplayObjectContainer);
    egret.MovieClip = MovieClip;
})(egret || (egret = {}));
