import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { Point } from 'pixi.js'
import { SceneController } from './../controller/SceneController'
import { HelperUtil } from './../util/HelperUtil'
import { MenuScene } from './MenuScene'
import { Scene } from './Scene'

export class Task1Scene extends Scene {
  private _container1: PIXI.Container
  private _container2: PIXI.Container
  private _sprites: PIXI.Sprite[]
  private _fpsText: PIXI.Text
  private _ticker: PIXI.Ticker
  private _descCtr: number
  private _ascCtr: number

  constructor(coordinator: SceneController) {
    super(coordinator)

    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)

    this.reset()
  }

  public onStart(container: PIXI.Container): Promise<void> {
    return new Promise((resolve: Function) => {
      const taskText = HelperUtil.createStaticText({
        text: 'CARD DECK GAME',
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

      this._fpsText = HelperUtil.createStaticText({
        text: 'FPS: 0',
        fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
        fontSize: 20,
        align: 'center',
        color: 0xff0000,
        positionX: 20,
      })

      container.addChild(taskText, returnMenuText, this._fpsText)

      this.runFPSTicker()
      this.generateDeckOfCards(container)
      resolve()
    })
  }

  public onFinish(): void {
    this.reset()
  }

  private runFPSTicker(): void {
    this._ticker = new PIXI.Ticker()
    this._ticker.stop()
    this._ticker.add((deltaTime) => {
      this._fpsText.text = `FPS: ${this._ticker.FPS.toFixed(2)}`
    })
    this._ticker.start()
  }

  private generateDeckOfCards(parentContainer: PIXI.Container): void {
    this._container1 = this.getNewContainer(new Point(50, 300))
    this._container2 = this.getNewContainer(new Point(50, 300))

    parentContainer.addChild(this._container2, this._container1)

    for (let i = 0; i < 144; i++) {
      const sprite = PIXI.Sprite.from('./../img/cardDown.png')
      sprite.scale.set(0.5)
      sprite.y = 200 - i * 2
      this._container1.addChild(sprite)
      this._sprites.push(sprite)
    }

    this.transferOneCard()
  }

  private getNewContainer(position: Point): PIXI.Container {
    const cont = new PIXI.Container()
    cont.x = position.x
    cont.y = position.y

    return cont
  }

  private transferOneCard(): void {
    if (this._descCtr > 0) {
      this._descCtr--
    }

    if (this._ascCtr < 144) {
      this._ascCtr++

      gsap.to(this._sprites[this._descCtr], {
        delay: this._ascCtr !== 0 ? 1 : 0,
        x: 200,
        y: 200 - this._ascCtr * 2,
        duration: 2,
        onComplete: () => {
          this._container2.addChild(this._sprites[this._descCtr])
          this.transferOneCard()
        },
      })
    } else {
      gsap.killTweensOf(this._sprites)
    }
  }

  private reset(): void {
    if (this._sprites && this._sprites.length) {
      gsap.killTweensOf(this._sprites)
    }
    this._sprites = []
    this._sprites.length = 0

    if (this._container1 && this._container1.children.length) {
      this._container1.removeChildren()
    }
    this._container1 = null

    if (this._container2 && this._container2.children.length) {
      this._container2.removeChildren()
    }
    this._container2 = null

    if (this._ticker) {
      this._ticker.stop()
      this._ticker.destroy()
    }
    this._ticker = null

    this._descCtr = 144
    this._ascCtr = -1
  }
}
