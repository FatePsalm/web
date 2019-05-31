<!-- 确认弹窗 -->
<template>
<div>
  <mu-dialog :open="dialog" :title='title' @close="close" dialogClass="dialogClass" titleClass="titleClass" bodyClass="bodyClass" actionsContainerClass="actionsContainerClass">
    <p>{{content}}</p>
    <span slot="actions" @click="close" primary class="actions_btn">确定</span>
  </mu-dialog>
</div>
</template>

<script>
export default {
  name: 'confirmLayer',
  props: ['state','title','content'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
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
  .mu-dialog.dialogClass{
    border-radius: 0.12rem;
    width: 2.7rem;
    height: 1.28rem;
    background-color: #F2F1F1;
  }
  /*标题栏样式*/
  .mu-dialog-title.titleClass{
    height: 0.24rem;
    line-height: 0.24rem;
    text-align: center;
    font-size: 0.17rem;
    color: #030303;
    margin-top: 0.19rem;
    padding: 0;
    display: block;
    font-weight: 600;
  }
  /*内容样式*/
  .mu-dialog-body.bodyClass{
    height: 0.24rem;
    text-align: center;
    line-height: 0.24rem;
    padding: 0;
    font-size: 0.12rem;
    color: #030303;
    margin-bottom: 0.14rem;
  }
  /*按钮容器样式*/
  .actionsContainerClass{
    min-height: 0.47rem;
    height: 0.47rem;
    padding: 0;
    border-top: 1px solid #D0D9E3;
  }
  .actions_btn{
    width: 2.7rem;
    text-align: center;
    line-height: 0.47rem;
    font-size: 0.17rem;
    color: #0076FF;
  }
</style>
