import apiClient from '../../services/apiClient'
import { APPROVE_USER, USERS, USER, SUB_FUNCTIONS, ROLES } from '../../constants'
import {
    fetchPendingUsers,
    fetchPendingUsersSuccess,
    fetchPendingUsersFailed,
    fetchActiveUsers,
    fetchActiveUsersSuccess,
    fetchActiveUsersFailed,
    fetchInActiveUsers,
    fetchInActiveUsersSuccess,
    fetchInActiveUsersFailed,
    approveUser,
    approveUserSuccess,
    approveUserFailed,
    updateUser,
    updateUserSuccess,
    updateUserFailed,
    resetUserState,
    fetchSubFunctions,
    fetchSubFunctionsSuccess,
    fetchSubFunctionsFailed,
    fetchRoles,
    fetchRolesSuccess,
    fetchRolesFailed,

} from '../reducer/projects'


export const getPendingUsers = () => async dispatch => {
    console.log('Calling Action : getPendingUsers()')
    await dispatch(fetchPendingUsers())
    try {
        const response = await apiClient.post(`${USERS}`, {approved: false})
        return dispatch(fetchPendingUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchPendingUsersFailed(err))
    }
}

export const getActiveUsers = () => async dispatch => {
    console.log('Calling Action : getActiveUsers()')
    await dispatch(fetchActiveUsers())
    try {
        const response = await apiClient.post(`${USERS}`, {approved: true, is_active: true})
        return dispatch(fetchActiveUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchActiveUsersFailed(err))
    }
}

export const getInActiveUsers = () => async dispatch => {
    console.log('Calling Action : getInActiveUsers()')
    await dispatch(fetchInActiveUsers())
    try {
        const response = await apiClient.post(`${USERS}`, {is_active: false})
        return dispatch(fetchInActiveUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchInActiveUsersFailed(err))
    }
}


export const updateUserDetails = (userId, payload) => async dispatch => {
    console.log('Calling Action : updateUserDetails()')
    await dispatch(updateUser())
    try {
        const response = await apiClient.put(`${USER}/${userId}`, payload)
        return dispatch(updateUserSuccess(response.data))
    } catch (err) {
        return dispatch(updateUserFailed(err))
    }
}

export const approvePendingUser = (userId, payload) => async dispatch => {
    console.log('Calling Action : approveUser()')
    await dispatch(approveUser())
    try {
        const response = await apiClient.post(`${APPROVE_USER}/${userId}`, payload)
        return dispatch(approveUserSuccess(response.data))
    } catch (err) {
        return dispatch(approveUserFailed(err))
    }
}

export const resetUserDataState = () => async dispatch => {
    console.log('Calling Action : resetUserDataState()')
    await dispatch(resetUserState())
}


export const getSubFunctions = () => async dispatch => {
    console.log('Calling Action : getSubFunctions()')
    await dispatch(fetchSubFunctions())
    try {
        const response = await apiClient.get(`${SUB_FUNCTIONS}`)
        return dispatch(fetchSubFunctionsSuccess(response.data))
    } catch (err) {
        return dispatch(fetchSubFunctionsFailed(err))
    }
}

export const getRoles = () => async dispatch => {
    console.log('Calling Action : getSubFunctions()')
    await dispatch(fetchRoles())
    try {
        const response = await apiClient.get(`${ROLES}`)
        return dispatch(fetchRolesSuccess(response.data))
    } catch (err) {
        return dispatch(fetchRolesFailed(err))
    }
}