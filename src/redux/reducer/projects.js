import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    selectedProject: {},
    isSetting: false,
    isLoading: false,
    isAdding: false,
    isDeleteting: false,
    isUpdating: false,

    projectAccessUsers: [],
    isLoadingUsers: false,
    isAddingAccess: false,
    isRemovingAccess : false,
    
    message: '',
    isError: false,
}

function createData(projectId, projectName, userName) {
    return {
        projectId,
        projectName,
        userName,
    }
}

function createProjectAccessData(id, email) {
    return {
        id,
        email,
    }
}

export const projectsReducer = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setSelectedProject(state, action) {
            // console.log("Action", action)
            return {
                ...state,
                isSetting: true,
                selectedProject: action.payload,
            }
        },

        setProjectsObject(state, action) {
            // console.log("Action", action)
            return {
                ...state,
                projects: [],
            }
        },

        fetchProjects(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        fetchProjectsSuccess(state, action) {
            let row_data = []
            for (let i = 0; i < action.payload.length; i++) {
                row_data.push(
                    createData(
                        action.payload[i].id,
                        action.payload[i].project_name,
                        action.payload[i].username,
                    ),
                )
            }
            let selectedProject = {}
            if ( row_data && row_data.length > 0 ){
                selectedProject = row_data[0]
            }
            return {
                ...state,
                isLoading: false,
                selectedProject : selectedProject,
                projects: row_data,
            }
        },
        fetchProjectsFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                message: action.payload.error,
                isLoading: false,
                isError: true,
            }
        },

        addProjects(state, action) {
            return {
                ...state,
                message: '',
                isAdding: true,
            }
        },
        addProjectsSuccess(state, action) {
            return {
                ...state,
                message: 'Add Project Successfull',
                isAdding: false,
                isError: false,
            }
        },
        addProjectsFailed(state, action) {
            return {
                ...state,
                message: action.payload.response.data.error,
                isAdding: false,
                isError: true,
            }
        },

        deleteProjects(state, action) {
            return {
                ...state,
                message: '',
                isDeleteting: true,
            }
        },
        deleteProjectsSuccess(state, action) {
            return {
                ...state,
                message: 'Project Successfully Deleted',
                isDeleteting: false,
                isError: false,
            }
        },
        deleteProjectsFailed(state, action) {
            return {
                ...state,
                isDeleteting: false,
                isError: true,
                message: `Delete Project Failed : ${
                    action?.payload?.msg ? action?.payload?.msg : ''
                }`,
            }
        },

        updateProjects(state, action) {
            return {
                ...state,
                message: '',
                isUpdating: true,
            }
        },
        updateProjectsSuccess(state, action) {
            return {
                ...state,
                message: 'Project Name Updated',
                isUpdating: false,
                isError: false,
            }
        },
        updateProjectsFailed(state, action) {
            return {
                ...state,
                isUpdating: false,
                message: 'Project Name Update Failed',
                isError: true,
            }
        },


        fetchProjectAccess(state, action) {
            return {
                ...state,
                // isLoadingUsers: true,
            }
        },
        fetchProjectAccessSuccess(state, action) {
            let row_data = []
            for (let i = 0; i < action.payload.length; i++) {
                row_data.push(
                    createProjectAccessData(
                        action.payload[i].id,
                        action.payload[i].email,
                    ),
                )
            }
            return {
                ...state,
                // isLoadingUsers: false,
                projectAccessUsers: row_data,
            }
        },
        fetchProjectAccessFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                message: action.payload.error,
                // isLoadingUsers: false,
                isError: true,
            }
        },


        addProjectAccess(state, action) {
            return {
                ...state,
                isAddingAccess: true,
                message:""
            }
        },
        addProjectAccessSuccess(state, action) {
            return {
                ...state,
                message: action.payload.message,
                isAddingAccess: false,
                isError: false,
            }
        },
        addProjectAccessFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                message: action.payload.response.data.error,
                isAddingAccess: false,
                isError: true,
            }
        },
        removeProjectAccess(state, action) {
            return {
                ...state,
                isRemovingAccess: true,
                message: ""
            }
        },
        removeProjectAccessSuccess(state, action) {
            return {
                ...state,
                message: action.payload.message,
                isRemovingAccess: false,
                isError: false,
            }
        },
        removeProjectAccessFailed(state, action) {
            console.log(action.payload)
            return {
                ...state,
                message: action.payload.response.data.message,
                isRemovingAccess: false,
                isError: true,
            }
        },
    },
})

export const {
    setSelectedProject,
    setProjectsObject,

    fetchProjects,
    fetchProjectsSuccess,
    fetchProjectsFailed,
    addProjects,
    addProjectsSuccess,
    addProjectsFailed,
    deleteProjects,
    deleteProjectsSuccess,
    deleteProjectsFailed,
    updateProjects,
    updateProjectsSuccess,
    updateProjectsFailed,

    fetchProjectAccess,
    fetchProjectAccessSuccess,
    fetchProjectAccessFailed,
    addProjectAccess,
    addProjectAccessSuccess,
    addProjectAccessFailed,
    removeProjectAccess,
    removeProjectAccessSuccess,
    removeProjectAccessFailed
} = projectsReducer.actions

export default projectsReducer.reducer
