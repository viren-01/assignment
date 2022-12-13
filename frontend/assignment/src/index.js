import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewUsers from './components/viewUser/viewUser';
import AddUser from './components/addUser/addUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<App/>} />
      <Route exact path='/viewAll' element={<ViewUsers/>} />
      <Route exact path='/createUser' element={<AddUser/>} />
    </Routes>
  </BrowserRouter>
);
