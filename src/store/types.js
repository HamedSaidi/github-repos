const commitTypes = {
  GET_REPOS: 'GET_REPOS',
  GET_REPOS_SUCCEEDED: 'GET_REPOS_SUCCEEDED',
  GET_REPOS_FAILED: 'GET_REPOS_FAILED',
  GET_REPO_COMMITS: 'GET_REPO_COMMITS',
  GET_REPO_COMMITS_SUCCEEDED: 'GET_REPO_COMMITS_SUCCEEDED',
  GET_REPO_COMMITS_FAILED: 'GET_REPO_COMMITS_FAILED',
  GET_REPO_DETAILS: 'GET_REPO_DETAILS',
  GET_REPO_DETAILS_SUCCEEDED: 'GET_REPO_DETAILS_SUCCEEDED',
  GET_REPO_DETAILS_FAILED: 'GET_REPO_DETAILS_FAILED',
  GET_CONTRIBUTORS: 'GET_CONTRIBUTORS',
  GET_CONTRIBUTORS_SUCCEEDED: 'GET_CONTRIBUTORS_SUCCEEDED',
  GET_CONTRIBUTORS_FAILED: 'GET_CONTRIBUTORS_FAILED',
  CLEAR_REPO_DETAILS: 'CLEAR_REPO_DETAILS',
  SET_LOADING: 'SET_LOADING'
}

const actionTypes = {
  setLoading: 'setLoading',
  getRepos: 'getRepos',
  getRepoCommits: 'getRepoCommits',
  clearRepoDetailsState: 'clearRepoDetailsState',
  getRepoDetails: 'getRepoDetails',
  getContributors: 'getContributors',
  initSearchPage: 'initSearchPage'
}

export {
  commitTypes,
  actionTypes
}
