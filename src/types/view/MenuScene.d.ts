import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
export declare class MenuScene extends Scene {
    onStart(container: PIXI.Container): Promise<void>;
    private setupTexts;
}
