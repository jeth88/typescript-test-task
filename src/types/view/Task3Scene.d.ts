import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
export declare class Task3Scene extends Scene {
    private _emitter;
    private _particleContainer;
    onStart(container: PIXI.Container): Promise<void>;
    onUpdate(delta: number): void;
    onFinish(): void;
    private setupParticlesAndPlay;
}
