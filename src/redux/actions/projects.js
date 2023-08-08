import apiClient from '../../services/apiClient'
import { PROJECTS_API } from '../../constants'
import {
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

} from '../reducer/projects'


// GET Projects Action => GET
export const getProjects = () => async dispatch => {
    console.log('Calling Action : getProjects()')
    await dispatch(fetchProjects())
    try {
        const response = await apiClient.get(PROJECTS_API)
        // console.log('Printing from project actions:', response.data)
        return dispatch(fetchProjectsSuccess(response.data))
    } catch (err) {
        return dispatch(fetchProjectsFailed(err))
    }
}


// SET SELECTED Project Action => GET
export const setSelectedProjectsAction = project => async dispatch => {
    console.log('Calling Action : setSelectedProjectsAction()')
        return dispatch(setSelectedProject(project))
}

// SET Projects Objects Empty Action => GET
export const setProjectsObjectAction = () => async dispatch => {
    console.log('Calling Action : setProjectsObjectAction()')
        return dispatch(setProjectsObject())
}


// ADD PROJECTS Action => POST
export const addProjectAction = body => async dispatch => {
    console.log('Calling Action : addProjectAction()')
    await dispatch(addProjects())
    try {
        const response = await apiClient.post(PROJECTS_API, body)
        console.log('Printing from addProjectAction():', response.data)
        return dispatch(addProjectsSuccess(response.data))
    } catch (err) {
        return dispatch(addProjectsFailed(err))
    }
}

// EDIT Projects Action => PUT
export const editProjectsAction = (projectId, body) => async dispatch => {
    console.log('Calling Action : editProjectsAction()')
    await dispatch(updateProjects())
    try {
        const response = await apiClient.put(`${PROJECTS_API}/${projectId}`, body)
        console.log('Printing from editProjectsAction:', response.data)
        return dispatch(updateProjectsSuccess(response.data))
    } catch (err) {
        return dispatch(updateProjectsFailed(err))
    }
}


// DELETE PROJECTS Action => DELETE
export const deleteProjectAction = projectId => async dispatch => {
    console.log('Calling Action : deleteProjectAction()')
    await dispatch(deleteProjects())
    try {
        const response = await apiClient.delete(`${PROJECTS_API}/${projectId}`)
        console.log('Printing from deleteProjectAction():', response.data)
        return dispatch(deleteProjectsSuccess(response.data))
    } catch (err) {
        return dispatch(deleteProjectsFailed(err))
    }
}



// GET Project Access Action => GET
export const getProjectAccessAction = (projectId) => async dispatch => {
    console.log('Calling Action : getProjectAccessAction()')
    await dispatch(fetchProjectAccess())
    try {
        const response = await apiClient.get(`${PROJECTS_API}/${projectId}/access`)
        // console.log('Printing from project actions:', response.data)
        return dispatch(fetchProjectAccessSuccess(response.data))
    } catch (err) {
        return dispatch(fetchProjectAccessFailed(err))
    }
}

// ADD Project Access Action => POST
export const addProjectAccessAction = (projectId, body) => async dispatch => {
    console.log('Calling Action : addProjectAccessAction()')
    await dispatch(addProjectAccess())
    try {
        const response = await apiClient.post(`${PROJECTS_API}/${projectId}/access`, body)
        // console.log('Printing from project actions:', response.data)
        return dispatch(addProjectAccessSuccess(response.data))
    } catch (err) {
        return dispatch(addProjectAccessFailed(err))
    }
}

// Remove Project Access Action => DELETE
export const removeProjectAccessAction = (projectId, body) => async dispatch => {
    console.log('Calling Action : removeProjectAccessAction()')
    await dispatch(removeProjectAccess())
    try {
        const response = await apiClient.delete(
            `${PROJECTS_API}/${projectId}/access`,
            {
                data: {
                    ...body,
                },
            },
        )
        // console.log('Printing from project actions:', response.data)
        return dispatch(removeProjectAccessSuccess(response.data))
    } catch (err) {
        return dispatch(removeProjectAccessFailed(err))
    }
}