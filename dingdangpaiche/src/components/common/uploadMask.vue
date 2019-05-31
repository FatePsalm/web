<!-- 蒙版弹窗 -->
<template>
  <div>
    <mu-dialog :open="dialog" dialogClass="dialogClass_up" titleClass="titleClass" bodyClass="bodyClass_up" actionsContainerClass="actionsContainerClass">
      <!-- <span class="dialogName_up">{{name}}</span> -->
    </mu-dialog>
    <span class="dialogName_up">{{name}}</span>
  </div>
</template>

<script>
export default {
  props: ['state',"name"],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true;
      // var that = this;
      // setTimeout(function(){
      //   that.dialog = false;
      // },1000)
    },
    close () {
      this.dialog = false;
    }
  },
  watch: {
    state (val) {
      val == true ? this.open() : this.close();
    },
    dialog (val) {
      this.$emit('update:state', val);
    }
  }
}
</script>
<style>
  /*弹出框样式*/
  .dialogClass_up{
    border-radius: 0.12rem;
    width: 2.7rem;
    height: 1.16rem;
    background-color: #F2F1F1;
    opacity: 0;
  }
  /*内容样式*/
  .bodyClass_up{
    height: 1.16rem;
    text-align: center;
    line-height: 0.71rem;
    padding: 0;
    font-size: 0.17rem;
    color: #030303;
    font-weight: 600;
    opacity: 0;
  }
  /*按钮容器样式*/
  /*.actionsContainerClass{
    min-height: 0.44rem;
    height: 0.44rem;
  }*/
  .dialogName_up{
    display: block;
    width: 3.75rem;
    position: fixed;
    top: 2.5rem;
    left: 0;
    font-size: 0.18rem;
    font-weight: 400;
    color: #fff;
    z-index: 1000000000;
    text-align: center;
  }
</style>
