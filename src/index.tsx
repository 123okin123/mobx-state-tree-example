import { connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './hooks/use-mst';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { rootStore } from './stores/root.store';

connectReduxDevtools(require('remotedev'), rootStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider value={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
