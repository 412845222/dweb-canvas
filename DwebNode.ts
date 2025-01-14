import type { DwebComponent } from "./DwebComponent/DwebComponent"

export class DwebNode {
  name: string = ""
  width: number = 0
  height: number = 0
  position: {
    x: number,
    y: number
  } = { x: 0, y: 0 }
  scale: {
    x: number,
    y: number
  } = { x: 1, y: 1 }
  rotation: number = 0

  components: DwebComponent[] = []
  parent: DwebNode | null = null
  children: DwebNode[] = []
}