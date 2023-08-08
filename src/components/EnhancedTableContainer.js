import React from 'react'
import EnhancedTable from './EnhancedTable'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getFilesForProject } from '../redux/actions/files'

function EnhancedTableContainer() {

    const dispatch = useAppDispatch()
    const filesState = useAppSelector(state => state.filesReducer)
    const projectsState = useAppSelector(state => state.projectsReducer)

    useEffect(() => {
        dispatch(getFilesForProject(projectsState.selectedProject.projectId))
    }, [projectsState.selectedProject, filesState.isDeleting, filesState.isUploading])

    useEffect(() => {
        if (!filesState.isFileActionModalOpen) {
            dispatch(getFilesForProject(projectsState.selectedProject.projectId))
        }
    }, [filesState.isFileActionModalOpen])

    if (filesState.isLoading === false && filesState.files) {
        return <EnhancedTable rows={filesState.files} />
    }
}

export default EnhancedTableContainer
