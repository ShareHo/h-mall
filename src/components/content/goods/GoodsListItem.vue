<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" />
    <div class="item-info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      itemClick() {
        // 跳转至详情页
        console.log(this.$router);
        
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 48%;
    padding-bottom: 6px;
  }
  .goods-item img{
    width: 100%;
    height: 245px;
    border-radius: 6px;
  }
  .item-info{
    text-align: center;
    font-size: 12px;
  }
  .item-info .title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0 3px 0;
  }
  .item-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .item-info .cfav {
    position: relative;
  }

  .item-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>