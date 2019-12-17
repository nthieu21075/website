import { PendingRequestActions } from './actions'

const initialState = {
  loading: true,
  data: []
}

const pendingRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PendingRequestActions.UPDATE_DATA: {
      return {
        ...state,
        loading: false,
        data: action.data
      }
    }

    case PendingRequestActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default pendingRequestReducer
