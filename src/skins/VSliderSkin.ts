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

/// <reference path="../egret.d.ts"/>
/// <reference path="SliderThumbSkin.ts"/>

class VSliderSkin extends egret.Skin {
    public constructor() {
        super();
        this.minWidth = 11;
        this.minHeight = 50;
    }

    public static _skinParts:Array<any> = ["thumb", "track","trackHighlight"];
    public get skinParts():Array<any> {
        return VSliderSkin._skinParts;
    }

    public trackHighlight:egret.UIAsset;

    public thumb:egret.Button;

    public track:egret.Button;

    public createChildren():void {
        super.createChildren();

        this.track = new egret.Button();
        var asset:egret.UIAsset = new egret.UIAsset();
        asset.source = "background";
        this.track.skinName = asset;
        this.track.percentHeight = 100;
        this.track.width = 11;
        this.track.horizontalCenter = 0;
        this.addElement(this.track);

        this.trackHighlight = new egret.UIAsset();
        this.trackHighlight.source = "background-down";
        this.trackHighlight.width = 11;
        this.trackHighlight.horizontalCenter = 0;
        this.addElement(this.trackHighlight);

        this.thumb = new egret.Button();
        this.thumb.skinName = SliderThumbSkin;
        this.thumb.horizontalCenter = 0;
        this.addElement(this.thumb);
    }
}