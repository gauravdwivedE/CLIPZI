import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  
    <>
    <GoogleOAuthProvider clientId="99676924849-ofl57cg0b91vn810epgkrfvmflihpon8.apps.googleusercontent.com">
      <BrowserRouter>
       <Toaster
        position="bottom-center"
        toastOptions={{
          success: {
            duration: 4000, // optional
          },
        }} />
        <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
  </Provider>
        </BrowserRouter>
        </GoogleOAuthProvider>
    </>

)
