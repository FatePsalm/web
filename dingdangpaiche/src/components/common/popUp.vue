<!-- 自动关闭弹窗 -->
<template>
  <div>
    <mu-dialog :open="dialog" dialogClass="dialogClass_pop" titleClass="titleClass" bodyClass="bodyClass_pop" actionsContainerClass="actionsContainerClass">
      <span class="dialogName_pop">{{name}}</span>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: "popUp",
  props: ['state',"name"],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
      },1000)
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
  .mu-dialog.dialogClass_pop{
    border-radius: 0.12rem;
    width: 2.7rem;
    height: 1.16rem;
    background-color: #F2F1F1;
  }
  /*内容样式*/
  .mu-dialog-body.bodyClass_pop{
    height: 1.16rem;
    text-align: center;
    line-height: 0.71rem;
    padding: 0;
    font-size: 0.17rem;
    color: #030303;
    font-weight: 600;
  }
  /*按钮容器样式*/
  /*.actionsContainerClass{
    min-height: 0.44rem;
    height: 0.44rem;
  }*/
  /*.actions_btn{
    text-align: center;
    line-height: 0.44rem;
    font-size: 0.17rem;
    color: #007AFF;
    width: 1.34rem;
  }
  .actions_btn a{
    color: #007AFF;
  }*/
  /*.btn_borR{
    border-right: 1px solid #DEDCDC;
  }*/
  .dialogName_pop{
    font-size: 0.18rem;
    font-weight: 400;
    line-height: 1.16rem;
  }
</style>
