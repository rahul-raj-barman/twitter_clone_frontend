import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './pages/Register'
import Login from './pages/Login';
import Profile from './component/Profile';
import { Provider } from 'react-redux';
import { store } from './states/store';
import Sidebar from './component/Sidebar'
import Temp from './pages/Temp'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Homepage from './pages/Homepage';
import Singletweet from './pages/Singletweet';

const user = localStorage.getItem('loggedInUser')
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
  <BrowserRouter>
    
    <Sidebar/>
    
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/singletweet' element={<Singletweet/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
);
