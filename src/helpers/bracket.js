import _ from 'lodash'

const bracket = (match, visitorSource = null, homeSource = null) => {
  const visitorDisplayName = visitorSource ? visitorSource.name : match.name
  const homeDisplayName = homeSource ? homeSource.name : match.name

  return {
    id: match.id,
    name: match.name,
    scheduled: parseInt(match.scheduled),
    sides: {
      visitor: {
        score: match.visitorScore,
        team: match.visitorTeam,
        seed: {
          sourceGame: visitorSource,
          rank: 1,
          displayName: 'Winner of ' + visitorDisplayName
        }
      },
      home: {
        score: match.homeScore,
        team: match.homeTeam,
        seed: {
          sourceGame: homeSource,
          rank: 1,
          displayName: 'Winner of ' + homeDisplayName
        }
      }
    }
  }
}

const bracketTree = (data, currentNode) => {
  const child = _.filter(data, (elem) => {
    return currentNode.index == elem.rootIndex
  })

  if (child.length == 0) {
    return bracket(currentNode)
  }

  if (child.length == 1) {
    return bracket(currentNode, bracketTree(data, child[0]))
  }

  return bracket(currentNode, bracketTree(data, child[0]), bracketTree(data, child[1]))
}

export const singleElimination = (data) => bracketTree(data, data[0])
