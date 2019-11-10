import { singleElimination } from 'helpers/bracket'
// const teams = (number) => _.shuffle(_.map(_.range(0, number, 1), (index) => ({
//     id: index + 1,
//     name: 'Team ' + (index + 1)
//   }
// )))

export const singleEliminationData = (table) => {
  const teams = _.map(table.teams, (team) => ({
    id: team.tournamentTeamId,
    name: team.info.name
  }))

  return singleElimination(teams)
}