<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" @load="loaded" />
    </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      loaded() {
        if(!this.isLoad){
          this.$emit('loaded')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .feature img {
    width: 100%;
  }
</style>
