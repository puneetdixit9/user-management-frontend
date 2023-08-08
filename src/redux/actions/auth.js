import apiClient from '../../services/apiClient'
import { CHANGE_PASSWORD, LOGIN_API, REGISTER_API, USERS_API, LOGOUT_API } from '../../constants'
import {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailed,
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailed,
    logout,
    logoutSuccess,
    logoutFailed
} from '../reducer/auth'



function jwtDecode(t) {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
  }

export const login = payload => async dispatch => {
    console.log('Calling action : login()')
    await dispatch(fetchLogin())
    try {
        const response = await apiClient.post(LOGIN_API, payload)

        let actionPayload = response.data
        let token = jwtDecode(actionPayload["access_token"])
        actionPayload['userId'] = token.payload.sub["user_id"]
        actionPayload['role'] = token.payload.sub["role"]
        actionPayload['username'] = token.payload.sub["username"]
        // actionPayload['username'] = payload.username
        // actionPayload['password'] = payload.password
        return dispatch(fetchLoginSuccess(actionPayload))
    } catch (err) {
        return dispatch(fetchLoginFailed(err))
    }
}


export const register = payload => async dispatch => {
    console.log('Calling action : register()')
    await dispatch(fetchRegister())
    try {
        const response = await apiClient.post(REGISTER_API, payload)
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        return dispatch(fetchRegisterFailed(err))
    }
}


export const passwordResetAction = (payload) => async (dispatch) => {
    console.log('Calling action : password_reset()')
    await dispatch(passwordReset())
    try {
        const response = await apiClient.put(CHANGE_PASSWORD, payload)
        return dispatch(passwordResetSuccess(response))
    } catch (err) {
        return dispatch(passwordResetFailed(err))
    }
}

export const getAllUsersAction = () => async dispatch => {
    console.log('Calling Action : getAllUsersAction()')
    await dispatch(fetchUsers())
    try {
        const response = await apiClient.get(`${USERS_API}/emails`)
        return dispatch(fetchUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchUsersFailed(err))
    }
}

export const logoutAction = () => async dispatch => {
    console.log('Calling Action : logout()')
    await dispatch(logout())
    try {
        const response = await apiClient.delete(`${LOGOUT_API}`)
        return await dispatch(logoutSuccess(response.data))
    } catch (err) {
        return await dispatch(logoutFailed(err))
    }
}