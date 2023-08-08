import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { uploadFilesAction } from '../redux/actions/files'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'

function UploadFile() {
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)

    const [selectedFile, setSelectedFile] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
        setIsFilePicked(true)
    }

    const handleUploadClick = () => {
        if (isFilePicked) {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('project_id', projectsState.selectedProject.projectId)
            console.log(dispatch(uploadFilesAction(formData)))
            setOpen(false)
        }
        setIsFilePicked(false)
    }

    return (
        <div>
            <Button
                variant="contained"
                size="large"
                onClick={handleClickOpen}
                sx={{ px: '5', whiteSpace: 'nowrap' }}
            >
                Upload File <FileUploadIcon></FileUploadIcon>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span>
                            <input type="file" onChange={handleFileChange} />
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ mx: 1 }}
                        startIcon={<FileUploadIcon />}
                        onClick={handleUploadClick}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UploadFile

UploadFile.propTypes = {
    Project: PropTypes.object,
}
