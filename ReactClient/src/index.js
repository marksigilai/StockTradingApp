import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';
import App from './App';

import { BrowserRouter} from 'react-router-dom';
//import {Protectedroute} from './components/protected.route/protected.route'


axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.headers.common = {'Authorization' : 'Bearer ' + localStorage.getItem("token")};

ReactDOM.render(

  <BrowserRouter>

    <App/>      

  </BrowserRouter>,

  document.getElementById('root')
);
