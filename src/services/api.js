import axios from 'axios';

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // when user logs out
        delete axios.defaults.headers.common['Authorization'];
    }
}

// a generic way to make an ajax requests ( a wrapper around axios API call that formats errors, etc)
// @parm {string} method - the HTTP verb you want to use
// @param {string} path - the route path/ endpoint
// @param {object} data (optional) - data in JSON form for POST requests

export function apiCall(method, path, data ) {
    // we're going to resolve this promise when our actions have resolved
    return new Promise((resolve,  reject) => {
        return axios[method.toLowerCase()](path, data)
        .then(res => {
            return resolve(res.data)
        })
        .catch(err => {
            return reject(err.response.data.error);
        });
    });
}