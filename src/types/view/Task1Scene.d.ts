import * as PIXI from 'pixi.js';
import { SceneController } from './../controller/SceneController';
import { Scene } from './Scene';
export declare class Task1Scene extends Scene {
    private _container1;
    private _container2;
    private _sprites;
    private _fpsText;
    private _ticker;
    private _descCtr;
    private _ascCtr;
    constructor(coordinator: SceneController);
    onStart(container: PIXI.Container): Promise<void>;
    onFinish(): void;
    private runFPSTicker;
    private generateDeckOfCards;
    private getNewContainer;
    private transferOneCard;
    private reset;
}
