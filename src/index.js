import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="238703109035-ap5gbm9cik3ru35n6d8o7impcplc9dok.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
)
