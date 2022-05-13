import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useLocation,Navigate } from "react-router-dom";
import { auth } from "../Redux/Action/Auth";
const Protected = (props) => {
  const { ComposedClass,reload,adminRoute } = props;
  let userAuth = useSelector((state) => state.auth.auth);
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  let user = userAuth ? userAuth : null;
  useEffect(() => {
      dispatch(auth());
  },[dispatch]);
  if(user){
    if(!user.isAuth){
      if(reload){
        return <Navigate to="/" state={{ from: location }} replace />;
      }
    }else{
      if(adminRoute && !user.isAdmin){
          navigate("/dashboard",{replace: true});
      }else{
        if(reload === false){
          navigate("/dashboard",{replace: true});
        }
      }
    }
  }
  return (
    <div>
        <ComposedClass { ...props } user={user}/>
    </div>
  );
};

export default Protected;