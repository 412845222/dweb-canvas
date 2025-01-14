import { DwebComponent } from "./DwebComponent"

export interface DwebRectOption {
  shadowBlur?: number,
  bgColor?: string,
  border?: {
    width: number,
    color: string
  }
}

export class DwebRectComponent extends DwebComponent {
  shadowBlur: number = 0
  bgColor: string = "#000000"
  border: {
    width: number,
    color: string
  } = {
      width: 0,
      color: "#fff000"
    }


  constructor(option: DwebRectOption) {
    super({ type_name: "Rect" })
    if (option.shadowBlur) {
      this.shadowBlur = option.shadowBlur
    }
    if (option.bgColor) {
      this.bgColor = option.bgColor
    }
    if (option.border) {
      this.border = option.border
    }
  }

  
}