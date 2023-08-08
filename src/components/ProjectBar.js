import React from 'react'
import { Stack, Box, Button, MenuItem, FormControl, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import AddProjectDialog from './AddProjectDialog'
import UserSession from '../services/auth'
import { getFilesForProject } from '../redux/actions/files'
import { setSelectedProjectsAction } from '../redux/actions/projects'
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import UploadFile from './UploadFile'

export default function ProjectBar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const projectsState = useAppSelector(state => state.projectsReducer)

    let menu_items = []

    if (projectsState && !projectsState.isLoading) {
        menu_items = projectsState.projects.map(item => {
            return (
                <MenuItem
                    name={item.projectId}
                    key={item.projectId}
                    value={item.projectName}
                >
                    {item.projectName}
                </MenuItem>
            )
        })
    }

    const handleSelectProject = (event, item) => {
        let obj = projectsState.projects.find(
            o => o.projectId === item.props.name,
        )
        dispatch(setSelectedProjectsAction({ ...obj }))
        dispatch(getFilesForProject(item.props.name))
    }

    return (
        <div>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2, mb: 4 }}
            >
                <Stack spacing={2} direction="row">
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel>Select Project</InputLabel>
                            <Select
                                value={
                                    !projectsState.selectedProject.projectName 
                                        ? ''
                                        : projectsState.selectedProject
                                              .projectName
                                }
                                defaultValue = ""
                                label="Select Project"
                                onChange={handleSelectProject}
                            >
                                {menu_items}
                            </Select>
                        </FormControl>
                    </Box>

                    {projectsState.selectedProject.projectName &&
                        (UserSession.isAdmin() ||
                            UserSession.getUserName() ===
                                projectsState.selectedProject.userName) && (
                            <Box>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ my: 1 }}
                                    onClick={() => navigate('/settings')}
                                >
                                    Project Settings
                                </Button>
                            </Box>
                        )}
                </Stack>
                <Stack direction="row">
                    <AddProjectDialog></AddProjectDialog>
                </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ flex: '1 1 100%' }} variant="h5">
                {!projectsState.selectedProject.projectName
                    ? 'Please select a project'
                    : projectsState.selectedProject.projectName + ' Files'}
            </Typography>

            {projectsState.selectedProject.projectName && (
                <UploadFile
                    Project={projectsState.selectedProject}
                ></UploadFile>
            )}
        </Stack>
        </div>
    )
}
