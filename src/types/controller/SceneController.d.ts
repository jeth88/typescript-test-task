import * as PIXI from 'pixi.js';
import { Scene } from '../view/Scene';
import './../index.css';
export declare class SceneController {
    private _app;
    private _currentScene;
    constructor(window: Window, body: any);
    get app(): PIXI.Application;
    gotoScene(newScene: Scene): Promise<void>;
    private update;
}
