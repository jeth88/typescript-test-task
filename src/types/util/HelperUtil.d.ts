import * as PIXI from 'pixi.js';
import { ITextData } from './../interface/ITextData';
export declare class HelperUtil {
    static createStaticText(textData: ITextData): PIXI.Text;
    static createInteractiveText(textData: ITextData, callBackFnc?: Function): PIXI.Text;
}
