import { AUTH_USER } from "../../Action/ActionType";
// eslint-disable-next-line
export default (state={},action) => {
    switch(action.type){
        case AUTH_USER:
            return { ...state, auth: action.payload}
        default:
            return state
    }
}