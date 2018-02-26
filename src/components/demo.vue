<template>
  <div>
      <h2>{{msg}}</h2>
      {{count}}
      {{demo}}
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import { mapState } from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 2,
    demo: "hello"
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
export default {
  store,
  data() {
    return {
      msg: "hello"
    };
  },
  computed: mapState(["count", "demo"])
};
</script>

<style>
/* //   computed: {
//     ...mapState(["count", "demo"])
//   } */
</style>
