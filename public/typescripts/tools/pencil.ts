import * as fabric from "fabric"
import {Tool} from "./tool";

export class Pencil extends Tool{

    private _path: fabric.IPath;

     onmousedown(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        this._path = new fabric.IPath();
        console.log(e.offsetX, e.offsetY);
    }

     onmousemove(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        //console.log(e);
    }

     onmousedrag(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        console.log(e.offsetX, e.offsetY);
    }

     onmouseup(e: MouseEvent, c: fabric.Canvas): fabric.Object[] | fabric.Object | void {
        //console.log(e);
    }
}