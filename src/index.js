import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import App from "./App";
import Loader from "./layouts/loader/Loader";
import { AuthContextProvider } from "./contexts/Authcontext";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </Suspense>
);