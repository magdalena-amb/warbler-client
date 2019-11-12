import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import  { addError, removeError } from './errors';

//action creator that will be dispatched and sent to the reducer
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}
 
export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);  // delete default Authorization header
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData) {
    return dispatch => {
        // wrap out thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData).then(({token, ...user}) => {
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                dispatch(removeError());
                resolve(); // indicate API call succeeded
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject(); // indicate API call failed
            });
        })
    }
}

