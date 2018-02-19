<template>
  <div class="header">
    <el-row>
      <el-col :span="8">
        <a href="#">
          <img src="/static/logo.png" width="125px">
        </a>
      </el-col>
      <el-col :span="16" class="header-right">
        <a href="#" class="login" @click="dialogFormVisible = true">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-denglu"></use>
          </svg>
          login
        </a>
        <!-- 弹出表单 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="username">
                  <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password">
                  <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
        </el-dialog>
        <!-- 购物车 -->
        <a href="#" class="cart">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gouwuche"></use>
          </svg>
          购物车
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import "element-ui/lib/theme-chalk/index.css";
  import "../assets/css/iconfont.js";
  export default {
    name: "HelloWorld",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        ruleForm2: {
          username: '',
          password: '',
        },
        rules2: {
          username: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          password: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            window.location = ''
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

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

  .el-col {
    height: 50px;
    line-height: 50px;
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
    right: 50px;
  }

  .login:hover,
  .cart:hover {
    color: #d14371;
  }

</style>
