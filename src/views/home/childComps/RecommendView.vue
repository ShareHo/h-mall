<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    width: 25%;
    text-align: center;
    font-size: 14px;
  }
  .recommend-item img{
    width: 80%;
    margin-top: 5px;
    margin-bottom: 6px;
  }
</style>