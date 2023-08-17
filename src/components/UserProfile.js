import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { getUserProfile, getSubFunctions, getRoles, getAvailablePermission, getUserPermissions } from '../redux/actions/projects';
import { Avatar, Typography, Container, Paper, TextField, Button, Grid, Switch, Autocomplete, Checkbox } from '@mui/material';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [userProfile, setUserProfile] = useState({})
    const [personalInfoEditing, setPersonalInfoEditing] = useState(false);
    const projectsState = useAppSelector(state => state.projectsReducer);
    const [officialInfoEditing, setOfficalInfoEditing] = useState(false);
    const [subFunctionsData, setSubFunctionsData] = useState([])
    const [roles, setRoles] = useState([])
    const [filteredSubFunctions, setFilteredSubFunctions] = useState([]);
    const [selectedRole, setSelectedRole] = useState({})
    const [selectedFunction, setSelectedFunction] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState({})
    const [availablePermissions, setAvailablePermissions] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);

    useEffect(() => {
        dispatch(getRoles())
        dispatch(getSubFunctions())
        dispatch(getUserProfile(userId))
        dispatch(getAvailablePermission())
        dispatch(getUserPermissions(userId))

    }, [])

    useEffect(() => {
        setUserProfile(projectsState.userProfileData)
        setSubFunctionsData(projectsState.subFunctions)
        setRoles(projectsState.roles)
        setFilteredSubFunctions(projectsState.subFunctions.filter(subFunction => subFunction.dept_id === projectsState.userProfileData.dept_id))
        setSelectedRole(projectsState.roles.find(role => role.role_id === projectsState.userProfileData.role_id));
        setSelectedFunction(projectsState.subFunctions.find(subFunction => subFunction.func_id === projectsState.userProfileData.func_id));
        setSelectedDepartment(projectsState.subFunctions.find(subFunction => subFunction.dept_id === projectsState.userProfileData.dept_id)?.dept_name || '');
        setAvailablePermissions(projectsState.permissions)
        setUserPermissions(projectsState.userPermissions)
    }, [projectsState.userProfileData, projectsState.subFunctions, projectsState.roles, projectsState.permissions, projectsState.userPermissions])


    const handleDepartmentChange = (event, newValue) => {
        setSelectedDepartment(newValue)
        setSelectedFunction(null);
        if (newValue) {
            const filteredSubs = subFunctionsData.filter(subFunction => subFunction.dept_name === newValue);
            setFilteredSubFunctions(filteredSubs);
        } else {
            setFilteredSubFunctions(subFunctionsData);
        }

    };

    const handleTogglePermission = (permission) => {
        if (userPermissions.some(selPerm => selPerm.permission_id === permission.permission_id)) {
            handleRemovePermission(permission.permission_id);
        } else {
            setUserPermissions([...userPermissions, permission]);
        }
    };

    const handleRemovePermission = (permissionId) => {
        setUserPermissions(userPermissions.filter(selPerm => selPerm.permission_id !== permissionId));
    };

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
                            label="User Id"
                            value={userProfile.user_id || ''}
                            disabled
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            id="department"
                            options={Array.from(new Set(subFunctionsData.map((option) => option.dept_name)))}
                            getOptionLabel={(option) => option}
                            onChange={handleDepartmentChange}
                            value={selectedDepartment}
                            disabled={!officialInfoEditing}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    name="department"
                                    label="Department"
                                />
                            )}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            id="subFunction"
                            options={filteredSubFunctions}
                            getOptionLabel={(option) => option.sub_function_name}
                            value={selectedFunction || null}
                            onChange={(event, newValue) => setSelectedFunction(newValue)}
                            disabled={!officialInfoEditing}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    name="subFunction"
                                    label="Function"
                                />
                            )}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            id="role"
                            options={roles}
                            getOptionLabel={(option) => (option ? option.role_name : '')}
                            value={selectedRole}
                            onChange={(event, newValue) => setSelectedRole(newValue)}
                            disabled={!officialInfoEditing}
                            sx={{ mb: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    name="role"
                                    label="Role"
                                />
                            )}
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
                <Typography variant="h4" sx={{ mt: 2 }}>Permissions</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Paper elevation={1} sx={{ padding: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {availablePermissions.map(permission => (
                                    <div key={permission.permission_id} style={{ marginRight: '8px', marginBottom: '8px' }}>
                                        <label>
                                            <Checkbox
                                                checked={userPermissions.some(selPerm => selPerm.permission_id === permission.permission_id)}
                                                onChange={() => handleTogglePermission(permission)}
                                            />
                                            {permission.application} - {permission.permission}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default UserProfile;
