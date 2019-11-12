import { TournamentActions } from './actions'
import _ from 'lodash'

const initialState = {
  isLoading: true,
  basicInformation: {},
  teamManagement: {
    teams: [],
    tables: [],
    availableTeam: [],
    schedules: []
  },
  listTournament: {
    loading: true,
    data: []
  }
}

const tournamentReducer = (state = initialState, action) => {

  switch (action.type) {
    case TournamentActions.UPDATE_LIST_TOURNAMENT: {
      return {
        ...state,
        listTournament: {
          loading: false,
          data: action.data
        }
      }
    }

    case TournamentActions.UPDATE_SCHEDULE: {
      return {
        ...state,
        loading: false,
        teamManagement: {
          teams: state.teamManagement.teams,
          tables: state.teamManagement.tables,
          availableTeam: state.teamManagement.availableTeam,
          schedules: action.data
        }
      }
    }

    case TournamentActions.UPDATE_BASIC_INFORMATION: {
      return {
        ...state,
        isLoading: false,
        basicInformation: action.data
      }
    }

    case TournamentActions.UPDATE_TEAM_MANAGEMENT: {
      return {
        ...state,
        isLoading: false,
        teamManagement: {
          teams: action.data.teams,
          tables: action.data.tables,
          availableTeam: state.teamManagement.availableTeam,
          schedules: state.teamManagement.schedules
        }
      }
    }

    case TournamentActions.UPDATE_AVAILABLE_TEAM: {
      return {
        ...state,
        isLoading: false,
        teamManagement: {
          teams: state.teamManagement.teams,
          tables: state.teamManagement.tables,
          availableTeam: action.data,
          schedules: state.teamManagement.schedules
        }
      }
    }

    case TournamentActions.ADD_AVAILABLE_TEAM: {
      return {
        ...state,
        isLoading: false,
        teamManagement: {
          teams: _.concat(state.teamManagement.teams, action.data),
          tables: state.teamManagement.tables,
          availableTeam: state.teamManagement.availableTeam,
          schedules: state.teamManagement.schedules
        }
      }
    }

    case TournamentActions.REMOVE_TOURNAMENT_TEAM: {
      const newTeams = _.dropWhile(state.teamManagement.teams, (team) => {
        return _.includes(action.data, team.tournamentTeamId)
      })

      return {
        ...state,
        isLoading: false,
        teamManagement: {
          teams: newTeams,
          tables: state.teamManagement.tables,
          availableTeam: state.teamManagement.availableTeam,
          schedules: state.teamManagement.schedules
        }
      }
    }

    case TournamentActions.UPDATE_TOURNAMENT_TABLE: {
      return {
        ...state,
        teamManagement: {
          teams: state.teamManagement.teams,
          tables: action.data,
          availableTeam: state.teamManagement.availableTeam,
          schedules: state.teamManagement.schedules
        }
      }
    }

    case TournamentActions.UPDATE_LOADINNG: {
      return {
        ...state,
        isLoading: true
      }
    }

    case TournamentActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default tournamentReducer
