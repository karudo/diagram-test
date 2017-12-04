<template>
  <div class="wrapper" ref="wrapper" :style="wrapperStyle">
    <canvas ref="canvas" :width="wrapperWidth" :height="wrapperHeight" @click="click"></canvas>
    <modal v-if="addTo" @add="addElement"></modal>
  </div>
</template>

<script>
//
import {FIGURE_WIDTH, FIGURE_HALF_WIDTH, FIGURE_HEIGHT, HEIGHT_SPACE, FIGURE_PLUS_WIDTH, FIGURE_PLUS_HALF_WIDTH} from '../lib/constants'
import {Condition, Action} from '../lib/elements'
import CanvasTree from '../lib/tree-drawer'
import {drawPlus} from '../lib/figures'
import {max} from '../lib/utils'
import Modal from './Modal.vue'

export default {
  name: 'HelloWorld',
  props: ['wrapperWidth', 'wrapperHeight'],
  data () {
    return {
      addTo: false,
      canvasContext: undefined,
      drawer: undefined,
      root: undefined,
      canvasWidth: this.wrapperWidth,
      canvasHeight: this.wrapperHeight
    }
  },
  mounted () {
    this.canvasContext = this.$refs.canvas.getContext('2d')
    this.drawer = new CanvasTree(this.canvasContext)
    this.reset()
  },
  computed: {
    wrapperStyle () {
      const overflow = this.canvasWidth > this.wrapperWidth || this.canvasHeight > this.wrapperHeight ? 'auto' : 'hidden'
      return {
        width: `${this.wrapperWidth}px`,
        height: `${this.wrapperHeight}px`,
        overflow
      }
    }
  },
  methods: {
    getMousePos (evt) {
      const rect = this.canvasContext.canvas.getBoundingClientRect()
      return {
        x: Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * this.canvasWidth),
        y: Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvasHeight)
      }
    },
    reset () {
      this.root = undefined
      this.canvasWidth = this.wrapperWidth
      this.canvasHeight = this.wrapperHeight
      this.$refs.canvas.width = this.canvasWidth
      this.$refs.canvas.height = this.canvasHeight
      this.drawer.clear()
      drawPlus(this.canvasContext, this.canvasWidth / 2 - FIGURE_PLUS_HALF_WIDTH, 0)
    },
    redraw () {
      const newWidth = max(this.root.leftWidth, this.root.rightWidth) * FIGURE_WIDTH * 2 + FIGURE_WIDTH + FIGURE_PLUS_WIDTH
      const newHeight = this.root.height * (FIGURE_HEIGHT + HEIGHT_SPACE)
      this.canvasWidth = max(newWidth, this.wrapperWidth)
      this.canvasHeight = max(newHeight, this.wrapperHeight)
      this.$refs.canvas.width = this.canvasWidth
      this.$refs.canvas.height = this.canvasHeight
      this.drawer.redraw(this.root, this.canvasWidth / 2 - FIGURE_HALF_WIDTH, 0)
    },
    addElement (type) {
      let el
      if (type === 'action') {
        el = new Action()
      } else {
        el = new Condition()
      }
      this.addTo.obj[this.addTo.prop] = el
      this.addTo = undefined
      this.redraw()
    },
    click (e) {
      if (this.root) {
        const mousePos = this.getMousePos(e)
        for (const plus of this.drawer.pluses) {
          if (
            mousePos.x >= plus.x && mousePos.x <= (plus.x + FIGURE_PLUS_WIDTH) &&
            mousePos.y >= plus.y && mousePos.y <= (plus.y + FIGURE_PLUS_WIDTH)
          ) {
            this.addTo = plus
            break
          }
        }
      } else {
        this.addTo = {
          obj: this,
          prop: 'root'
        }
      }
    }
  },
  components: {Modal}
}
</script>

<style scoped>
.canvas {
  flex-grow: 1;
}
</style>
