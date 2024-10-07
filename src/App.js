import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThemeRoutes from './routes/Router'; // Import your theme routes
import Login from './views/ui/Login'; // Import the login page
import Loader from './layouts/loader/Loader';

const App = () => {
  const isAdmin = true;

  return (
      <Suspense fallback={<Loader />}>
        <Routes>
          {isAdmin ? (
            <Route path="/*" element={<ThemeRoutes />} />
          ) : (
            <Route path="/*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
  );
};

export default App;
