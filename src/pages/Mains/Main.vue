<template>
<div id="app">
  <transition :name="transitionName">
    <router-view>
    </router-view>
  </transition>
    <!-- 导航条 -->
    <tarbar-component class="TARBAR"></tarbar-component>
</div>
</template>

<script>
import TarbarComponent from './Tarbar/Tarbar.vue'
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  components: {
    TarbarComponent
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow:scroll;
  overflow-x: hidden;
}
// 消除滚动条
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.TARBAR {
  position: fixed;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
