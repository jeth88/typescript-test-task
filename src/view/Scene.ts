import * as PIXI from 'pixi.js'
import { SceneController } from '../controller/SceneController'

export class Scene {
  protected _app: PIXI.Application
  protected _coordinator: SceneController

  constructor(coordinator: SceneController) {
    this._app = coordinator.app
    this._coordinator = coordinator
  }

  public onStart(container: PIXI.Container): Promise<void> {
    return new Promise((resolve: Function) => {
      resolve()
    })
  }

  public onUpdate(delta: number): void {}

  public onFinish(): void {}
}
