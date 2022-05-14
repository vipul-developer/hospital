import React, { useLayoutEffect } from 'react';
import { Routes,Route,useLocation } from "react-router-dom";
import Protected from './Protected';
import Public from './Layout/Public';
import User from "./Layout/User";
import AccessDenied from "./Component/AccessDenied";
import Home from "./Component/Home";
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
const App = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  },[location.pathname])
  return (
    <Routes>
        <Route path={"/"} element={ <Public/>}>
          <Route index element={<Home/>}/>
          <Route path={"/login"} element={<Login/>} />
        </Route>
        <Route path={"/dashboard"} element={<User/>}>
          <Route index element={<Protected ComposedClass={Dashboard} reload={true} adminRoute={false}/>}/>
        </Route>
        <Route path={"*"} element={<AccessDenied/>}/>
    </Routes>
  );
};

export default App;