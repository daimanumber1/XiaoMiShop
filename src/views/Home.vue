<template>
  <div class="home">
    <el-row class="tac">
      <!-- header顶部 -->
      <nav-header></nav-header>
      <!-- breadcrumb面包屑 -->
      <nav-breadcrumb></nav-breadcrumb>
      <div class="content">
        <!-- 左侧导航栏 （价格区间） -->
        <el-col :span="4">
          <h4>&nbsp;&nbsp;&nbsp;P r i c e :</h4>
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="0">
              <i class="el-icon-setting"></i>
              <span slot="title">All</span>
            </el-menu-item>
            <el-menu-item :index='String(index+1)' v-for='(item,index) in priceFilters' :key='item.id' @click='doPriceFilter(index+1)'>
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.startPrice}} ~ {{item.endPrice}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <!-- 右侧主体部分 -->
        <el-col :span='20'>
          <el-row>
            <!-- 价格排序栏 -->
            <div class="sortInfo">
              <span>Sort By: Default&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <a href="#" @click="toggleSort">Price
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="sortIcon"></use>
                </svg>
              </a>
            </div>
            <!-- 全部的商品列表 -->
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
      // 接收/home返回的数据（全部商品）
      products: [],
      // 价格升序还是降序
      sortFlag: true,
      // 升序还是降序的图标
      sortIcon: "#icon-paixu-shengxu",
      // 导航栏的价格区间
      priceFilters: [
        {
          startPrice: "0.00",
          endPrice: "100.00"
        },
        {
          startPrice: "100.00",
          endPrice: "500.00"
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00"
        }
      ],
      // 导航栏价格的索引
      priceIndex: 0
    };
  },
  methods: {
    //打开时默认的首页加载全部商品列表
    getAllProducts() {
      let obj = {
        sortFlag: this.sortFlag ? 1 : -1,
        priceIndex: this.priceIndex
      };
      axios
        .get("http://127.0.0.1:3000/home", {
          params: obj
        })
        .then(res => {
          // console.log(res)
          // console.log(res.data);
          this.products = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // toggle价格降序以及升序
    toggleSort() {
      this.sortFlag = !this.sortFlag;
      this.sortIcon =
        this.sortIcon == "#icon-paixu-shengxu"
          ? "#icon-paixu-jiangxu"
          : "#icon-paixu-shengxu";
      this.getAllProducts();
    },
    //左侧导航栏的根据价格过滤
    doPriceFilter(index) {
      this.priceIndex = index;
      this.getAllProducts();
      console.log(index);
    }
  },
  components: {
    NavHeader,
    NavBreadcrumb
  },
  // 在页面还没有挂载前获得全部商品
  mounted() {
    this.getAllProducts();
  }
};
</script>
<style scoped>
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

.sortInfo {
  /* background: #C0C4CC; */
  height: 50px;
  line-height: 50px;
  text-align: right;
  padding-right: 70px;
  font-size: 17px;
}

.sortInfo > span {
  font-size: 14px;
}

.sortInfo a {
  text-decoration: none;
  /* color: black; */
}

h4 {
  color: rgb(168, 158, 158);
}

#row {
  margin-bottom: 25px;
}
</style>
