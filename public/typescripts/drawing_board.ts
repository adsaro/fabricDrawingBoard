import {Tool} from "./tools/tool"
import * as fabric from "fabric"

export class DrawingBoard{
    private _canvas: fabric.Canvas;
    private _tool: Tool;
    private _toolName: string;
    private _availableTools: any;
    private _lineWidth: number;
    private _lineColor: fabric.Color;
    private _fillColor: fabric.Color;
    private _elements: Array<fabric.Object[] | fabric.Object>;
    private _clicked: boolean = false;
    private _target: EventTarget;

    /**
     * Creates a new DrawingBoard element from an HTMLCanvasElement
     * 
     * @param c {HTMLCanvasElement} the canvas to be used by fabric
     */
    constructor(c: string, tools?: any){
        if(tools){
            this._availableTools = tools;
        }
        //we assign the new fabric.Canvas to our local _canvas variable
        this._canvas = new fabric.Canvas(c);
        //we set the isDrawingMode property of the fabric.Canvas element to true so it will be able
        //to be used as a free drawing canvas from its creation.
        //this._canvas.isDrawingMode = true;
        this.bindEvents();
    }

    //With this method we bind the fabric.Canvas events to our tool handlers
    private bindEvents(){
        //we bind the onmousedown event handler of our tool with the mouse:down event of the fabric.Canvas
        this._canvas.on("mouse:down", (e) => {
            this._clicked = true;
            this._target = (<MouseEvent>e.e).target;
            let result = this._tool.onmousedown(e.e as MouseEvent, this._canvas);
            if(result){
                this._elements.push(result);
            }
        });

        //we bind the onmousemove and onmousedrag event handlers of our tool with the mose:move event of the 
        //fabric.Canvas. If the mouse is clicked it is onmousedrag, else it is onmousemove.
        this._canvas.on("mouse:move", (e) => {
            if(this._clicked){
                if(this._target == (<MouseEvent> e.e).target){
                    let result = this._tool.onmousedrag(e.e as MouseEvent, this._canvas);
                    if(result){
                        this._elements.push(result);
                    }
                }
            }else{
                let result = this._tool.onmousemove(e.e as MouseEvent, this._canvas);
                if(result){
                    this._elements.push(result);
                }
            }
        });

        //we bind the onmouseup event handler of our tool with the mouse:up event of the fabric.Canvas
        this._canvas.on("mouse:up", (e) => {
            this._clicked = false;
            let result = this._tool.onmouseup(e.e as MouseEvent, this._canvas);
            if(result){
                this._elements.push(result);
            }
        });
    }

    get lineWidth(){
        return this._lineWidth;
    }

    set lineWidth(w: number){
        if(w > 0){
            this._lineWidth = w;
        }
    }

    get lineColor(){
        return this._lineColor.toRgba();
    }

    set lineColor(c: string){
        this._lineColor = fabric.Color.fromRgba(c);
    }

    get fillColor(){
        return this._fillColor.toRgba();
    }
    set fillColor(c: string){
        this._fillColor = fabric.Color.fromRgba(c);
    }

    get tool(){
        return this._toolName;
    }

    set tool(t: string){
        if(t in this._availableTools){
            this._tool = this._availableTools[t];
            this._toolName = t;
        }else{
            throw new Error("Specified tool is not available");
        }
    }

    addTool(name: string, tool: Tool){
        this._availableTools[name] = tool;
    }
}