import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppContextProvider from './components/AppContextProvider/AppContextProvider';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);