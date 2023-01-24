import * as PIXI from 'pixi.js';
import { SceneController } from './../controller/SceneController';
import { Scene } from './Scene';
export declare class Task2Scene extends Scene {
    private readonly _loadObjectsIntervalinMS;
    private readonly _fontSizes;
    private readonly _activityNames;
    private readonly _textureImages;
    private _objects;
    private _intervalId;
    constructor(coordinator: SceneController);
    onStart(container: PIXI.Container): Promise<void>;
    onFinish(): void;
    private clearObjects;
    private generateRandomObjects;
    private generateRandomObject;
    private getRandomText;
    private getRandomImage;
    private getRandomIdxByParam;
    private reset;
}
