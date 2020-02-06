import _ from 'lodash'

const bracket = (match, visitorSource = null, homeSource = null) => {
    const visitorDisplayName = visitorSource ? visitorSource.name : match.name
    const homeDisplayName = homeSource ? homeSource.name : match.name

    return {
        matchData: match,
        id: match.id,
        name: match.name,
        scheduled: parseInt(match.scheduled),
        sides: {
            visitor: {
                score: { 'score': match.visitorScore },
                team: match.visitorTeam,
                seed: {
                    score: match.homeScore,
                    sourceGame: visitorSource,
                    rank: 1,
                    displayName: 'Winner of ' + visitorDisplayName
                }
            },
            home: {
                score: { 'score': match.homeScore },
                team: match.homeTeam,
                seed: {
                    score: match.homeScore,
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

export const singleElimination = (data) => {
    if (data.length == 0){
        return []
    }

    return bracketTree(data, data[0])
}

// const assignToGames = (players) => {
//     // Round the number of players up to nearest multiple of 2.
//     // The potential extra player is a dummy, and the games they play
//     //   will not be included.
//     const numPlayers = players.length + players.length % 2, // potential dummy added
//         pairsPerRound = players.length % 2 == 0 ? numPlayers / 2 : (numPlayers -1) /2,
//         rotatingPlayers = numPlayers - 1,
//         firstRound = players.length % 2, // will make the dummy game being ignored
//         games = [];

//     for (let round = 0; round < rotatingPlayers; round++) {
//         for (let i = firstRound; i < pairsPerRound - 1; i += 2) {
//             // The following formulas reflect a roundrobin scheme, where
//             //   the last player (possibly a dummy) does not move.
//             games.push([
//                 players[i ? (i + round - 1) % rotatingPlayers : numPlayers - 1],
//                 players[(numPlayers - i - 2 + round) % rotatingPlayers],
//                 players[(i + round) % rotatingPlayers],
//                 players[(numPlayers - i - 3 + round) % rotatingPlayers],
//             ])
//         }
//     }

//     return games
// }

// // Optional function to test the correctness of the result,
// //    and count the number of games per player:
// const getStatistics = (players, games) => {
//     const usedPairs = new Set(),
//         stats = Object.assign(...players.map(player => ({
//             [player]: 0 })));
//     for (let game of games) {
//         // verify uniqueness of pairs
//         for (let pairIndex = 0; pairIndex < 4; pairIndex += 2) {
//             let pair = JSON.stringify(game.slice(pairIndex, pairIndex + 2).sort());
//             if (usedPairs.has(pair)) throw "Duplicate pair " + pair;
//             usedPairs.add(pair);
//         }
//     }
//     // Count the number of games each player plays:
//     for (let i = 0; i < games.length; i++) {
//         for (let j = 0; j < 4; j++) {
//             stats[games[i][j]]++;
//         }
//     }
//     return stats;
// }

// const players = _.map(_.range(0, 11, 1), (index) => ('Team ' + (index + 1)))

// export const roundRobinGames = assignToGames(players)

// console.log(roundRobinGames)
// console.log("--- statistics ---");
// console.log('#games: ', roundRobinGames.length);
// const stats = getStatistics(players, roundRobinGames);
// console.log(stats);