import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { register, resetState } from '../redux/actions/auth'
import { getSubFunctions, getRoles } from '../redux/actions/projects'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SnackbarNotification from './SnackbarNotification'
import { setRef } from '@mui/material'


const theme = createTheme()

export default function SignUp() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const authState = useAppSelector(state => state.authReducer)
    const projectsState = useAppSelector(state => state.projectsReducer);
    const [snackbarState, setSnackbarState] = useState(false)
    const [subFunctionsData, setSubFunctionsData] = useState([])
    const [roles, setRoles] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [filteredSubFunctions, setFilteredSubFunctions] = useState([]);



    useEffect(() => {
        dispatch(getSubFunctions())
        dispatch(getRoles())
        return () => {
            dispatch(resetState())
        };
    }, [])


    useEffect(() => {
        setSubFunctionsData(projectsState.subFunctions)
        setRoles(projectsState.roles)
        setFilteredSubFunctions(projectsState.subFunctions)
    }, [projectsState.subFunctions, projectsState.roles])


    useEffect(() => {
        setSnackbarState(true)
    }, [authState.message])


    const handleDepartmentChange = (event, newValue) => {
        if (newValue) {
            const filteredSubs = subFunctionsData.filter((subFunction) => subFunction.dept_name === newValue);
            setFilteredSubFunctions(filteredSubs);
        } else {
            setFilteredSubFunctions(subFunctionsData);
        }
    };


    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let context = {
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            employee_code: data.get('employeeCode'),
            manager_name: data.get('managerName'),
            dept_id: subFunctionsData.find(subfunction => subfunction.dept_name === data.get('department'))?.dept_id,
            func_id: subFunctionsData.find(subfunction => subfunction.sub_function_name === data.get('subFunction'))?.func_id,
            role_id: roles.find(role => role.role_name === data.get('role'))?.role_id,
        }
        console.log(context)
        dispatch(register(context))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New User Sign Up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                        id="signup-form"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="employeeCode"
                                    label="Employee Code"
                                    id="employeeCode"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="managerName"
                                    label="Manager/L1 Name"
                                    id="managerName"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="department"
                                    options={Array.from(new Set(subFunctionsData.map((option) => option.dept_name)))}
                                    getOptionLabel={(option) => option}
                                    onChange={handleDepartmentChange}
                                    renderInput={(params) => (
                                        <TextField {...params} required fullWidth name="department" label="Department" />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="subFunction"
                                    options={filteredSubFunctions}
                                    getOptionLabel={(option) => option.sub_function_name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            fullWidth
                                            name="subFunction"
                                            label="Sub Function"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="role"
                                    options={roles}
                                    getOptionLabel={(option) => option.role_name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            fullWidth
                                            name="role"
                                            label="Role"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
            {snackbarState && authState.message && (
                <>
                    {!authState.isError && (
                        document.getElementById('signup-form').reset()
                    )}
                    <SnackbarNotification
                        message={authState.message}
                        onClose={() => setSnackbarState(false)}
                        severity={authState.isError ? 'error' : 'success'}
                    />
                </>
            )}
        </ThemeProvider>
    )
}
