import _ from 'lodash'

const matchData = (range, bonusMatch) => {
  let arr = []
  let matchNumber = _.sum(range) + 1 + bonusMatch

  _.forEach(range, (index) => {
    if (index == 0) {
      arr.push({
        id: 1,
        name: 'Match ' + matchNumber,
        scheduled: 1499540400000 + (matchNumber * 3600 * 24) *1000,
        homeTeam: null,
        homeScore: null,
        visitorTeam: null,
        visitorScore: null
      })
    } else {
      const matchRange = _.range(0, index, 1)
      _.forEach(matchRange, (matchIndex) => {
        matchNumber = matchNumber - 1
        const matchId = matchIndex + index
        const root = arr[parseInt(matchId / 2) - 1]

        arr.push({
          id: matchId,
          name: 'Match ' + matchNumber,
          scheduled: 1499540400000 + (matchId * 3600 * 24) *1000,
          rootId: root.id,
          homeTeam: null,
          homeScore: null,
          visitorTeam: null,
          visitorScore: null
        })
      })
    }
  })

  if (bonusMatch != 0) {
    const index = _.last(range) + 4

    _.forEach(_.range(0, bonusMatch), (matchIndex) => {
      matchNumber = matchNumber - 1
      const matchId = matchIndex + index
      const root = arr[parseInt(matchId / 2) - 1]

      arr.push({
        id: matchId,
        name: 'Match ' + matchNumber,
        scheduled: 1499540400000 + (matchId * 3600 * 24) *1000,
        rootId: root.id,
        homeTeam: null,
        homeScore: null,
        visitorTeam: null,
        visitorScore: null
      })
    })
  }

  return arr
}

const bracket = (match, visitorSource = null, homeSource = null) => {
  const visitorDisplayName = visitorSource ? visitorSource.name : match.name
  const homeDisplayName = homeSource ? homeSource.name : match.name

  return {
    id: match.id,
    name: match.name,
    scheduled: match.scheduled,
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
    return currentNode.id == elem.rootId
  })

  if (child.length == 0) {
    return bracket(currentNode)
  }

  if (child.length == 1) {
    return bracket(currentNode, bracketTree(data, child[0]))
  }

  return bracket(currentNode, bracketTree(data, child[0]), bracketTree(data, child[1]))
}

const assignTeamToMatch = (teams, matches)  => {
  const match = _.reverse(matches)
  const matchTeam = _.chunk(teams, 2)

  _.forEach(matchTeam, ([homeTeam, visitorTeam], index) => {
    match[index].homeTeam = homeTeam ? homeTeam : null
    match[index].visitorTeam = visitorTeam ? visitorTeam : null
  })

  return _.reverse(match)
}

export const singleElimination = (teams) => {
  const matchTree = _.range(0, (teams.length / 2) + 1, 2)
  let bonusMatch = 0

  if (teams.length / 8 != 0) {
    bonusMatch = teams.length - 8
  }

  const data = assignTeamToMatch(teams, matchData(matchTree, bonusMatch))
  console.log(data)
  return bracketTree(data, data[0])
}
