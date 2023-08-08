import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardMedia, TextField } from '@mui/material'
import UserSession from '../services/auth'
import SnackbarNotification from './SnackbarNotification'
import { passwordResetAction } from '../redux/actions/auth'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'

const Profile = () => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector(state => state.authReducer)

    const [snackbarState, setSnackbarState] = useState(false)

    const [user, setUser] = useState({
        userName: 'Unknown',
        email: '',
    })

    useEffect(() => {
        setUser({...user, userName: UserSession.getUserName()})
        // console.log("username", UserSession.getUserName())
    }, [])

    useEffect(() => {
        setSnackbarState(true)
    }, [authState.message])
    

    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            old_password: data.get('old_password'),
            new_password: data.get('new_password'),
        }
        dispatch(passwordResetAction(context))
    }
    return (
        <Container maxWidth="xl">
            <Box
                display="flex"
                justifyContent="center"
                // alignItems="center"
                minHeight="100vh"
            >
                <Card
                    sx={{ maxWidth: 300 }}
                    style={{
                        justify: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CardContent>
                        <CardMedia
                            sx={{ height: 240 }}
                            image="./profilepic.svg"
                            title="profile pic"
                        />
                        <Typography variant="h5">{user.userName}</Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {user.email}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{ maxWidth: 300 }}
                    style={{
                        justify: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <Typography component="h1" variant="h5" sx={{ mx: 2 }}>
                            Change Password
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="old_password"
                            label="Current Password"
                            type="password"
                            name="old_password"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="New Password"
                            type="password"
                            id="new_password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Box>
                </Card>
            </Box>
            {snackbarState && (authState.message) && (
                    <SnackbarNotification
                        message={authState.message}
                        onClose={() => setSnackbarState(false)}
                        severity={authState.isError ? 'error' : 'success'}
                    />
                )}
        </Container>
    )
}

export default Profile
