import * as React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteFilesAction } from '../redux/actions/files'
import { useAppDispatch } from '../hooks/redux-hooks'
import { deleteManyFilesAction } from '../redux/actions/files'


export default function DeleteSelectedFileConfirmDialog(props) {
    const dispatch = useAppDispatch()

    const { selected } = props

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    console.log(selected)
    const handleDeleteSelected = () => {
        dispatch(deleteManyFilesAction(selected))
        setOpen(false)
    }
    
    
    return (
        <Box>
            {/* <Button
                variant="contained"
                color="error"
                sx={{ mx: 1 }}
                onClick={handleClickOpen}
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button> */}
            <DeleteIcon onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <Box width="400px">
                <DialogTitle>Delete files</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteSelected}>OK</Button>
                </DialogActions>
                    </Box>
            </Dialog>
        </Box>
    )
}
