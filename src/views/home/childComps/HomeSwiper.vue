<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" style="width:100%;" @load="loaded" />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: "homeSwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 轮播图参数配置
      swiperOption: {
        autoplay: {
          disableOnInteraction: false, // 用户操作之后重启autoplay
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
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

</style>