<template>
  <div class="goods">
    <template v-for="item in goods">
      <goods-list-item :goods-item="item"/>
    </template>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 5px;
  }
</style>