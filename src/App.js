import React from 'react';
import { useAuthcontext } from './contexts/Authcontext';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Login from './login/Login'
import SignUp from './signup/SignUp';
import FullLayout from './layouts/FullLayout';


const App = () => {
  const {authUser, setAuthUser} = useAuthcontext()
  return (
    <>
    <Routes>
      <Route path='/' element={authUser ? <FullLayout/> : <Navigate to='/login'/>}/>
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp/>}/>
    </Routes>
    <Toaster />
    </>
  );
};

export default App;
