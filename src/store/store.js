import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as moment from 'moment'
import { commitTypes, actionTypes } from './types'

Vue.use(Vuex)

const emptyRepositoryData = {
  details: {},
  commits: [],
  commitsLoaded: false,
  contributorsLoaded: false,
  contributors: []
}

export default new Vuex.Store({
  state: {
    repositories: [],
    repoDetails: {...emptyRepositoryData},
    contributors: [],
    loading: false
  },
  mutations: {
    [commitTypes.GET_REPOS]: async function (state, query = '') {
      state.repositories = []
    },
    [commitTypes.GET_REPOS_SUCCEEDED]: function (state, items) {
      state.repositories = items
    },
    [commitTypes.GET_REPOS_FAILED]: function (state) {
      state.repositories = []
    },
    [commitTypes.GET_REPO_COMMITS]: function (state, url) {
      state.repoDetails.commitsLoaded = false
    },
    [commitTypes.GET_REPO_COMMITS_SUCCEEDED]: function (state, data) {
      state.repoDetails.commits = data
      state.repoDetails.commitsLoaded = true
    },
    [commitTypes.GET_REPO_COMMITS_FAILED]: function (state) {
      // do something...
      state.repoDetails.commitsLoaded = false
    },
    [commitTypes.GET_REPO_DETAILS]: function (state, params) {
      state.loading = true
    },
    [commitTypes.GET_REPO_DETAILS_SUCCEEDED]: function (state, details) {
      state.repoDetails.details = details
    },
    [commitTypes.GET_REPO_DETAILS_FAILED]: function (state, details) {
      state.repoDetails = {...emptyRepositoryData}
    },
    [commitTypes.GET_CONTRIBUTORS]: function (state, url) {
      state.repoDetails.contributorsLoaded = false
    },
    [commitTypes.GET_CONTRIBUTORS_SUCCEEDED]: function (state, data) {
      state.repoDetails.contributors = data
      state.repoDetails.contributorsLoaded = true
    },
    [commitTypes.GET_CONTRIBUTORS_FAILED]: function (state) {
      state.repoDetails.contributorsLoaded = false
    },
    [commitTypes.CLEAR_REPO_DETAILS]: function (state) {
      state.repoDetails = {...emptyRepositoryData}
    },
    [commitTypes.SET_LOADING]: function (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    [actionTypes.setLoading]: function ({commit}, loading) {
      commit(commitTypes.SET_LOADING, loading)
    },
    [actionTypes.getRepos]: async function ({commit}, query) {
      commit(commitTypes.GET_REPOS)
      commit(commitTypes.SET_LOADING, true)
      if (query) {
        try {
          const {data: { items = [] }} = await axios({
            method: 'get',
            url: `https://api.github.com/search/repositories?q="${query}"`
          })
          commit(commitTypes.GET_REPOS_SUCCEEDED, items)
        } catch (err) {
          console.error('Error search query failed: ', err)
          commit(commitTypes.GET_REPOS_FAILED)
        }
      }
      commit(commitTypes.SET_LOADING, false)
    },
    [actionTypes.clearRepoDetailsState]: function ({commit}, loading) {
      commit(commitTypes.CLEAR_REPO_DETAILS)
    },
    [actionTypes.getRepoDetails]: async function ({commit, dispatch}, params) {
      commit(commitTypes.GET_REPO_DETAILS)
      try {
        const url = `https://api.github.com/repos/${params.owner}/${params.repo}`
        const { data } = await axios({ method: 'get', url })

        commit(commitTypes.GET_REPO_DETAILS_SUCCEEDED, data)
        dispatch(actionTypes.getRepoCommits, url)
        dispatch(actionTypes.getContributors, data.contributors_url)
      } catch (err) {
        console.error('Error getting reopo details: ', err)
        commit(commitTypes.GET_REPO_DETAILS_FAILED)
      }
      dispatch(actionTypes.setLoading, false)
    },
    [actionTypes.getRepoCommits]: async function ({commit}, url) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${url}/commits?since=${moment().subtract(7, 'days').format('YYYY-MM-DDTHH:MM:SSZ')}`
        })
        commit(commitTypes.GET_REPO_COMMITS_SUCCEEDED, data)
      } catch (err) {
        console.error('Error getting reopo commits: ', err)
        commit(commitTypes.GET_REPO_COMMITS_FAILED)
      }
    },
    [actionTypes.getContributors]: async function ({commit}, url) {
      commit(commitTypes.GET_CONTRIBUTORS)
      try {
        const { data } = await axios({
          method: 'get',
          url: url
        })
        commit(commitTypes.GET_CONTRIBUTORS_SUCCEEDED, data)
      } catch (err) {
        console.error('Error getting reopo contributors: ', err)
        commit(commitTypes.GET_CONTRIBUTORS_FAILED)
      }
    }
  },
  getters: {
    loading: (state) => state.loading,
    repos: (state) => state.repositories,
    commits: (state) => state.repoDetails.commits,
    contributors: (state) => state.repoDetails.contributors,
    showContributorsAndCommits: (state) => state.repoDetails.contributorsLoaded && state.repoDetails.commitsLoaded,
    repoDetails: (state) => state.repoDetails.details
  }
})
