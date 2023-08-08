import apiClient, { uploadApiClient } from '../../services/apiClient'
import { FILES_API } from '../../constants'
import {
    fetchFiles,
    fetchFilesSuccess,
    fetchFilesFailed,
    fetchConvertedFiles,
    fetchConvertedFilesSuccess,
    fetchConvertedFilesFailed,
    uploadFiles,
    uploadFilesSuccess,
    uploadFilesFailed,
    removeFiles,
    removeFilesSuccess,
    removeFilesFailed,
    copyLink,
    copyLinkSuccess,
    copyLinkFailed,
    convertFile,
    convertFileSuccess,
    convertFileFailed,
    fileActionModalOpen,
    fileActionModalClose,
    setFiles
} from '../reducer/files'



export const getFilesForProject = projectId => async dispatch => {
    if (projectId){
    console.log('Calling Action : getFilesForProject()')
    await dispatch(fetchFiles())
    try {
        const response = await apiClient.get(`${FILES_API}/${projectId}`)
        console.log('Response from getFilesForProject():', response.data)
        return dispatch(fetchFilesSuccess(response.data))
    } catch (err) {
        return dispatch(fetchFilesFailed(err))
    }}
}

export const getConvertedFilesAction = convertedUUID => async dispatch => {
    if (convertedUUID){
    console.log('Calling Action : getConvertedFilesAction()')
    await dispatch(fetchConvertedFiles())
    try {
        const response = await apiClient.get(`${FILES_API}/${convertedUUID}`)
        console.log('Response from getConvertedFilesAction():', response.data)
        return dispatch(fetchConvertedFilesSuccess(response.data))
    } catch (err) {
        return dispatch(fetchConvertedFilesFailed(err))
    }}
}

export const uploadFilesAction = formData => async dispatch => {
    console.log('Calling Action : uploadFiles()')
    // console.log(formData)
    await dispatch(uploadFiles())
    try {
        const response = await uploadApiClient.post(FILES_API, formData)
        console.log('Printing from uploadFilesAction():', response.data)
        return dispatch(uploadFilesSuccess(response.data))
    } catch (err) {
        return dispatch(uploadFilesFailed(err))
    }
}

export const copyLinkAction = link => async dispatch => {
    console.log('copyLinkAction()')
    await dispatch(copyLink())
    try {
        return dispatch(copyLinkSuccess(link))
    } catch (err) {
        return dispatch(copyLinkFailed(err))
    }
}

export const deleteFilesAction = row => async dispatch => {
    console.log('Calling Action : deleteFilesAction()')
    await dispatch(removeFiles())
    try {
        const response = await apiClient.delete(`${FILES_API}/${row.id}`)
        console.log('Response from deleteFilesAction():', response.data)
        return dispatch(removeFilesSuccess(response.data))
    } catch (err) {
        return dispatch(removeFilesFailed(err))
    }
}

export const deleteManyFilesAction = fileIds => async dispatch => {
    console.log('Calling Action : deleteManyFilesAction()')
    await dispatch(removeFiles())
    try {
        
        const response = await apiClient.delete(`${FILES_API}`,
        {
            data: {
                "file_ids":fileIds
            },
        })
        console.log('Response from deleteManyFilesAction():', response.data)
        return dispatch(removeFilesSuccess(response.data))
    } catch (err) {
        return dispatch(removeFilesFailed(err))
    }
}

export const convertFilesAction = formData => async dispatch => {
    console.log('Calling Action : convertFilesAction()')
    await dispatch(convertFile())
    try {
        const response = await apiClient.post(`${FILES_API}/convert`, formData)
        console.log('Printing from convertFilesAction():', response.data)
        return dispatch(convertFileSuccess(response.data))
    } catch (err) {
        return dispatch(convertFileFailed(err))
    }
}

export const fileActionModalStatus = status => async dispatch => {
    console.log('Calling Action : fileActionModalStatus()')
    if (status) {
        return dispatch(fileActionModalOpen())
    } else {
        return dispatch(fileActionModalClose())
    }
}

// SET SELECTED Files Action => GET
export const setFilesEmptyAction = () => async dispatch => {
    console.log('Calling Action : setFilesEmptyAction()')
        return dispatch(setFiles())
}
