import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import { Card, CardContent, Typography, Button, Grid, Rating } from "@mui/material";
import PropTypes from 'prop-types';

export default function PendingUsersTable(props) {
    const { pendingUsers, approveOrReject } = props;

    // const timeFormatter = (dateTimeString) => {
    //     const dateParts = dateTimeString.split(' ');
    //     const timeParts = dateParts[4].split(':');
    //     const hours = parseInt(timeParts[0], 10);
    //     const minutes = parseInt(timeParts[1], 10);
    //     const amOrPm = hours >= 12 ? 'PM' : 'AM';
    //     const formattedHours = (hours % 12) || 12;

    //     return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    // };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 550, mt: 5 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff', fontWeight: "bold" }}>
                        <TableCell>User ID</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">User Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Created On</TableCell>
                        <TableCell align="center">Approve / Reject</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pendingUsers.map((row) => (
                        <TableRow
                            key={row.user_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.user_id}
                            </TableCell>
                            <TableCell align="left">{row.first_name}</TableCell>
                            <TableCell align="center">{row.last_name}</TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.created_on}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color={row.status === "prepared" ? "secondary" : "success"}
                                    sx={{ width: "110px", fontSize: "1", mr: 1 }}
                                    onClick={() => approveOrReject(row.user_id)}
                                >
                                    <DoneIcon />
                                    Approve
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "110px", fontSize: "1" }}
                                    // onClick={() => approveOrReject(row.user_id)}
                                >
                                    <CancelOutlinedIcon />
                                    Reject
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

PendingUsersTable.propTypes = {
    pendingUsers: PropTypes.array,
    approveOrReject: PropTypes.func
};
