<template>
  <div class="search-container" >
    <input class="form-control"
       v-model="query"
       placeholder="search...">
  </div>
</template>
<script>
import { debounce, get } from 'lodash'
import { actionTypes } from '../store'

export default {
  name: 'Search',
  data () {
    return ({query: ''})
  },
  methods: {
    getRepos: debounce(function (query) {
      if (this.getQueryFromUrl() !== query) {
        this.$router.push(`/?q=${query}`)
      }
      this.$store.dispatch(actionTypes.getRepos, query)
    }, 1000),
    getQueryFromUrl () {
      return get(this, '$router.currentRoute.query.q', '')
    }
  },
  mounted () {
    this.query = this.getQueryFromUrl()
    this.getRepos(this.query)
  },
  watch: {
    query (query) {
      if (this.$router.currentRoute.name !== 'search') {
        this.$router.push(`/?q=${query}`)
      }
      this.$store.dispatch(actionTypes.setLoading, true)
      this.getRepos(query)
    }
  }
}
</script>
<style>
.search-container {
  display: block;
  height: 80px;
  text-align: center;
}

input {
  width: 100%;
  height: 58px;
  padding: 8px;
  font-size: 18px;
  box-sizing: border-box;
  border: 2px solid #d7d7d7;
  color: #666;
  border-radius: 0;
  margin-top: 7px;
}
</style>
