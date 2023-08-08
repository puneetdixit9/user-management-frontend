import React from 'react'
import { Box } from '@mui/material'
import DownloadCopyLinkButton from './DownloadCopyLinkButton'
import DeleteFileConfirmDialog from './DeleteFileConfirmDialog'

function RowButton(props) {
    const { row } = props

    return (
        <Box  display="flex" justifyContent="right">
            <DownloadCopyLinkButton row={row}></DownloadCopyLinkButton>
            <DeleteFileConfirmDialog row = {row}></DeleteFileConfirmDialog>
        </Box>
    )
}

export default RowButton
