import React, { useLayoutEffect } from 'react';
import { Routes,Route,useLocation } from "react-router-dom";
import { RequireAuth } from "./Protected";
import Public from './Layout/Public';
import User from "./Layout/User";
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
const App = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  },[location.pathname])
  return (
    <Routes>
        <Route element={ <Public/>}>
          <Route path={"/"} element={<Login/>} />
          <Route element={<User/>}>
            <Route path={"/dashboard"} element={ <RequireAuth><Dashboard/></RequireAuth> }/>
          </Route>
        </Route>
    </Routes>
  );
};

export default App;