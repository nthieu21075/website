import { GlobalActions } from './actions'

const initialState = {
  sideBarActive: 'invitedMatch',
}

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GlobalActions.UPDATE_SIDEBAR_ACTIVE: {
      return {
        ...state,
        sideBarActive: action.data
      }
    }

    case GlobalActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state

    }
  }
}

export default globalReducer
