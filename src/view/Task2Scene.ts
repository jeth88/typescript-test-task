import * as PIXI from 'pixi.js'
import { Point } from 'pixi.js'
import { SceneController } from './../controller/SceneController'
import { HelperUtil } from './../util/HelperUtil'
import { MenuScene } from './MenuScene'
import { Scene } from './Scene'

export class Task2Scene extends Scene {
  private readonly _loadObjectsIntervalinMS: number = 2000
  private readonly _fontSizes: number[] = [16, 32, 22, 20, 28]

  private readonly _activityNames: string[] = [
    'Programming',
    'Reading',
    'Coding',
    'Debugging',
    'Planning',
  ]

  private readonly _textureImages: string[] = [
    './../img/bat.jpg',
    './../img/bee.jpg',
    './../img/cat.jpg',
    './../img/heart.jpg',
    './../img/snowman.jpg',
  ]

  private _objects: Array<PIXI.Text | PIXI.Sprite>
  private _intervalId: number

  constructor(coordinator: SceneController) {
    super(coordinator)

    this.reset()
  }

  public onStart(container: PIXI.Container): Promise<void> {
    return new Promise((resolve: Function) => {
      const taskText = HelperUtil.createStaticText({
        text: 'RANDOM OBJECT GAME',
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

      this.generateRandomObjects(container)
      this._intervalId = window.setInterval(() => {
        this.generateRandomObjects(container)
      }, this._loadObjectsIntervalinMS)

      resolve()
    })
  }

  public onFinish(): void {
    this.clearObjects()
    window.clearInterval(this._intervalId)
  }

  private clearObjects(): void {
    if (this._objects && this._objects.length) {
      for (const obj of this._objects) {
        obj.destroy()
      }
      this.reset()
    }
  }

  private generateRandomObjects(container: PIXI.Container): void {
    this.clearObjects()

    const firstRandomObject = this.generateRandomObject(new Point(150, 80))
    const secondRandomObject = this.generateRandomObject(new Point(150, 180))
    const thirdRandomObject = this.generateRandomObject(new Point(150, 280))

    container.addChild(firstRandomObject, secondRandomObject, thirdRandomObject)
    this._objects.push(firstRandomObject, secondRandomObject, thirdRandomObject)
  }

  private generateRandomObject(position: Point): PIXI.Text | PIXI.Sprite {
    const randomNumber = this.getRandomIdxByParam(2)

    // if random is 0, generateText; otherwise, generateImage
    const randomObject =
      randomNumber === 0 ? this.getRandomText() : this.getRandomImage()
    randomObject.x = position.x
    randomObject.y =
      randomObject instanceof PIXI.Text ? position.y + 30 : position.y

    return randomObject
  }

  private getRandomText(): PIXI.Text {
    const randomIdx = this.getRandomIdxByParam(this._activityNames.length)
    const text = HelperUtil.createStaticText({
      text: this._activityNames[randomIdx],
      fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
      fontSize: this._fontSizes[randomIdx],
      color: 0x000000,
    })

    return text
  }

  private getRandomImage(): PIXI.Sprite {
    const randomIdx = this.getRandomIdxByParam(this._textureImages.length)

    const sprite = PIXI.Sprite.from(this._textureImages[randomIdx])
    sprite.scale.set(0.5)
    return sprite
  }

  private getRandomIdxByParam(length: number): number {
    return Math.floor(Math.random() * length)
  }

  private reset(): void {
    this._objects = []
    this._objects.length = 0
  }
}
