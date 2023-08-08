import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import {
    setSelectedProjectsAction,
    deleteProjectAction,
} from '../redux/actions/projects'

export default function DeleteProjectDialog() {
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        dispatch(deleteProjectAction(projectsState.selectedProject.projectId))
        dispatch(setSelectedProjectsAction({}))
        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="contained"
                size="large"
                onClick={handleClickOpen}
                sx={{ my: 1 }}
                color="error"
            >
                Delete Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Project - {projectsState.selectedProject.projectName}
                </DialogTitle>
                <DialogContent>
                    <Box width="350px">
                        <DialogContentText>Are you Sure ?</DialogContentText>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
