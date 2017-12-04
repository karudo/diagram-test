<template>
  <div id="app">
    <div class="buttons">
      <button @click="save">save</button>
      <button @click="$refs.treeCanvas.reset()">clear</button>
    </div>
    <div class="canvas" ref="wrapper">
      <tree-canvas
        v-if="wrapperWidth && wrapperHeight"
        :wrapperWidth="wrapperWidth"
        :wrapperHeight="wrapperHeight"
        ref="treeCanvas"
      />
    </div>
  </div>
</template>

<script>
import TreeCanvas from './components/Canvas'

export default {
  name: 'app',
  data () {
    return {
      wrapperWidth: 0,
      wrapperHeight: 0
    }
  },
  mounted () {
    this.wrapperWidth = this.$refs.wrapper.clientWidth
    this.wrapperHeight = this.$refs.wrapper.clientHeight
  },
  methods: {
    save () {
      if (this.$refs.treeCanvas.root) {
        console.log(this.$refs.treeCanvas.root.toJSON())
      }
    }
  },
  components: {
    TreeCanvas
  }
}
</script>

<style>
#app {
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  display: flex;
  flex-direction: column;
}
.buttons {
  background-color: blanchedalmond;
  padding: 5px;
}
.canvas {
  flex-grow: 1;
}
</style>
