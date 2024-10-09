import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThemeRoutes from './routes/Router'; // Import your theme routes
import Login from './login/Login';
import SignUp from './signup/SignUp';
import Loader from './layouts/loader/Loader';
import { Toaster } from 'react-hot-toast';
import { useAuthcontext } from './contexts/Authcontext';
import FullLayout from './layouts/FullLayout';
import Starter from './views/Starter';
import Groups from './components/groups/Groups';

const App = () => {
  const { authUser } = useAuthcontext(); // Get the current user from Authcontext
  console.log(authUser ? 0 : 1);

  return (
    <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={authUser ? <FullLayout/> : <Navigate to="/login" /> }>
            <Route path="/" element={<Navigate to="/starter" />} />
            <Route path='/starter' element={<Starter/>} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route path='/login' element={authUser ? <Navigate to="/"/> :<Login/>}/>
          <Route path='/signup' element={authUser ? <Navigate to="/"/> :<SignUp/>}/>
          <Route path='*' element={authUser ? <Navigate to="/"/> :<Navigate to="/login" />}/>
        </Routes>
        <Toaster />
    </Suspense>
  );
};

export default App;
