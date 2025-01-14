import { DwebCamera } from "./DwebCamera";
import type { DwebComponent } from "./DwebComponent/DwebComponent";
import type { DwebRectComponent } from "./DwebComponent/DwebRectCompont";
import type { DwebTextComponent } from "./DwebComponent/DwebTextComponent";
import type { DwebNode } from "./DwebNode";

interface DwebCanvasOption {
  canvasDom: HTMLCanvasElement
}



export class DwebCanvas {

  ctx: CanvasRenderingContext2D | null = null;
  width: number = 0;
  height: number = 0;
  camera: DwebCamera = new DwebCamera({
    position: { x: 0, y: 0 },
  });

  nodeList: DwebNode[] = []

  constructor(option: DwebCanvasOption) {
    this.ctx = option.canvasDom.getContext('2d');
    this.width = option.canvasDom.width;
    this.height = option.canvasDom.height;
    console.log('width:', this.width, 'height:', this.height);
  }


  init(nodeList: DwebNode[]) {
    if (!this.ctx) {
      console.error('ctx is null');
      return;
    }
    this.nodeList = nodeList
  }


  drawNodeList(nodeList: DwebNode[], origin: { x: number, y: number }, rotation: number) {



    nodeList.forEach((node) => {
      this.drawNode(node, origin, rotation)
      if (node.children.length > 0) {
        let node_origin = { x: node.position.x + origin.x, y: node.position.y + origin.y }
        let node_rotation = node.rotation + rotation
        this.drawNodeList(node.children, node_origin, node_rotation)
      }
    })
  }

  drawNode(node: DwebNode, origin: { x: number, y: number }, _rotation: number) {

    node.components.forEach((component: DwebComponent) => {
      if (component.type_name == "Rect") {
        let rectComponent = component as DwebRectComponent;
        if (!this.ctx) {
          console.error('ctx is null');
          return;
        }
        this.ctx.save();
        this.ctx.translate(origin.x - node.width / 2, origin.y - node.height / 2);
        this.ctx.fillStyle = rectComponent.bgColor;
        this.ctx.fillRect(node.position.x, node.position.y, node.width, node.height);
        this.ctx.restore();
      }
      if (component.type_name == "Text") {
        // console.log('draw text', component);
        let textComponent = component as DwebTextComponent;
        if (!this.ctx) {
          console.error('ctx is null');
          return;
        }
        this.ctx.save();
        this.ctx.translate(origin.x - node.width / 2, origin.y - node.height / 2);
        // 设置字体样式
        this.ctx.font = textComponent.fontSize+"px Arial"; // 24 像素大小，字体为 Arial
        this.ctx.fillStyle = textComponent.color; // 填充文字颜色
        this.ctx.textAlign = 'center';
        this.ctx.fillText(textComponent.text, node.position.x+node.width/2,node.position.y+node.height/2+textComponent.fontSize/4);
        this.ctx.restore();
      }
    })

  }

  addCameraScale(scale: number) {
    this.camera.scale += scale
    this.update()
  }


  //刷新画面
  update() {
    this.ctx?.clearRect(0, 0, this.width, this.height)

    //载入摄像头
    this.ctx?.save()
    this.ctx?.translate(this.width / 2 + this.camera?.position.x, this.height / 2 + this.camera?.position.y)
    this.ctx?.scale(this.camera.scale, this.camera.scale)
    

    // console.log('drawNodeList:', this.nodeList);
    this.drawNodeList(this.nodeList, { x: 0, y: 0 }, 0)
    this.ctx?.restore()
    

  }

}