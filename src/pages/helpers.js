import { groupBy, keys, maxBy, get } from 'lodash'

export const parseCommits = (commitsList) => {
  const commits = groupBy(commitsList, 'author.id')
  let result = []
  for (let authorId of keys(commits)) {
    result = [...result, {
      author: commits[authorId][0].author,
      count: commits[authorId].length
    }]
  }

  return result
}

export const getMaxCommits = (commits) => get(maxBy(commits, 'count'), 'count', 1)
