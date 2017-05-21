import * as fabric from "fabric";

export abstract class Tool{

    protected _lineWidth: number;
    protected _lineColor: fabric.Color;

    /**@constructor */
    constructor(lineWidth: number, lineColor: string | fabric.Color){
        this._lineWidth = lineWidth;
        if(lineColor instanceof fabric.Color){
            this._lineColor = lineColor as fabric.Color;
        }else{
            this._lineColor = fabric.Color.fromRgba(<string>lineColor);
        }
    }

    abstract onmousedown(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void;

    abstract onmousemove(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void;

    abstract onmousedrag(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void;

    abstract onmouseup(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void;

    get lineColor(){
        return this._lineColor;
    }

    set lineColor(color: fabric.Color | string){
        if(color instanceof fabric.Color){
            this._lineColor = color as fabric.Color;
        }else{
            this._lineColor = fabric.Color.fromRgba(<string>color);
        }
    }
}