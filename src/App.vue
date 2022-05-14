<script>
import Login from './views/Login.vue';
import Home from './views/Home.vue';

export default {
  name: "App",
  data () {
    return {
    }
  },
  components: {
    Login,
    Home
},
  method: {

  }
};
  
</script>

<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath">
      </router-view>
    </keep-alive> -->

    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive" :key="$route.fullPath">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath">
    </router-view>
  </div>
</template>

<style scoped>
</style>
