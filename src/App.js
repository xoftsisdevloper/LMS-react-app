import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/Authcontext'; 
import Themeroutes from "./routes/Router";

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <div className="dark">{routing}</div>
    </AuthProvider>
  );
};

export default App;
