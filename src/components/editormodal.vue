<template>
    <transition name="reserve-fade">
    <div class="my-modal"
        v-if="visible" @click.self="handleWrapperClick">
        <div class="my-modal__dialog">
        <div class="my-modal__body">
            <slot></slot>
        </div>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      require: false,
    },
  },

  methods: {
    handleWrapperClick(){
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style lang="scss" scoped>
$module: 'my-modal';
.#{$module} {
  // This is modal bg
  background-color: rgba(0,0,0,.7);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  z-index:1000;

  //This is modal layer
  &__dialog{
    top:5%;
    left:10%;
    width: 80%;
    height: auto;
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
  }
  &__header {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
  }
  &__body {
    padding: 25px;
    min-height: 150px;
  }
  &__footer {
    margin-top:50px;
  }
}
.my-modal {
  color: black;
}
</style>