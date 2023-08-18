import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { getUserProfile, getSubFunctions, getRoles, getAvailablePermission, getUserPermissions, updateUserDetails, updateUserPermission } from '../redux/actions/projects';
import { Avatar, Typography, Container, Paper, TextField, Button, Grid, Switch, Autocomplete, Checkbox } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer);
    const [userProfile, setUserProfile] = useState({})
    const [editingInfo, setEditingInfo] = useState(false);
    const [subFunctionsData, setSubFunctionsData] = useState([])
    const [roles, setRoles] = useState([])
    const [filteredSubFunctions, setFilteredSubFunctions] = useState([]);
    const [selectedRole, setSelectedRole] = useState({})
    const [selectedFunction, setSelectedFunction] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState({})
    const [availablePermissions, setAvailablePermissions] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [userUpdatedPermissions, setUserUpdatedPermissions] = useState([]);
    const [updatingPermissions, setUpdatingPermissions] = useState(false);
    const [updatingUserProfile, setUpdatingUserProfile] = useState(false);
    const [isPermissionsUpdated, setIsPermissionUpdated] = useState(false);
    const [updatedUserProfileFields, setUpdatedUserProfileFields] = useState({});
    const [showFunctionRequiredError, setShowFunctionRequiredError] = useState(false);

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
        setUserUpdatedPermissions(projectsState.userPermissions)
    }, [projectsState.userProfileData, projectsState.subFunctions, projectsState.roles, projectsState.permissions, projectsState.userPermissions])

    useEffect(() => {
        const oldPermissions = userPermissions.map(permission => permission.permission_id)
        const updatedPermissions = userUpdatedPermissions.map(permission => permission.permission_id)
        const isPermissionAdded = !updatedPermissions.every(permissionId => oldPermissions.includes(permissionId))
        const isPermissionRemoved = !oldPermissions.every(permissionId => updatedPermissions.includes(permissionId))

        setIsPermissionUpdated(true)
        if (isPermissionAdded && isPermissionRemoved) {
            console.log("Permissions added and removed")
        } else if (isPermissionAdded) {
            console.log("Permission Added")
        } else if (isPermissionRemoved) {
            console.log("Permission Removed")
        } else {
            setIsPermissionUpdated(false)
            console.log("No change in permissions")
        }
    }, [userUpdatedPermissions, userPermissions])

    useEffect(() => {
        if (!projectsState.userPermissionsUpdating) {
            setUpdatingPermissions(false)
            if (!projectsState.isError) {
                setUserPermissions(userUpdatedPermissions)
            }
        }
        if (!projectsState.isUserUpdating) {
            setUpdatingUserProfile(false)
            setEditingInfo(false);
            setUpdatedUserProfileFields({})
        }
    }, [projectsState.userPermissionsUpdating, projectsState.isUserUpdating])

    const handleDepartmentChange = (event, newValue) => {
        setSelectedDepartment(newValue)
        setSelectedFunction(null);
        if (newValue) {
            const filteredSubs = subFunctionsData.filter(subFunction => subFunction.dept_name === newValue);
            const deptId = subFunctionsData.find(subFunc => subFunc.dept_name === newValue)?.dept_id
            handleProfileChange("dept_id", deptId)
            setFilteredSubFunctions(filteredSubs);
        } else {
            setFilteredSubFunctions(subFunctionsData);
        }

    };

    const handleRoleOrFunctionChange = (key, newValue) => {
        if (newValue) {
            if (key === "func_id") {
                setSelectedFunction(newValue)
                handleProfileChange(key, newValue.func_id)
            } else {
                setSelectedRole(newValue)
                handleProfileChange(key, newValue.role_id)
            }
        }
    }

    const handleTogglePermission = (permission) => {
        if (userUpdatedPermissions.some(selPerm => selPerm.permission_id === permission.permission_id)) {
            setUserUpdatedPermissions(userUpdatedPermissions.filter(selPerm => selPerm.permission_id !== permission.permission_id));
        } else {
            setUserUpdatedPermissions([...userUpdatedPermissions, permission]);
        }
    };


    const handleEditInfoToggle = () => {
        setEditingInfo(!editingInfo);
    };

    const handleSave = () => {
        if ("dept_id" in updatedUserProfileFields && !("func_id" in updatedUserProfileFields)) {
            setShowFunctionRequiredError(true);
            return;
        }

        dispatch(updateUserDetails(userId, updatedUserProfileFields))
        setUpdatingUserProfile(true)
        setShowFunctionRequiredError(false);
    };

    const handleProfileChange = (key, value) => {
        setUserProfile({
            ...userProfile,
            [key]: value
        });
        setUpdatedUserProfileFields({
            ...updatedUserProfileFields,
            [key]: value
        })
    };

    const handleActiveInactiveUser = () => {
        const payload = {
            is_active: !userProfile.is_active
        };
        dispatch(updateUserDetails(userId, payload));
        setUserProfile(
            {
                ...userProfile,
                is_active: !userProfile.is_active
            }
        );
    }

    const handleUpdateUserPermission = () => {
        const updatePermissionIds = userUpdatedPermissions.map(permission => permission.permission_id)
        const payload = {
            permission_ids: updatePermissionIds
        }
        dispatch(updateUserPermission(userId, payload))
        setUpdatingPermissions(true)
    }

    const handleResetUserPermission = () => {
        setUserUpdatedPermissions(userPermissions)
    }


    return (
        <Container sx={{ marginTop: 2 }}>
            <Paper elevation={1} sx={{ padding: 3 }}>
                <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />

                <Grid container alignItems="center" justifyContent="space-between" marginBottom={2}>
                    <Grid item>
                        <Typography variant="h7" sx={{ mt: 2 }}>{userProfile.email} | {roles.find(role => role.role_id === userProfile.role_id)?.role_name || ""}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">Deactivate User</Typography>
                        {projectsState.isUserUpdating ? (
                            <CircularProgress size={20} />
                        ) : (
                            <Switch checked={!userProfile.is_active} onChange={handleActiveInactiveUser} color="primary" />
                        )}
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 2 }}>Personal Information</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="First Name"
                            value={userProfile.first_name || ''}
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                            onChange={(event) => handleProfileChange("first_name", event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Middle Name"
                            value={userProfile.middle_name || ''}
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                            onChange={(event) => handleProfileChange("middle_name", event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Last Name"
                            value={userProfile.last_name || ''}
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                            onChange={(event) => handleProfileChange("last_name", event.target.value)}
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
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => handleProfileChange("mobile_number", event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h6" sx={{ mt: 2 }}>Offical Information</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Manager"
                            value={userProfile.manager_name || ''}
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                            onChange={(event) => handleProfileChange("manager_name", event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Employee Code"
                            value={userProfile.employee_code || ''}
                            disabled={!editingInfo}
                            fullWidth
                            sx={{ mb: 2, mt: 2 }}
                            onChange={(event) => handleProfileChange("employee_code", event.target.value)}
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
                            disabled={!editingInfo}
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
                            onChange={(event, newValue) => handleRoleOrFunctionChange("func_id", newValue)}
                            disabled={!editingInfo}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    name="subFunction"
                                    label="Function"
                                    error={showFunctionRequiredError}
                                    helperText={showFunctionRequiredError? 'Function Required to updated department.': ''}
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
                            onChange={(event, newValue) => handleRoleOrFunctionChange("role_id", newValue)}
                            disabled={!editingInfo}
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
                {editingInfo ? (
                    <>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{ marginRight: 2 }}
                            disabled={updatingUserProfile || !Object.keys(updatedUserProfileFields).length}
                            startIcon={updatingUserProfile ? <CircularProgress size={20} /> : null}
                        >
                            {updatingUserProfile ? 'Updating...' : 'Update'}
                        </Button>
                        <Button variant="outlined" onClick={handleEditInfoToggle}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={handleEditInfoToggle} disabled={!userProfile.is_active}>
                        Edit
                    </Button>
                )}
                <Typography variant="h6" sx={{ mt: 2 }}>Permissions</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Paper elevation={1} sx={{ padding: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {availablePermissions.map(permission => (
                                    <div key={permission.permission_id} style={{ marginRight: '8px', marginBottom: '8px' }}>
                                        <label>
                                            <Checkbox
                                                checked={userUpdatedPermissions.some(selPerm => selPerm.permission_id === permission.permission_id)}
                                                onChange={() => handleTogglePermission(permission)}
                                                disabled={!userProfile.is_active}
                                            />
                                            {permission.application} - {permission.permission}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {isPermissionsUpdated ? (
                                <>

                                    <Button
                                        variant="contained"
                                        onClick={handleUpdateUserPermission}
                                        sx={{ marginRight: 2 }}
                                        disabled={updatingPermissions}
                                        startIcon={updatingPermissions ? <CircularProgress size={20} /> : null}
                                    >
                                        {updatingPermissions ? 'Updating...' : 'Update'}
                                    </Button>
                                    <Button variant="outlined" onClick={handleResetUserPermission}>
                                        Reset
                                    </Button>

                                </>
                            ) : (
                                null
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default UserProfile;
