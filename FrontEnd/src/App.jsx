import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import NotePage from './pages/NotePage';
import UpdateNote from './pages/UpdateNote';


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute />}>
      <Route path='/home' element={<Home />}/>
      </Route>
      <Route path='/' element={<SignIn />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/note/:noteTitle' element={<NotePage />}/>
      <Route path="/updatenote/:noteId" element={<UpdateNote />} />
    </Routes>
    </BrowserRouter>

  )
}

