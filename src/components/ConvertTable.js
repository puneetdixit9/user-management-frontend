import * as React from 'react'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getConvertedFilesAction } from '../redux/actions/files'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useState, useEffect } from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ConvertFileDialog from './ConvertFileDialog'


const getLink = row => {
    const link =
        `${process.env.REACT_APP_API_URL}` +
        '/files/' +
        row.uid +
        '/' +
        row.file_name
    return link
}

export default function ConvertTable(props) {
    const { row, open } = props
    const dispatch = useAppDispatch()

    const filesState = useAppSelector(state => state.filesReducer)

    useEffect(() => {
        if (open === true && !(filesState.isConverting)) {
            dispatch(getConvertedFilesAction(row.conversion_uuid))
        }
    }, [open, filesState.isConverting])
    console.log("row", row)
    console.log("filestate", filesState.convertedFiles)

    const fileTypes = ['.xml', '.csv', '.json', '.yaml']

    let table_rows = structuredClone(filesState.convertedFiles)

    for (let i = 0; i < fileTypes.length; i++) {
        let obj = table_rows.find(o => o.type === fileTypes[i])
        if (!obj) {
            table_rows.push({
                type: fileTypes[i],
                file_name:
                    row.file_name.substring(0, row.file_name.lastIndexOf('.')) +
                    fileTypes[i],
                id: i,
                convert: true,
            })
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>File Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Download/Convert</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table_rows.map(converted_file_row => (
                        <TableRow
                            key={converted_file_row.convert ? (converted_file_row.file_name):(converted_file_row.id)}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {converted_file_row.type
                                    .substring(1)
                                    .toUpperCase()}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {converted_file_row.file_name}
                            </TableCell>
                            {converted_file_row.convert ? (
                                <TableCell align="right">
                                    {/* <Button variant="contained" 
                                            color="success"
                                            startIcon={<ArrowBackIcon />}
                                            onClick={handleConvert}>
                                        Convert
                                    </Button> */}
                                    <ConvertFileDialog row={row} convertTo={converted_file_row}></ConvertFileDialog>
                                </TableCell>
                            ) : (
                                <TableCell align="right">
                                    <a
                                        href={getLink(converted_file_row)}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="contained"
                                            target=""
                                            startIcon={<FileDownloadIcon />}
                                        >
                                            Download
                                        </Button>
                                    </a>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}

                    {/* {filesState.convertedFiles.map(converted_file_row => (
                        <TableRow
                            key={converted_file_row.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {converted_file_row.type.substring(1)}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {converted_file_row.file_name}
                            </TableCell>
                            <TableCell align="right">
                                <Button>Download</Button>
                            </TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
