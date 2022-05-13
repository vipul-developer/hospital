import { LOGIN_USER,REGISTER_USER,LOGGED_USER } from "../../Action/ActionType";
// eslint-disable-next-line

export default (state={},action) => {
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginUser: action.payload}
        case REGISTER_USER:
            return { ...state, registerUser: action.payload}
        case LOGGED_USER:
            return { ...state, loggedUser: action.payload}
        default:
            return state
    }
};