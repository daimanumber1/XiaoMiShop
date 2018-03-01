<template>
  <div id="App">
    <router-view/>
  </div>
</template>

<script>
// 图标
import "./assets/css/iconfont.js";

export default {
  name: "App",
  components: {},
  methods: {},
  data() {
    return {};
  }
};
</script>

<style>
/* 图标 */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
body {
  background: #f5f5f5;
}

html,
body {
  overflow: hidden;
  overflow-y: auto;
}
</style>
