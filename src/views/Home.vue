<template>
  <div class="home">
    <el-row class="tac">
      <!-- header顶部 -->
      <nav-header></nav-header>
      <!-- breadcrumb面包屑 -->
      <nav-breadcrumb></nav-breadcrumb>
      <div class="content">
        <!-- 左侧导航栏 （价格区间） -->
        <el-col :span='5' :xs='24'>
          <h4>&nbsp;&nbsp;&nbsp;P r i c e :</h4>
          <el-menu default-active="0" class="el-menu-vertical-demo" background-color="#f5f5f5" text-color="#605f9e" active-text-color="#ee7a23">
            <el-menu-item index="0" @click='doPriceFilter(0)'>
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
        <el-col :span='18' :xs='24'>
          <el-row :gutter="40">
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
            <el-col class='list' :xs='24' :sm='8' :md='6' v-for='item in products' :key='item.id' id="row">
              <a href="#" class="productBox">
                <img :src="'../../static/'+item.url">
                <div class="box">
                  <span>{{item.pname}}</span>
                  <p>
                    ￥{{item.price}}
                  </p>
                  <div class="jiaru">
                    加入购物车
                  </div>
                </div>

              </a>
            </el-col>
          </el-row>
          <!-- loading 加载动画 -->
          <el-col :xs='24' class="ani" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <el-table v-loading="loading" :data="tableData" style="width: 100%" v-show='isLoading' element-loading-background='#f5f5f5'>
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-col>
        </el-col>
      </div>
    </el-row>
  </div>

</template>



<script>
  import NavHeader from "@/components/NavHeader";
  import NavBreadcrumb from "@/components/NavBreadcrumb";
  import axios from "axios";
  axios.defaults.withCredentials = true;
  import {
    mapState
  } from "vuex";
  export default {
    name: "Home",
    data() {
      return {
        // 接收/home返回的数据（全部商品）
        products: [],
        // 价格升序还是降序
        sortFlag: true,
        // 升序还是降序的图标
        sortIcon: "#icon-paixu-shengxu",
        // 导航栏的价格区间
        priceFilters: [{
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
        priceIndex: 0,
        // 页数
        page: 1,
        // 杂乱，无用的  loading 的数据
        tableData: [{
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          }
        ],
        loading: true,
        // isLoading 为false则加载的动画不显示
        isLoading: true,
        // busy：如果此属性的值为true，则无限滚动将被禁用
        busy: true
      };
    },
    methods: {
      //打开时默认的首页加载全部商品列表
      getAllProducts(flag) {
        let obj = {
          sortFlag: this.sortFlag ? 1 : -1,
          priceIndex: this.priceIndex,
          page: this.page
        };
        this.isLoading = true;
        //先禁止无限滚动
        this.busy = true;
        axios
          .get("http://127.0.0.1:3000/home", {
            params: obj
          })
          .then(res => {
            if (flag) {
              this.products = this.products.concat(res.data.list);
              // console.log(res.data);
              //当无数据传回来 即res.data.list为空数组时与false做对比时则为true，
              // 这是因为，空数组变为0，false变为0,两者在比较则为true
              if (res.data.list == false) {
                this.busy = true;
                this.isLoading = false;
              } else {
                this.busy = false;
              }
            } else {
              this.products = res.data.list;
              this.busy = false;
            }
            // console.log(this.products);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // toggle价格降序以及升序
      toggleSort() {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.sortIcon =
          this.sortIcon == "#icon-paixu-shengxu" ?
          "#icon-paixu-jiangxu" :
          "#icon-paixu-shengxu";
        this.getAllProducts(false);
      },
      //左侧导航栏的根据价格过滤
      doPriceFilter(index) {
        this.priceIndex = index;
        this.page = 1;
        this.getAllProducts();
        // console.log(index);
      },
      //无限加载的方法
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getAllProducts(true);
        }, 1000);
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
  .list>a>img {
    width: 100%;
  }

  .list>a {
    width: 100%;
    display: block;
    overflow: hidden;
    color: black;
    text-decoration: none;
    padding: 10px;
  }

  .list>a>div>span {
    display: block;
    height: 50px;
    line-height: 50px;
    margin-left: 10px;
  }

  .list>a>div>p {
    display: block;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    color: #d1434a;
    font-size: 18px;
  }

  .jiaru {
    width: 70%;
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
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding-right: 70px;
    font-size: 17px;
  }

  .sortInfo>span {
    font-size: 14px;
  }

  .sortInfo a {
    text-decoration: none;
  }

  .productBox {
    background: #ffffff;
    border: 2px solid white;
    transition: all 0.5s ;
    transition-timing-function: ease-out;
  }
  /* 自己封装的特效（触摸到商品时 向上移动以及阴影以及border-color） */
  .productBox:hover {
    border-color: #ee7a23;
    transform: translateY(-5px);
    box-shadow: 0px 0px 5px 0px #888888;
  }

  h4 {
    color: rgb(168, 158, 158);
  }

  #row {
    margin-bottom: 25px;
  }

  .ani {
    height: 192px;
  }

  @media screen and (max-width: 768px) {
    .list>a>img {
      float: left;
      width: 110px;
      height: 110px;
      border: 1px solid #e9e9e9;
    }
    .box {
      padding: 0 0 0 125px;
    }
    .list>a>div>span {
      height: 50px;
      line-height: 50px;
      margin-left: 10px;
    }
    .list>a>div>p {
      display: block;
      height: 30px;
      line-height: 30px;
      color: #d1434a;
      font-size: 18px;
      margin: 0px;
      margin-left: 10px;
    }

    .jiaru {
      width: 85px;
      margin: 0px 20px;
      float: right;
      line-height: 30px;
      height: 30px;
    }
  }

</style>
