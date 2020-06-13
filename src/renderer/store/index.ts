import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, RootState } from '../reducers'

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
  const middlewares: any[] = []
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
  return createStore(rootReducer, initialState, enhancer)
}

const store = configureStore()

if (typeof (module as any).hot !== 'undefined') {
  ;(module as any).hot.accept('../reducers', async () => {
    const reducers = await import('../reducers')
    store.replaceReducer(reducers.rootReducer as any)
  })
}

export default store
