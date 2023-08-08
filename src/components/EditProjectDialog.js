import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import { Box } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { setSelectedProjectsAction, editProjectsAction } from '../redux/actions/projects'


export default function EditProjectDialog() {
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)

    const [newProject, setNewProject] = React.useState(projectsState.selectedProject.projectName)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const handleEdit = () => {
        
        dispatch(editProjectsAction(projectsState.selectedProject.projectId, { project_name: newProject }))
        
        let obj = projectsState.projects.find(
                o => o.projectId === projectsState.selectedProject.projectId
            )
            
        dispatch(setSelectedProjectsAction({ ...obj, projectName: newProject }))
        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="contained"
                size="large"
                onClick={handleClickOpen}
                sx={{ my: 1 }}
            >
                Edit Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent><Box width="350px">
                    <DialogContentText>
                        Provide a new name for the project
                    </DialogContentText>
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Project Name"
                        defaultValue={newProject}
                        fullWidth
                        variant="standard"
                        onChange={v => setNewProject(v.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEdit}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}