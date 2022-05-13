import React, { createContext,useEffect,useContext,lazy,Suspense } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation,Navigate,Outlet } from 'react-router-dom';
import { auth } from "../Redux/Action/Auth";
import { CircularProgress } from "@mui/material";
const AccessDenied = lazy(() => import("../Component/AccessDenied"));
// eslint-disable-next-line

let AuthContext = createContext();

export const AuthProvider = (props) => {
    const dispatch = useDispatch();
    let value = useSelector((state) => state.auth);
    useEffect(() => {dispatch(auth())},[dispatch]);
    // console.dir(user.auth)
    let user = value.auth;
    if(!value.auth){
      return 
    }else{
      return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
    }
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export const AuthStatus = ({children}) => {
    let user = useAuth();
    if (!user.isAuth) {
      return <Suspense fallback={<div><CircularProgress thickness={5}/></div>}><AccessDenied/></Suspense>;
      // return <p>You are not logged in.</p>;
    }
    return children;
};
export const RequireAuth = () => {
    let user = useAuth();
    let location = useLocation();
    if (!user.isAuth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return <Outlet/>;
};

