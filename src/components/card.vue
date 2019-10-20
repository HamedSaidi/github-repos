<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{repo.name}}
      </p>
      <span class="card-header-icon">{{repo.language}}</span>
    </header>
    <div class="card-content">
      <div class="content">
        {{repo.description | reduceDescription}}
      </div>
    </div>
    <footer class="card-footer">
      <span class="card-footer-item"><i class="fa fa-star" aria-hidden="true"></i> {{repo.watchers_count | normalizeSize}}</span>
      <span class="card-footer-item"><i class="fa fa-clock-o" aria-hidden="true"></i>Created at: {{repo.created_at | normalizeDate }}</span>
      <router-link :to="{ name: 'details', params: { owner: repo.owner.login, repo: repo.name } }" class="card-footer-item"><i class="fa fa-link" aria-hidden="true"></i>View it</router-link>
    </footer>
  </div>
</template>
<script>
import * as moment from 'moment'
import { truncate } from 'lodash'

export default {
  name: 'detailsPage',
  props: ['repo'],
  filters: {
    reduceDescription: function (value) {
      return truncate(value, {length: 100, separator: ' ', omission: '...'})
    },
    normalizeSize: function (value) {
      if (!value) return '0'
      value = parseInt(value, 10)
      if (value < 1000) return value.toString()
      if (value >= 1000 && value < 1000000) return value.toString().substring(0, 3) + 'K'
      return value.toString().substring(0, 3) + 'M'
    },
    normalizeDate: function (value) {
      return value ? moment(value).format('MMMM Do, YYYY') : ''
    }
  }
}
</script>
<style scoped>
.card {
  margin-bottom: 20px;
  width: 100%;
  margin: 12px auto;
}

.card:hover {
  box-shadow: 0 1px 7px 0 #c0c0c0;
}

.fa:before {
  padding: 10px;
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
    margin: auto;
  }
}
</style>
