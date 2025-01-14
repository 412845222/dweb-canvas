export class DwebCamera {
  position: {
    x: number,
    y: number
  }
  rotation: number = 0
  scale: number = 1
  constructor(option: {
    position: {
      x: number,
      y: number
    },
    rotation?: number,
    scale?: number
  }) {
    this.position = option.position
    if (option.rotation) {
      this.rotation = option.rotation
    }
    if (option.scale) {
      this.scale = option.scale
    }
  }
}