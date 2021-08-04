import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export { default as Home } from './components/Home';
export { default as Login } from './components/Login';
export { default as Register } from './components/Register';
export { default as MessagePopup } from './components/MessagePopup';
export { default as UserContext } from './context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);