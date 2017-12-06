import {
  FIGURE_WIDTH,
  FIGURE_HEIGHT,
  FIGURE_HALF_HEIGHT,
  FIGURE_ARC_LENGTH,
  FIGURE_WIDTH_WO_ARC_LENGTH,
  FIGURE_HEIGHT_WO_ARC_LENGTH,
  FIGURE_PLUS_WIDTH,
  FIGURE_PLUS_HALF_WIDTH,
  FIGURE_PLUS_ARC_LENGTH,
  FIGURE_PLUS_WIDTH_WO_ARC_LENGTH
} from './constants'

export function drawOval (ctx, x, y) {
  const xFigureEnd = x + FIGURE_WIDTH
  const yFigureEnd = y + FIGURE_HEIGHT
  const path = new Path2D()
  path.moveTo(x, y + FIGURE_ARC_LENGTH)
  path.quadraticCurveTo(x, y, x + FIGURE_ARC_LENGTH, y)
  path.lineTo(x + FIGURE_WIDTH_WO_ARC_LENGTH, y)
  path.quadraticCurveTo(xFigureEnd, y, xFigureEnd, y + FIGURE_ARC_LENGTH)
  path.lineTo(xFigureEnd, y + FIGURE_HEIGHT_WO_ARC_LENGTH)
  path.quadraticCurveTo(xFigureEnd, yFigureEnd, x + FIGURE_WIDTH_WO_ARC_LENGTH, yFigureEnd)
  path.lineTo(x + FIGURE_ARC_LENGTH, yFigureEnd)
  path.quadraticCurveTo(x, yFigureEnd, x, y + FIGURE_HEIGHT_WO_ARC_LENGTH)
  path.closePath()
  ctx.strokeStyle = '#CE59DF'
  ctx.fillStyle = '#CE59DF'
  ctx.stroke(path)
  ctx.fill(path)

  ctx.fillStyle = '#FFF'
  ctx.font = `${FIGURE_HALF_HEIGHT}px arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Action', x + (FIGURE_WIDTH / 2), y + FIGURE_HALF_HEIGHT)
}

export function drawHexagon (ctx, x, y) {
  const path = new Path2D()
  path.moveTo(x + FIGURE_ARC_LENGTH, y)
  path.lineTo(x + FIGURE_WIDTH_WO_ARC_LENGTH, y)
  path.lineTo(x + FIGURE_WIDTH, y + FIGURE_HALF_HEIGHT)
  path.lineTo(x + FIGURE_WIDTH_WO_ARC_LENGTH, y + FIGURE_HEIGHT)
  path.lineTo(x + FIGURE_ARC_LENGTH, y + FIGURE_HEIGHT)
  path.lineTo(x, y + FIGURE_HALF_HEIGHT)
  path.closePath()
  ctx.strokeStyle = '#3C9AE9'
  ctx.fillStyle = '#3C9AE9'
  ctx.stroke(path)
  ctx.fill(path)

  ctx.fillStyle = '#FFF'
  ctx.font = `${FIGURE_HALF_HEIGHT}px arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Condition', x + (FIGURE_WIDTH / 2), y + FIGURE_HALF_HEIGHT)
}

export function drawArrow (ctx, x1, y1, x2, y2) {
  const linePath = new Path2D()
  linePath.moveTo(x1, y1)
  if (x2 < x1) {
    linePath.lineTo(x2 + 5, y1)
    linePath.quadraticCurveTo(x2, y1, x2, y1 + 5)
  }
  if (x2 > x1) {
    linePath.lineTo(x2 - 5, y1)
    linePath.quadraticCurveTo(x2, y1, x2, y1 + 5)
  }
  linePath.lineTo(x2, y2)
  ctx.strokeStyle = '#B2BAC1'
  ctx.stroke(linePath)

  const path = new Path2D()
  path.moveTo(x2, y2)
  path.lineTo(x2 + 5, y2 - 10)
  path.lineTo(x2 - 5, y2 - 10)
  path.closePath()
  ctx.fillStyle = '#B2BAC1'
  ctx.fill(path)
}

export function drawPlus (ctx, x, y) {
  const xFigureEnd = x + FIGURE_PLUS_WIDTH
  const yFigureEnd = y + FIGURE_PLUS_WIDTH
  const path = new Path2D()
  path.moveTo(x, y + FIGURE_PLUS_ARC_LENGTH)
  path.quadraticCurveTo(x, y, x + FIGURE_PLUS_ARC_LENGTH, y)
  path.lineTo(x + FIGURE_PLUS_WIDTH_WO_ARC_LENGTH, y)
  path.quadraticCurveTo(xFigureEnd, y, xFigureEnd, y + FIGURE_PLUS_ARC_LENGTH)
  path.lineTo(xFigureEnd, y + FIGURE_PLUS_WIDTH_WO_ARC_LENGTH)
  path.quadraticCurveTo(xFigureEnd, yFigureEnd, x + FIGURE_PLUS_WIDTH_WO_ARC_LENGTH, yFigureEnd)
  path.lineTo(x + FIGURE_PLUS_ARC_LENGTH, yFigureEnd)
  path.quadraticCurveTo(x, yFigureEnd, x, y + FIGURE_PLUS_WIDTH_WO_ARC_LENGTH)
  path.closePath()
  ctx.strokeStyle = '#308ADF'
  ctx.fillStyle = '#308ADF'
  ctx.stroke(path)
  ctx.fill(path)

  ctx.fillStyle = '#FFF'
  ctx.font = `22px arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('\uFF0B', x + (FIGURE_PLUS_WIDTH / 2), y + FIGURE_PLUS_HALF_WIDTH)
}
