import * as fabric from "fabric";
import {DrawingBoard} from "./drawing_board";
import {Pencil} from "./tools/pencil";

let board = new DrawingBoard("board");

board.tool = new Pencil(5, "rgba(0, 0, 0, 1)");