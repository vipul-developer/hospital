import React, { useLayoutEffect } from 'react';
import { Routes,Route,useLocation } from "react-router-dom";
import Protected from './Protected';
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
          <Route path={"/dashboard"} element={<Protected ComposedClass={Dashboard} reload={true} adminRoute={false}/>}/>
        </Route>
    </Routes>
  );
};

export default App;