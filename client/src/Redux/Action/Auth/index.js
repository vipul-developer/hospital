import axios from "axios";
import { SERVER_API } from "../../../Misc/API";
import { AUTH_USER } from "../ActionType";

export const auth = () => {
    const request = axios.get(`${SERVER_API}/user_auth`)
                    .then(response => response.data);
            return{
                type: AUTH_USER,
                payload: request
            }
};