import { DwebComponent } from "./DwebComponent";

//文本组件
export class DwebTextComponent extends DwebComponent {

  text: string = ""
  color: string = "#ffffff"
  fontSize: number = 14

  constructor(
    textOption?: {
      text: string,
      color: string,
      fontSize?: number
    }
  ) {
    super({ type_name: "Text" });
    if (textOption) {
      this.text = textOption.text
      this.color = textOption.color
      if (textOption.fontSize) {
        this.fontSize = textOption.fontSize
      }
    }
  }
}