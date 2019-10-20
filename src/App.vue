<template>
  <div id="app" class="app-container">
    <top-nav></top-nav>
    <div class="app-body">
      <Search />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import topNav from './components/topNav.vue'

export default {
  components: {
    topNav,
    Search
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

.app-body {
  width: 50%;
  margin: auto;
}
</style>
