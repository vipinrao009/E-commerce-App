import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './Context/auth';
import 'antd/dist/reset.css';
import { SearchProvider } from './Context/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);

