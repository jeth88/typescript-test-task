import * as PIXI from 'pixi.js';
import { SceneController } from '../controller/SceneController';
export declare class Scene {
    protected _app: PIXI.Application;
    protected _coordinator: SceneController;
    constructor(coordinator: SceneController);
    onStart(container: PIXI.Container): Promise<void>;
    onUpdate(delta: number): void;
    onFinish(): void;
}
