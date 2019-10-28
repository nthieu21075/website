import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const middleware = [ thunk ]
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer, compose(applyMiddleware(...middleware), reduxDevTools))
export let persistor = persistStore(store)