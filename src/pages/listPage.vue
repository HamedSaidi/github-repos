<template>
  <div class="wrap" ref="scrollContainer">
    <div class="repos" v-if="repos.length && !loading">
        <card v-for="(repo, index) in repos" :key="index" :repo="repo" />
    </div>
    <div class="no-results" v-if="repos.length === 0 && !loading">
        No Repositories!.. Please enter a new search query!
    </div>
    <div v-if="loading">
      <fake-item v-for="i in 4" :key="i"></fake-item>
    </div>
  </div>
</template>
<script>
import { card, fakeItem } from '../components'

export default {
  name: 'listPage',
  components: {
    card, fakeItem
  },
  computed: {
    repos () {
      return this.$store.getters.repos
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style scoped>
  .no-results {
    width: 100%;
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    .wrap {
      left: 0;
      padding-left: 0;
      top: 250px;
    }
  }
</style>
