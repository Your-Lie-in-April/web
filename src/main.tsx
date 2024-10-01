import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { store } from '@redux/config/store.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

console.log(
    `%c
    _____              __  __ U _____ u ____          U _____ u  ____U _____ u 
   |_ " _|    ___    U|' \\/ '|\\| ___"|U|  _"\\ u ___   \\| ___"|U /"___\\| ___"|/ 
     | |     |_"_|   \\| |\\/| |/|  _|" \\| |_) |/|_"_|   |  _|" \\| | u  |  _|"   
    /| |\\     | |     | |  | | | |___  |  __/   | |    | |___  | |/__ | |___   
   u |_|U   U/| |\\u   |_|  |_| |_____| |_|    U/| |\\u  |_____|  \\____||_____|  
   _// \\\\.-,_|___|_,-<<,-,,-.  <<   >> ||>>.-,_|___|_,-<<   >> _// \\\\ <<   >>  
  (__) (__\\_)-' '-(_/ (./  \\.)(__) (__(__)__\\_)-' '-(_(__) (__(__)(__(__) (__) 
  `,
    'color:#633AE2'
);
