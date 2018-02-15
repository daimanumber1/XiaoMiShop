<template>
  <div class="header">
    <el-row>
      <el-col :span="8">
        <a href="#">
          <img src="/static/logo.png">
        </a>
      </el-col>
      <el-col :span="16" class="header-right">
        <a href="" class="cart">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuche"></use>
          </svg>
          购物车
        </a>
        <a href="" class="login">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-denglu"></use>
          </svg>
          login
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import "element-ui/lib/theme-chalk/index.css";
  import '../assets/css/iconfont.js'
  export default {
    name: "HelloWorld",
    data() {
      return {};
    },
    methods: {}
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 图标引用 */

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .el-row {
    background: rgba(244, 247, 241, 0.356)
  }

  .el-col {
    height: 80px;
    line-height: 80px;
  }

  .login {
    text-decoration: none;
    color: black;
    position: absolute;
    right: 150px;
  }

  .cart {
    text-decoration: none;
    color: black;
    position: absolute;
    right: 50px
  }

</style>
