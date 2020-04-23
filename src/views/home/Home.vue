<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control 
      class="tab-control"
      v-show="isTabfixed"
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl1" />

    <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" 
      :pull-up-load="true" 
      @pullingUp="loadMore">
      <home-swiper @loaded.once="getTabControlOffsetTop" :banner="banner"/>

      <recommend-view @loaded.once="getTabControlOffsetTop" :recommend="recommend"/>

      <feature-view @loaded.once="getTabControlOffsetTop" />

      <tab-control
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick" 
        ref="tabControl2" />
      
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultiData, getHomeGoods } from 'network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabfixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 获取首页推荐、轮播图数据
      this.getHomeMultiData()
      // 获取商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$nextTick(() => {
        this.$refs.scroll.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
      })
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods: {
      /**
       * 网络请求
       */
        // 获取首页推荐、轮播图数据函数封装
        getHomeMultiData() {
          getHomeMultiData().then(res => {
            // console.log(res)
            this.banner = res.data.banner.list
            this.recommend = res.data.recommend.list
          })
        },
        // 获取商品数据函数封装
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          return getHomeGoods(type,page).then(res => {
            // console.log(res)
            this.goods[type].page += 1
            this.goods[type].list = this.goods[type].list.concat(res.data.list)
          })
        },

      /**
       * 事件监听
       */
        // 切换数据类别
        tabClick(index) {
          this.currentType = Object.keys(this.goods)[index]
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index
        },
        // 回到顶部
        backClick() {
          this.$refs.scroll.scrollTo(0,0,500)
        },
        // 监听内容滚动
        contentScroll(position) {
          this.isShowBackTop = -(position.y) > 800
          
          this.isTabfixed = -(position.y) > this.tabOffsetTop
        },
        // 监听上拉操作
        loadMore() {
          this.getHomeGoods(this.currentType).then(() => {
            this.$refs.scroll.finishPullUp()
          })
        },
        // 获取tabControl高度位移
        getTabControlOffsetTop() {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        }
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99; */
  }

  .tab-control{
    position: relative;
    z-index: 99;
  }
</style>
