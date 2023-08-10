import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,    
    pendingUsers: [],
    activeUsers: [],
    inActiveUsers: [],

    message: '',
    isError: false,
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
                message: ""
            }
        },
        updateUserSuccess(state, action) {
            return {
                ...state,
                isError: false,
                message: "User Details Updated"
            }
        },
        updateUserFailed(state, action) {
            return {
                ...state,
                isError: true,
                message: "Update User Failed"
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
} = projectsReducer.actions

export default projectsReducer.reducer
