import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    pendingUsers: [],
    activeUsers: [],
    inActiveUsers: [],
    subFunctions: [],
    roles: [],
    message: '',
    isError: false,
    userProfileData: {},
    permissions: [],
    userPermissions: [],
    isUserUpdating: false,
    userPermissionsUpdating: false,
}

export const projectsReducer = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        fetchPendingUsers(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchPendingUsersSuccess(state, action) {
            return {
                ...state,
                pendingUsers: action.payload,
                isError: false,
            }
        },
        fetchPendingUsersFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                isError: true,
            }
        },
        fetchActiveUsers(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchActiveUsersSuccess(state, action) {
            return {
                ...state,
                activeUsers: action.payload,
                isError: false,
            }
        },
        fetchActiveUsersFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                isError: true,
            }
        },
        fetchInActiveUsers(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchInActiveUsersSuccess(state, action) {
            return {
                ...state,
                inActiveUsers: action.payload,
                isError: false,
            }
        },
        fetchInActiveUsersFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                isError: true,
            }
        },
        approveUser(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        approveUserSuccess(state, action) {
            return {
                ...state,
                isError: false,
                message: "User Approved"
            }
        },
        approveUserFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                isError: true,
                message: "Approve User Failed"
            }
        },
        updateUser(state, action) {
            return {
                ...state,
                message: "",
                isUserUpdating: true
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                isError: false,
                message: "User Details Updated",
                isUserUpdating: false
            }
        },
        updateUserFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Update User Failed",
                isUserUpdating: false
            }
        },
        fetchSubFunctions(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchSubFunctionsSuccess(state, action) {
            return {
                ...state,
                isError: false,
                subFunctions: action.payload
            }
        },
        fetchSubFunctionsFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Update User Failed"
            }
        },
        fetchRoles(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchRolesSuccess(state, action) {
            return {
                ...state,
                isError: false,
                roles: action.payload
            }
        },
        fetchRolesFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Update User Failed"
            }
        },
        fetchUserProfile(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchUserProfileSuccess(state, action) {
            return {
                ...state,
                isError: false,
                userProfileData: action.payload
            }
        },
        fetchUserProfileFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Error in fetching user profile."
            }
        },
        fetchPermissions(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchPermissionsSuccess(state, action) {
            return {
                ...state,
                isError: false,
                permissions: action.payload
            }
        },
        fetchPermissionsFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Error in fetching user profile."
            }
        },
        fetchUserPermissions(state, action) {
            return {
                ...state,
                message: ""
            }
        },
        fetchUserPermissionsSuccess(state, action) {
            return {
                ...state,
                isError: false,
                userPermissions: action.payload
            }
        },
        fetchUserPermissionsFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Error in fetching user profile."
            }
        },
        updateUserPermissions(state, action) {
            return {
                ...state,
                message: "",
                userPermissionsUpdating: true
            }
        },
        updateUserPermissionsSuccess(state, action) {
            return {
                ...state,
                isError: false,
                userPermissionsUpdating: false,
                message: "Permissions Updated."
            }
        },
        updateUserPermissionsFailed(state, action) {
            return {
                ...state,
                isError: true,
                userPermissionsUpdating: false,
                message: "Error in updating user permissions."
            }
        },
        resetUserState(state, action) {
            return {
                ...state,
                isError: false,
                message: "",
                pendingUsers: [],
                activeUsers: [],
                inActiveUsers: [],
            }
        },
    },
})

export const {
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
} = projectsReducer.actions

export default projectsReducer.reducer
