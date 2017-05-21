import * as fabric from "fabric"
import {Tool} from "./tool";

export class Rect extends Tool{

    private _fillColor: fabric.Color;

    constructor(lineWidth: number, lineColor: fabric.Color | string, fillColor: fabric.Color | string){
        super(lineWidth, lineColor);
        if(fillColor instanceof fabric.Color){
            this._fillColor = fillColor;
        }else{
            this._fillColor = fabric.Color.fromRgba(fillColor);
        }
    }

     onmousedown(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        console.log(e);
    }

     onmousemove(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        console.log(e);
    }

     onmousedrag(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        console.log(e);
    }

     onmouseup(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        console.log(e);
    }
}