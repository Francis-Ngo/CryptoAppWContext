import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(
  <React.StrictMode>
    <CryptoProvider>
    <App />
    </CryptoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);