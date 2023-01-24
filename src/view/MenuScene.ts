import * as PIXI from 'pixi.js'
import { HelperUtil } from './../util/HelperUtil'
import { Scene } from './Scene'
import { Task1Scene } from './Task1Scene'
import { Task2Scene } from './Task2Scene'
import { Task3Scene } from './Task3Scene'

export class MenuScene extends Scene {
  public onStart(container: PIXI.Container): Promise<void> {
    return new Promise((resolve: Function) => {
      this.setupTexts(container)
      resolve()
    })
  }

  private setupTexts(container: PIXI.Container): void {
    const menuText = HelperUtil.createStaticText({
      text: 'TEST TASK MENU',
      fontFamily: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
      fontSize: 32,
      align: 'center',
      color: 0xffffff,
      anchorX: 0.5,
      positionX: this._app.screen.width / 2,
    })

    const task1Text = HelperUtil.createInteractiveText(
      {
        text: 'CARD DECK GAME',
        fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
        fontSize: 20,
        align: 'center',
        color: 0x000000,
        anchorX: 0.5,
        positionX: this._app.screen.width / 2,
        positionY: 100,
      },
      () => {
        this._coordinator.gotoScene(new Task1Scene(this._coordinator))
      },
    )

    const task2Text = HelperUtil.createInteractiveText(
      {
        text: 'RANDOM OBJECT GAME',
        fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
        fontSize: 20,
        align: 'center',
        color: 0x000000,
        anchorX: 0.5,
        positionX: this._app.screen.width / 2,
        positionY: 160,
      },
      () => {
        this._coordinator.gotoScene(new Task2Scene(this._coordinator))
      },
    )

    const task3Text = HelperUtil.createInteractiveText(
      {
        text: 'FIRE EFFECT GAME',
        fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
        fontSize: 20,
        align: 'center',
        color: 0x000000,
        anchorX: 0.5,
        positionX: this._app.screen.width / 2,
        positionY: 220,
      },
      () => {
        this._coordinator.gotoScene(new Task3Scene(this._coordinator))
      },
    )

    container.addChild(menuText, task1Text, task2Text, task3Text)
  }
}
