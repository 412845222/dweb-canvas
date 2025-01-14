

export class DwebComponent {
  type_name: "Image" | "Video" | "Text" | "Rect" | "Circle" | "BezierCurve"
  constructor(option: {
    type_name: "Image" | "Video" | "Text" | "Rect" | "Circle" | "BezierCurve"
  }) {
    this.type_name = option.type_name
  }
}