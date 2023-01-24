import * as PixiParticle from '@pixi/particle-emitter'
import * as PIXI from 'pixi.js'
import * as flameJson from './../json/blueFlame.json'
import { HelperUtil } from './../util/HelperUtil'
import { MenuScene } from './MenuScene'
import { Scene } from './Scene'

export class Task3Scene extends Scene {
  private _emitter: PixiParticle.Emitter
  private _particleContainer: PIXI.Container

  public onStart(container: PIXI.Container): Promise<void> {
    return new Promise((resolve: Function) => {
      const taskText = HelperUtil.createStaticText({
        text: 'FIRE EFFECT GAME',
        fontFamily: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
        fontSize: 32,
        align: 'center',
        color: 0xffffff,
        anchorX: 0.5,
        positionX: this._app.screen.width / 2,
      })

      const returnMenuText = HelperUtil.createInteractiveText(
        {
          text: '<< BACK',
          fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
          fontSize: 18,
          align: 'center',
          color: 0xd21404,
          positionX: 20,
          positionY: this._app.screen.height - 50,
        },
        () => {
          this._coordinator.gotoScene(new MenuScene(this._coordinator))
        },
      )

      container.addChild(taskText, returnMenuText)

      this.setupParticlesAndPlay()
      resolve()
    })
  }

  public onUpdate(delta: number): void {
    if (this._emitter) {
      this._emitter.update(delta * 0.001)
    }
    this._app.renderer.render(this._app.stage)
  }

  public onFinish(): void {
    if (this._particleContainer && this._particleContainer.children.length) {
      this._particleContainer.removeChildren()
      this._particleContainer = null
    }

    this._emitter.emit = false
    this._emitter.cleanup()
    this._emitter.destroy()
    this._emitter = null
  }

  private setupParticlesAndPlay(): void {
    this._particleContainer = new PIXI.Container()
    this._particleContainer.x = 200
    this._particleContainer.y = 300

    this._app.stage.addChild(this._particleContainer)

    this._emitter = new PixiParticle.Emitter(this._particleContainer, flameJson)
    this._emitter.emit = true
  }
}
