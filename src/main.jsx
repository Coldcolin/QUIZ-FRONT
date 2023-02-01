// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './Components/App'
// import './Styles/index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './components/App';


/** Redux Store */
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);