<template>
  <div>
    详情页
  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        id: ''
      }
    },
    created() {
      this.id = this.$route.params.id
    }
  }
</script>

<style scoped>

</style>