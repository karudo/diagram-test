<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-text">Select element to add:</div>

          <div class="modal-buttons">
            <button class="btn condition" @click="$emit('add', 'condition')">&#11041;</button>
            <button class="btn action" @click="$emit('add', 'action')">&#9651;</button>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-text {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }

  .btn {
    color: white;
    width: 140px;
    height: 50px;
    font-size: 24px;
  }
  .btn.action {
    background-color: #CE59DF;
  }
  .btn.condition {
    background-color: #3C9AE9;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
