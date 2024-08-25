import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer.js'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
