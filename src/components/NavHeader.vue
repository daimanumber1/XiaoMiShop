<template>
  <div class="header">
    <el-row>
      <el-col :span="8" class="mi">
        <a href="#">
          <img src="/static/mi.png" width="50px">
        </a>
      </el-col>
      <el-col :span="16" class="header-right">
        <!-- 使用v-if判断是否登录 -->
        <a href="#" class="login" @click="dialogFormVisible = true" v-if='!loginName'>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-denglu"></use>
          </svg>
          {{login}}
        </a>
        <div class="login2" v-else>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-denglu"></use>
          </svg>
          {{loginName}}
          &nbsp;&nbsp;&nbsp;
          <a href="#" @click='logout'>
            <span>Logout</span>
          </a>
        </div>
        <!-- 弹出表单 -->
        <el-dialog title="登录" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 购物车图标 -->
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
import { mapState } from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
import qs from "qs";
export default {
  name: "NavHeader",
  data() {
    // 校验登录框的用户名是否为空
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 校验登录框的密码是否为空
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      login: "login",
      dialogFormVisible: false,
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 登录框中的登录按钮（提交登录的表单）
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password
          };
          // var xhr = new XMLHttpRequest();
          // xhr.withCredentials = true;
          // console.log(obj);
          axios
            .post("http://127.0.0.1:3000/doLogin", qs.stringify(obj))
            .then(res => {
              console.log(res);
              // 如果成功则跳转首页
              if (res.data == 1) {
                // alert("11111111111");
                this.$notify({
                  title: "成功",
                  message: "这是一条成功的提示消息",
                  type: "success"
                });
                window.location = "";
              } else if (res.data == 0) {
                this.resetForm(formName);
                alert("用户名或者密码错误请重新输入");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 在登录框中的重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 登出功能
    logout() {
      this.$store.commit("updateLoginName", "");
    }
  },
  computed: {
    ...mapState(["loginName"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mi {
  padding-left: 30px;
}

.el-col {
  height: 50px;
  line-height: 50px;
}

.login,
.login2 {
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
a {
  text-decoration: none;
  color: grey;
}
</style>
