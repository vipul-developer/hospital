import axios from "axios";
import { SERVER_API } from "../../../Misc/API";
import { LOGIN_USER,REGISTER_USER,LOGGED_USER } from "../ActionType";

export const login = (dataToSubmit) => {
    const request = axios.post(`${SERVER_API}/login_user`,dataToSubmit)
                    .then(response => response.data);
            return{
                type: LOGIN_USER,
                payload: request
            }
};

export const register = (dataToSubmit) => {
    const request = axios.post(`${SERVER_API}/register_user`,dataToSubmit)
                    .then(response => response.data);
            return{
                type: REGISTER_USER,
                payload: request
            }
};

export const logged = () => {
    const request = axios.get(`${SERVER_API}/logout_user`)
                    .then(response => response.data);
            return{
                type: LOGGED_USER,
                payload: request
            }
};