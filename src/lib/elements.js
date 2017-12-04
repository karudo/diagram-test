import Vue from 'vue'

export const Condition = Vue.extend({
  data () {
    return {
      type: 'condition',
      leftChild: undefined,
      rightChild: undefined
    }
  },
  computed: {
    leftWidth () {
      return this.leftChild ? this.leftChild.width : 0.5
    },
    rightWidth () {
      return this.rightChild ? this.rightChild.width : 0.5
    },
    width () {
      return 1 + this.leftWidth + this.rightWidth
    },
    height () {
      const leftHeight = this.leftChild ? this.leftChild.height : 0.5
      const rightHeight = this.rightChild ? this.rightChild.height : 0.5
      const height = leftHeight > rightHeight ? leftHeight : rightHeight
      return height + 1
    }
  },
  methods: {
    toJSON () {
      return {
        type: this.type,
        leftChild: this.leftChild ? this.leftChild.toJSON() : null,
        rightChild: this.rightChild ? this.rightChild.toJSON() : null
      }
    }
  }
})

export const Action = Vue.extend({
  data () {
    return {
      type: 'action',
      child: undefined
    }
  },
  computed: {
    leftWidth () {
      return this.child ? this.child.leftWidth : 0
    },
    rightWidth () {
      return this.child ? this.child.rightWidth : 0
    },
    width () {
      return 1 + this.leftWidth + this.rightWidth
    },
    height () {
      const height = this.child ? this.child.height : 0.5
      return height + 1
    }
  },
  methods: {
    toJSON () {
      return {
        type: this.type,
        child: this.child ? this.child.toJSON() : null
      }
    }
  }
})
