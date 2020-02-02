import { GlobalActions } from './actions'

const initialState = {
  sideBarActive: 'organizers',
  categories: []
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

    case GlobalActions.UPDATE_CATEGORIES: {
      return {
        ...state,
        categories: action.data
      }
    }

    default: {
      return state

    }
  }
}

export default globalReducer
