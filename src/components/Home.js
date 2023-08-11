import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import SnackbarNotification from './SnackbarNotification';
import { getPendingUsers, getActiveUsers, getInActiveUsers, updateUserDetails } from '../redux/actions/projects';
import PendingUsersTable from './PendingUsersTable';
import ActiveUsersTable from './ActiveUsersTable';
import InactiveUsersTable from './InactiveUsersTable';
import UserSession from '../services/auth'


const Home = () => {
    const dispatch = useAppDispatch();
    const [snackbarState, setSnackbarState] = useState(false);
    const projectsState = useAppSelector(state => state.projectsReducer);
    const filesState = useAppSelector(state => state.filesReducer);
    const [pendingUsers, setPendingUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const [inActiveUsers, setInActiveUsers] = useState([])

    const [activeTable, setActiveTable] = useState(localStorage.getItem('selectedTab') || "pendingUsers");

    useEffect(() => {
        if (UserSession.isAuthenticated()) {
            console.log("home", UserSession.isAuthenticated())
            dispatch(getPendingUsers())
            dispatch(getActiveUsers())
            dispatch(getInActiveUsers())
        }

    }, [])


    useEffect(() => {
        setPendingUsers(projectsState.pendingUsers)
        setActiveUsers(projectsState.activeUsers)
        setInActiveUsers(projectsState.inActiveUsers)
    }, [projectsState.pendingUsers, projectsState.activeUsers, projectsState.inActiveUsers])

    const handlePendingUserApproval = (userId) => {
        const payload = {
            role_id: 2,
            approved: true,
        };
        dispatch(updateUserDetails(userId, payload));
        setPendingUsers(prevPendingUsers => (
            prevPendingUsers.filter(user => user.user_id !== userId)
        ));
    };

    const handleTabSwitch = (selectedTab) => {
        setActiveTable(selectedTab)
        localStorage.setItem('selectedTab', selectedTab)
    }


    const handleActiveInactiveUser = (userId, isActive) => {
        const payload = {
            is_active: isActive
        };
        dispatch(updateUserDetails(userId, payload));
        setActiveUsers(prevActiveUsers => (
            prevActiveUsers.filter(user => user.user_id !== userId)
        ));
        setInActiveUsers(prevInActiveUsers => (
            prevInActiveUsers.filter(user => user.user_id !== userId)
        ));
    };

    const renderActiveTable = () => {
        switch (activeTable) {
            case 'pendingUsers':
                return (
                    <PendingUsersTable pendingUsers={pendingUsers} approveOrReject={handlePendingUserApproval} />
                );
            case 'activeUsers':
                return (
                    <ActiveUsersTable Users={activeUsers} handlerInActiveUser={handleActiveInactiveUser} />
                );
            case 'inActiveUsers':
                return (
                    <InactiveUsersTable IncativeUsers={inActiveUsers} handlerActivateUser={handleActiveInactiveUser} />
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Button
                        onClick={() => handleTabSwitch('pendingUsers')}
                        variant="contained"
                        sx={{ width: "250px", fontSize: "1", mr: 1, mt: 1 }}
                        color={activeTable === 'pendingUsers' ? 'primary' : 'inherit'}
                    >
                        Pending Requests ({pendingUsers.length})
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "250px", fontSize: "1", mr: 1, mt: 1 }}
                        color={activeTable === 'activeUsers' ? 'primary' : 'inherit'}
                        onClick={() => handleTabSwitch('activeUsers')}
                    >
                        Active Users
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "250px", fontSize: "1", mr: 1, mt: 1 }}
                        color={activeTable === 'inActiveUsers' ? 'primary' : 'inherit'}
                        onClick={() => handleTabSwitch('inActiveUsers')}
                    >
                        Inactive Users
                    </Button>

                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    {renderActiveTable()}
                </Grid>
            </Grid>

            {snackbarState && projectsState.message && (
                <SnackbarNotification
                    message={projectsState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={projectsState.isError ? 'error' : 'success'}
                />
            )}
            {snackbarState && filesState.message && (
                <SnackbarNotification
                    message={filesState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={filesState.isError ? 'error' : 'success'}
                />
            )}
        </Container>
    );
};

export default Home;
