<template>
  <div class="home">
    <el-row class="tac">
      <!-- header -->
      <nav-header></nav-header>
      <!-- breadcrumb -->
      <nav-breadcrumb></nav-breadcrumb>
      <div class="content">
        <el-col :span="24" class="sort">
        </el-col>
        <br>
        <el-col :span="4">
          <h4>&nbsp;&nbsp;&nbsp;P r i c e :</h4>
          <el-menu default-active="2" class="el-menu-vertical-demo" >
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>

              <span slot="title">All</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">100 ~ 150</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title">100 ~ 150</span>
            </el-menu-item>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">100 ~ 150</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span='20'>
          <el-row>
            <el-col :span="6" v-for='item in products' :key='item.id' id="row">
              <a href="#">
                <img :src="'../../static/'+item.url">
                <span>{{item.pname}}</span>
                <p>
                  ￥{{item.price}}
                </p>
                <div>
                  加入购物车
                </div>
              </a>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>
  </div>

</template>



<script>
import NavHeader from "@/components/NavHeader";
import NavBreadcrumb from "@/components/NavBreadcrumb";
import axios from "axios";
export default {
  name: "dddd",
  data() {
    return {
      msg: "fuqiang",
      products: []
    };
  },
  methods: {
    getAllProducts() {
      axios
        .get("http://127.0.0.1:3000/home")
        .then(res => {
          // console.log(res)
          // console.log(res.data);
          this.products = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    NavHeader,
    NavBreadcrumb
  },
  mounted() {
    this.getAllProducts();
  }
};
</script>
<style scoped>
.sort {
  height: 50px;
  background: #f5f7fc;
}

.el-col > a > img {
  width: 100%;
  height: 240px;
  padding: 0 8px;
}

.el-col > a {
  display: block;
  width: 240px;
  border: 1px solid rgb(167, 158, 158);
  overflow: hidden;
  color: black;
  text-decoration: none;
}

.el-col > a > span {
  display: block;
  height: 50px;
  line-height: 50px;
  margin-left: 10px;
}

.el-col > a > p {
  display: block;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  color: #d1434a;
  font-size: 18px;
}

.el-col > a > div {
  width: 170px;
  line-height: 40px;
  height: 40px;
  border: 1px solid #d1434a;
  text-align: center;
  margin: 0 auto 15px;
  color: #d1434a;
  font-weight: 600;
  font-size: 14px;
}

h4 {
  color: rgb(168, 158, 158);
}
#row {
  margin-top: 25px
}
</style>
