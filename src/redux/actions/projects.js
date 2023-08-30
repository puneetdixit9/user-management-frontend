import apiClient from '../../services/apiClient'
import { USERS, USER, SUB_FUNCTIONS, PERMISSIONS, USER_PERMISSIONS, ROLES } from '../../constants'
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
    fetchUserProfile,
    fetchUserProfileSuccess,
    fetchUserProfileFailed,
    fetchPermissions,
    fetchPermissionsSuccess,
    fetchPermissionsFailed,
    fetchUserPermissions,
    fetchUserPermissionsSuccess,
    fetchUserPermissionsFailed,
    updateUserPermissions,
    updateUserPermissionsSuccess,
    updateUserPermissionsFailed,

} from '../reducer/projects'


export const getPendingUsers = () => async dispatch => {
    console.log('Calling Action : getPendingUsers()')
    await dispatch(fetchPendingUsers())
    try {
        const response = await apiClient.post(`${USERS}`, { approved: false })
        return dispatch(fetchPendingUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchPendingUsersFailed(err))
    }
}

export const getActiveUsers = () => async dispatch => {
    console.log('Calling Action : getActiveUsers()')
    await dispatch(fetchActiveUsers())
    try {
        const response = await apiClient.post(`${USERS}`, { approved: true, is_active: true })
        return dispatch(fetchActiveUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchActiveUsersFailed(err))
    }
}

export const getInActiveUsers = () => async dispatch => {
    console.log('Calling Action : getInActiveUsers()')
    await dispatch(fetchInActiveUsers())
    try {
        const response = await apiClient.post(`${USERS}`, { is_active: false })
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

export const getUserProfile = (userId) => async dispatch => {
    console.log('Calling Action : getSubFunctions()')
    await dispatch(fetchUserProfile())
    try {
        const response = await apiClient.get(`${USER}/${userId}`)
        return dispatch(fetchUserProfileSuccess(response.data))
    } catch (err) {
        return dispatch(fetchUserProfileFailed(err))
    }
}


export const getAvailablePermission = () => async dispatch => {
    console.log('Calling Action : getAvailablePermission()')
    await dispatch(fetchPermissions())
    try {
        const response = await apiClient.get(`${PERMISSIONS}`)
        return dispatch(fetchPermissionsSuccess(response.data))
    } catch (err) {
        return dispatch(fetchPermissionsFailed(err))
    }
}

export const getUserPermissions = (userId) => async dispatch => {
    console.log('Calling Action : getUserPermissions()')
    await dispatch(fetchUserPermissions())
    try {
        const response = await apiClient.get(`${USER_PERMISSIONS}/${userId}`)
        return dispatch(fetchUserPermissionsSuccess(response.data))
    } catch (err) {
        return dispatch(fetchUserPermissionsFailed(err))
    }
}

export const updateUserPermission = (userId, payload) => async dispatch => {
    console.log('Calling Action : updateUserPermission()')
    await dispatch(updateUserPermissions())
    try {
        const response = await apiClient.post(`${USER_PERMISSIONS}/${userId}`, payload)
        return dispatch(updateUserPermissionsSuccess(response.data))
    } catch (err) {
        return dispatch(updateUserPermissionsFailed(err))
    }
}