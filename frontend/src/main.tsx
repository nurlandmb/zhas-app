import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from 'app/App.tsx';
import {BrowserRouter} from 'react-router-dom';
import 'shared/config/i18n'
import { StoreProvider } from 'app/providers/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </StoreProvider>
  </React.StrictMode>,
)
