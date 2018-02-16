<template>
  <div class="breadbrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        // user: 'dddddddddddddddddddddddddddddddddd'
      }
    },
    components: {
    //   NavHeader
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-breadcrumb {
    height: 50px;
    line-height: 50px;
    /* background: rgb(212, 202, 202); */
    font-size: 14px;
    background: rgba(244, 247, 241, 0.356);

}
</style>
