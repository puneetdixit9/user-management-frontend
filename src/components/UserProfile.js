import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../redux/actions/projects';
import { Avatar, Typography, Container, Paper, TextField, Button, Grid, Switch } from '@mui/material';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [userProfile, setUserProfile] = useState({})
    const [personalInfoEditing, setPersonalInfoEditing] = useState(false);
    const projectsState = useAppSelector(state => state.projectsReducer);
    const [officialInfoEditing, setOfficalInfoEditing] = useState(false);

    useEffect(() => {
        dispatch(getUserProfile(userId))
    }, [])

    useEffect(() => {
        setUserProfile(projectsState.userProfileData)
    }, [projectsState.userProfileData])

    const handleEditPersonalInfoToggle = () => {
        setPersonalInfoEditing(!personalInfoEditing);
    };

    const handleEditOfficialInfoToggle = () => {
        setOfficalInfoEditing(!officialInfoEditing);
    };

    const handleSave = () => {
        setPersonalInfoEditing(false);
        setOfficalInfoEditing(false);
    };

    const handleDeactivate = () => {
        setUserProfile(
            {
                ...userProfile,
                is_active: !userProfile.is_active
            }
        );
    }


    return (
        <Container sx={{ marginTop: 2 }}>
            <Paper elevation={1} sx={{ padding: 3 }}>
                <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />

                <Grid container alignItems="center" justifyContent="space-between" marginBottom={2}>
                    <Grid item>
                        <Typography variant="h7" sx={{ mt: 2 }}>{userProfile.email} | {userProfile.role_id}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">Deactivate User</Typography>
                        <Switch checked={!userProfile.is_active} onChange={handleDeactivate} color="primary" />
                    </Grid>
                </Grid>

                <Typography variant="h4" sx={{ mt: 2 }}>Personal Information</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="First Name"
                            value={userProfile.first_name || ''}
                            disabled={!personalInfoEditing}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Middle Name"
                            value={userProfile.middle_name || ''}
                            disabled={!personalInfoEditing}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Last Name"
                            value={userProfile.last_name || ''}
                            disabled={!personalInfoEditing}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Email"
                            value={userProfile.email || ''}
                            disabled
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Username"
                            value={userProfile.username || ''}
                            disabled
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Phone Number"
                            value={userProfile.mobile_number || ''}
                            disabled={!personalInfoEditing}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
                {personalInfoEditing ? (
                    <>
                        <Button variant="contained" onClick={handleSave} sx={{ marginRight: 2 }}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleEditPersonalInfoToggle}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={handleEditPersonalInfoToggle}>
                        Edit
                    </Button>
                )}
                <Typography variant="h4" sx={{ mt: 2 }}>Offical Information</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Manager"
                            value={userProfile.manager_name || ''}
                            disabled={!officialInfoEditing}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Employee Code"
                            value={userProfile.employee_code || ''}
                            disabled={!officialInfoEditing}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Role"
                            value={userProfile.role_id || ''}
                            disabled={!officialInfoEditing}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Department"
                            value={userProfile.dept_id || ''}
                            disabled
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Sub Function"
                            value={userProfile.func_id || ''}
                            disabled
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="User Id"
                            value={userProfile.user_id || ''}
                            disabled
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                </Grid>
                {officialInfoEditing ? (
                    <>
                        <Button variant="contained" onClick={handleSave} sx={{ marginRight: 2 }}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleEditOfficialInfoToggle}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={handleEditOfficialInfoToggle}>
                        Edit
                    </Button>
                )}
            </Paper>
        </Container>
    );
}

export default UserProfile;
