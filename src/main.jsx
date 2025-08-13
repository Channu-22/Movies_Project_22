// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './Router.jsx'
import {Provider} from "react-redux"
import Router from './Router'
import store from './store'


createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <Router/>
  </Provider>
)
