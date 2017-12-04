import {
  FIGURE_WIDTH,
  FIGURE_HALF_WIDTH,
  FIGURE_HEIGHT,
  FIGURE_HALF_HEIGHT,
  HEIGHT_SPACE,
  FIGURE_PLUS_HALF_WIDTH
} from './constants'
import {
  drawHexagon,
  drawOval,
  drawArrow,
  drawPlus
} from './figures'

export default class CanvasTreeDrawer {
  constructor (ctx) {
    this.ctx = ctx
    this.pluses = []
  }

  redraw (tree, x, y) {
    this.clear()
    this.draw(tree, x, y)
  }

  clear () {
    this.pluses = []
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw (fig, x0, y0) {
    if (fig.type === 'condition') {
      this.drawCondition(fig, x0, y0)
    }
    if (fig.type === 'action') {
      this.drawAction(fig, x0, y0)
    }
  }

  drawAction (actionObj, x0, y0) {
    drawOval(this.ctx, x0, y0)
    drawArrow(
      this.ctx,
      x0 + FIGURE_HALF_WIDTH,
      y0 + FIGURE_HEIGHT,
      x0 + FIGURE_HALF_WIDTH,
      y0 + FIGURE_HEIGHT + HEIGHT_SPACE
    )
    if (actionObj.child) {
      this.draw(
        actionObj.child,
        x0,
        y0 + FIGURE_HEIGHT + HEIGHT_SPACE
      )
    } else {
      this.drawPlus(
        actionObj,
        'child',
        x0 + FIGURE_HALF_WIDTH - FIGURE_PLUS_HALF_WIDTH,
        y0 + FIGURE_HEIGHT + HEIGHT_SPACE
      )
    }
  }

  drawCondition (hexagonObj, x0, y0) {
    drawHexagon(this.ctx, x0, y0)
    const childY = y0 + FIGURE_HEIGHT + HEIGHT_SPACE
    if (hexagonObj.leftChild) {
      const childX = x0 - (1 + hexagonObj.leftChild.rightWidth) * FIGURE_WIDTH
      this.draw(
        hexagonObj.leftChild,
        childX,
        childY
      )
      drawArrow(
        this.ctx,
        x0,
        y0 + FIGURE_HALF_HEIGHT,
        childX + FIGURE_HALF_WIDTH,
        childY
      )
    } else {
      drawArrow(
        this.ctx,
        x0,
        y0 + FIGURE_HALF_HEIGHT,
        x0 - FIGURE_HALF_WIDTH,
        childY
      )
      this.drawPlus(
        hexagonObj,
        'leftChild',
        x0 - FIGURE_HALF_WIDTH - FIGURE_PLUS_HALF_WIDTH,
        childY
      )
    }
    if (hexagonObj.rightChild) {
      const childX = x0 + (1 + hexagonObj.rightChild.leftWidth) * FIGURE_WIDTH
      this.draw(
        hexagonObj.rightChild,
        childX,
        childY
      )
      drawArrow(
        this.ctx,
        x0 + FIGURE_WIDTH,
        y0 + FIGURE_HALF_HEIGHT,
        childX + FIGURE_HALF_WIDTH,
        childY
      )
    } else {
      drawArrow(
        this.ctx,
        x0 + FIGURE_WIDTH,
        y0 + FIGURE_HALF_HEIGHT,
        x0 + FIGURE_WIDTH + FIGURE_HALF_WIDTH,
        childY
      )
      this.drawPlus(
        hexagonObj,
        'rightChild',
        x0 + FIGURE_WIDTH + FIGURE_HALF_WIDTH - FIGURE_PLUS_HALF_WIDTH,
        childY
      )
    }
  }

  drawPlus (obj, prop, x, y) {
    this.pluses.push({
      obj, prop, x, y
    })
    drawPlus(this.ctx, x, y)
  }
}
