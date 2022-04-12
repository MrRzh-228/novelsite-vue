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
    <router-view :key="$route.fullPath">
    </router-view>
  </div>
</template>

<style scoped>

</style>
