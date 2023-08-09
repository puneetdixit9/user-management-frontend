import React from 'react'
import ProjectBar from './ProjectBar'
import Container from '@mui/material/Container'
import EnhancedTableContainer from './EnhancedTableContainer'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useState, useEffect } from 'react'
import SnackbarNotification from './SnackbarNotification'
import { getProjects, getPendingUsers, approvePendingUser } from '../redux/actions/projects'
import { useNavigate } from 'react-router-dom'
import UserSession from '../services/auth'
import PendingUsersTable from './PendingUsers'


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [snackbarState, setSnackbarState] = useState(false)

    const projectsState = useAppSelector(state => state.projectsReducer)
    const filesState = useAppSelector(state => state.filesReducer)
    const [pendingUsers, setPendingUsers] = useState([])

    useEffect(() => {

        if (UserSession.isAuthenticated()) {
            console.log("home", UserSession.isAuthenticated())
            dispatch(getPendingUsers())
        }
    }, [
        projectsState.isAdding, projectsState.isUpdating, projectsState.isDeleteting
    ]
    )

    useEffect(() => {
        setPendingUsers(projectsState.pendingUsers)
    }, [projectsState.pendingUsers])


    useEffect(() => {
        setSnackbarState(true)
    }, [projectsState.message, filesState.isUploading, filesState.isDeleteting, filesState.isCopying, filesState.isConverting])

    const handlePendingUserApproval = (userId) => {
        const payload = {
            role_id: 1
        }
        dispatch(approvePendingUser(userId, payload))
        setPendingUsers(prevPendingUsers => (
            prevPendingUsers.filter(user => user.user_id !== userId)
        ));

    }

    return (
        <Container maxWidth="xl">
            {/* <ProjectBar
                ></ProjectBar> */}
            {/* <EnhancedTableContainer 
                ></EnhancedTableContainer> */}

            <PendingUsersTable pendingUsers={pendingUsers} approveOrReject={handlePendingUserApproval}/>

            {snackbarState && (projectsState.message) && (
                <SnackbarNotification
                    message={projectsState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={projectsState.isError ? 'error' : 'success'}
                />
            )}
            {snackbarState && (filesState.message) && (
                <SnackbarNotification
                    message={filesState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={filesState.isError ? 'error' : 'success'}
                />
            )}
        </Container>
    )
}

export default Home
