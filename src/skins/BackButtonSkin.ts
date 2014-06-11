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

class BackButtonSkin extends egret.Skin{

    public constructor(){
        super();
        this.height = 85;
        this.states = ["up","down","disabled"];
    }

    private static _skinParts:Array<string> = ["labelDisplay"];

    public get skinParts():Array<string>{
        return BackButtonSkin._skinParts;
    }
    /**
     * [SkinPart]
     */
    public labelDisplay:egret.Label;

    private upSkin:egret.UIAsset;
    private downSkin:egret.UIAsset;
    private disabledSkin:egret.UIAsset;


    public createChildren():void{
        super.createChildren();
        this.upSkin = new egret.UIAsset();
        this.upSkin.percentHeight = this.upSkin.percentWidth = 100;
        this.upSkin.source = "button-back-up";
        this.addElement(this.upSkin);

        this.downSkin = new egret.UIAsset();
        this.downSkin.percentHeight = this.downSkin.percentWidth = 100;
        this.downSkin.source = "button-back-down";
        this.addElement(this.downSkin);

        this.disabledSkin = new egret.UIAsset();
        this.disabledSkin.percentHeight = this.disabledSkin.percentWidth = 100;
        this.disabledSkin.source = "button-back-disabled";
        this.addElement(this.disabledSkin);

        this.labelDisplay = new egret.Label();
        this.labelDisplay.maxDisplayedLines = 1;
        this.labelDisplay.size = 20;
        this.labelDisplay.fontFamily = "Tahoma";
        this.labelDisplay.textColor = 0x1a1815;
        this.labelDisplay.left = 18;
        this.labelDisplay.right = 4;
        this.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
        this.labelDisplay.verticalCenter = 0;
        this.addElement(this.labelDisplay);
    }

    public commitCurrentState():void{
        super.commitCurrentState();
        switch (this.currentState){
            case "up":
                this.upSkin.visible = true;
                this.disabledSkin.visible = false;
                this.downSkin.visible = false;
                break;
            case "down":
                this.downSkin.visible = true;
                this.disabledSkin.visible = false;
                this.upSkin.visible = false;
                break;
            case "disabled":
                this.disabledSkin.visible = true;
                this.downSkin.visible = false;
                this.upSkin.visible = false;
                break;
        }
    }
}