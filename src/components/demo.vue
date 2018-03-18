<template>
  <div>
    <div class="box">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
  .box {
    width: 200px;
    height: 200px;
    background: white;
    margin: 80px ;
    border: 1px solid white;
    transition: transform  1s ,box-shadow 1s,border-color 1s;
    transition-timing-function: ease-out; 
  }
  .box:hover{
    border-color:#ee7a23;
    transform: translateY(-10px);
    box-shadow: 0px 0px 5px 2px #888888;
  }
</style>
