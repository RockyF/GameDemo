/// <reference path="../egret.d.ts"/>

class ButtonSkin2 extends egret.Skin{

    public constructor(){
        super();
        this.minWidth = 140;
        this.height = 60;
        this.states = ["up","down","disabled"];
    }

    private static _skinParts:Array<string> = ["labelDisplay"];

    public get skinParts():Array<string>{
        return ButtonSkin2._skinParts;
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
        this.upSkin.source = "button-up2";
        this.addElement(this.upSkin);

        this.downSkin = new egret.UIAsset();
        this.downSkin.percentHeight = this.downSkin.percentWidth = 100;
        this.downSkin.source = "button-down2";
        this.addElement(this.downSkin);

        this.disabledSkin = new egret.UIAsset();
        this.disabledSkin.percentHeight = this.disabledSkin.percentWidth = 100;
        this.disabledSkin.source = "button-disabled2";
        this.addElement(this.disabledSkin);

        this.labelDisplay = new egret.Label();
        this.labelDisplay.maxDisplayedLines = 1;
        this.labelDisplay.size = 20;
        this.labelDisplay.fontFamily = "Tahoma";
        this.labelDisplay.textColor = 0x1a1815;
        this.labelDisplay.left = 10;
        this.labelDisplay.right = 10;
        this.labelDisplay.top = 10;
        this.labelDisplay.bottom = 10;
        this.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
        this.labelDisplay.verticalAlign = egret.VerticalAlign.MIDDLE;
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