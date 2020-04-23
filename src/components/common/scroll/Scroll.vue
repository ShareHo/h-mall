<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0 // 0不监听滚动、1非实时监听、2实时监听(不包括惯性动画)、3包括惯性动画
    },
    pullUpLoad: {
      type: [Object, Boolean],
      default: false // 监听上拉事件
    }
  },
  mounted() {

    this.$nextTick(() => {
      const wrapper = this.$refs.wrapper;
      this.scroll = new BScroll(wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        // tap: "tap"
      })

      if(this.probeType !== 1){
        this.scroll.on("scroll", position => {
          this.$emit('scroll',position)
        })
      }
      
      if(this.pullUpLoad){
        this.scroll.on("pullingUp", () => {
          this.$emit('pullingUp')
        })
      }
    })
  },
  // 数据发生改变时引起重新渲染
  updated() {
    this.scroll.refresh();
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>