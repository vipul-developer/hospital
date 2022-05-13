import React, { createContext,useEffect,useContext } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation,Navigate,Outlet } from 'react-router-dom';
import { auth } from "../Redux/Action/Auth";
let AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let user = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth());
    },[dispatch]);
    // let user = userAuth ? userAuth : null;
    // if(user){
    //     return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
    // }
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
    let auth = useAuth();
    let location = useLocation();
    console.dir(auth)
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  }