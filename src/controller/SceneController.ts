import * as PIXI from 'pixi.js'
import { MenuScene } from '../view/MenuScene'
import { Scene } from '../view/Scene'
import './../index.css'

export class SceneController {
  private _app: PIXI.Application
  private _currentScene: Scene

  constructor(window: Window, body: any) {
    this._app = new PIXI.Application({
      resolution: window.devicePixelRatio || 1, // Adjust the resolution for retina screens; along with the autoDensity this transparently handles high resolutions
      resizeTo: window, // Auto fill the screen
      autoDensity: true, // Handles high DPI screens
      backgroundColor: 0xf5842d, // Same color motif of softgames
    })

    document
      .getElementById('canvasContainer')
      .appendChild(this._app.view as any)

    this._app.ticker.add((delta: number) => {
      this.update(delta)
    })

    this.gotoScene(new MenuScene(this))
  }

  public get app(): PIXI.Application {
    return this._app
  }

  // Replace the current scene with the new one
  public async gotoScene(newScene: Scene): Promise<void> {
    if (this._currentScene !== undefined) {
      await this._currentScene.onFinish()
      this._app.stage.removeChildren()
    }

    // This is the stage for the new scene
    const container = new PIXI.Container()

    // Start the new scene and add it to the stage
    await newScene.onStart(container)
    this._app.stage.addChild(container)
    this._currentScene = newScene
  }

  // This allows us to pass the PixiJS ticks
  // down to the currently active scene
  private update(delta: number): void {
    if (this._currentScene !== undefined) {
      this._currentScene.onUpdate(delta)
    }
  }
}
