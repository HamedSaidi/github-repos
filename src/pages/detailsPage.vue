<template>
  <div class="card-details">
    <fake-item v-if="loading" />
    <ul v-else>
      <li class="key-value">
        <span class="key">Repository name:</span>
        <a :href="repo.html_url" target="_blank" class="value">{{repo.name}}</a>
      </li>
      <li class="key-value  bottom-line">
        <span class="key">Repository statistics:</span>
        <span class="value">
          <ul class="second-level">
            <li class="key-value">
              <span class="key">Stargazers count:</span><span class="value">{{repo.stargazers_count}}</span>
            </li>
            <li class="key-value">
              <span class="key">Watchers count:</span><span class="value">{{repo.watchers_count}}</span>
            </li>
            <li class="key-value">
              <span class="key">Forks count:</span><span class="value">{{repo.forks_count}}</span>
            </li>
            <li class="key-value">
              <span class="key">Number of issues:</span><span class="value">{{repo.open_issues_count}}</span>
            </li>
          </ul>
        </span>
      </li>
      <li v-if="showContributorsAndCommits" class="key-value bottom-line">
        <span class="section-title">List of contributors:</span>
        <div v-if="contributors.length"  class="contributors">
          <div v-for="contributor in contributors" v-bind:key="contributor.id" class="contributor">
            <a :href="contributor.html_url" target="_blank" class="value">
              <img :src="contributor.avatar_url" class="avatar" />{{contributor.login}}
            </a>
          </div>
        </div>
        <span class="value" v-else>
          No contributors found
        </span>

      </li>
      <li v-if="showContributorsAndCommits" class="key-value">
        <span class="section-title">List of commits in the past 7 days:</span>
        <div v-if="commits.length" class="commits">
          <div v-for="commit in commits" v-bind:key="commit.author.id" class="commit">
            <a :href="commit.author.html_url" class="key">
              <img :src="commit.author.avatar_url" class="avatar" />
              {{commit.author.login}}
            </a>
            <a class="bar" :style="{width: `calc((100% - 300px) * ${commit.count  / maxCommits})`}">{{commit.count}}</a>
          </div>
        </div>
        <span class="value" v-else>
          No commits in the past 7 days
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { actionTypes } from '../store'
import { parseCommits, getMaxCommits } from './helpers'
import { fakeItem } from '../components'

export default {
  name: 'detailsPage',
  components: {
    fakeItem
  },
  created () {
    this.$store.dispatch(actionTypes.getRepoDetails, this.$router.currentRoute.params)
  },
  data () {
    return {
      maxCommits: 1
    }
  },
  computed: {
    showContributorsAndCommits () {
      return this.$store.getters.showContributorsAndCommits
    },
    loading () {
      return this.$store.getters.loading
    },
    repo () {
      return this.$store.getters.repoDetails
    },
    commits () {
      return parseCommits(this.$store.getters.commits)
    },
    contributors () {
      return this.$store.getters.contributors
    }
  },
  watch: {
    commits () {
      this.maxCommits = getMaxCommits(this.commits)
    }
  },
  destroyed () {
    this.$store.dispatch(actionTypes.clearRepoDetailsState)
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
  list-style-position: outside;
  list-style-image: none;
  font-size: 18px;
}

.bottom-line {
  border-bottom: 1px solid black;
}

.second-level {
  padding-left: 30px;
}

.contributors {
  display: flex;
  flex-wrap: wrap;
}

.contributor {
  min-height: 40px;
  margin: 10px;
  width: 250px;
}

.commits {
  display: flex;
  flex-direction: column;
}

.commit {
  display: flex;
  align-items: center;
}

.bar {
  height: 20px;
  background-color: #51b8c4;
  text-align: center;
  color: white;
}

.section-title {
  margin: 15px 0;
  display: inline-block;
  font-size: 20px;
}

.key-value {
  min-height: 34px;
  display: block;
  font-weight: 600;
  color: #24292e;
}

.key {
  display: inline-block;
  width: 300px !important;
}

.avatar {
  display: inline-block;
  overflow: hidden;
  line-height: 1;
  margin-right: 12px;
  vertical-align: middle;
  border-radius: 3px;
  height: 28px;
  width: 28px;
}

.card-details {
  margin-bottom: 180px;
  box-shadow: 0 1px 7px 0 #c0c0c0;
  border: 2px solid;
  padding: 20px;
}
</style>
