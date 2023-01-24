import * as PIXI from 'pixi.js'
import { ITextData } from './../interface/ITextData'

export class HelperUtil {
  public static createStaticText(textData: ITextData): PIXI.Text {
    const staticText = new PIXI.Text(textData.text, {
      fontFamily: textData.fontFamily,
      fontSize: textData.fontSize,
      align: textData.align,
      fill: textData.color,
    })
    staticText.anchor.x = textData.anchorX || 0
    staticText.x = textData.positionX

    return staticText
  }

  public static createInteractiveText(
    textData: ITextData,
    callBackFnc?: Function,
  ): PIXI.Text {
    const dynamicText = new PIXI.Text(textData.text, {
      fontFamily: textData.fontFamily,
      fontSize: textData.fontSize,
      align: textData.align,
      fill: textData.color,
    })
    dynamicText.anchor.x = textData.anchorX || 0
    dynamicText.x = textData.positionX
    dynamicText.y = textData.positionY

    dynamicText.interactive = true
    dynamicText.cursor = 'pointer'

    dynamicText.on('pointerup', () => {
      callBackFnc && callBackFnc()
    })

    return dynamicText
  }
}
