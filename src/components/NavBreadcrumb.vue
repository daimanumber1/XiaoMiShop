<template>
  <el-row class="breadbrumb"  :span='24'>
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>

<script>
  export default {
    name: 'NavBreadcrumb',
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
    /* background: rgba(244, 247, 241, 0.356); */
    background: #dee2ee;
    padding-left: 30px

}
</style>
