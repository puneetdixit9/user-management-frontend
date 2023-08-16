import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export default function ActiveUsersTable(props) {
    const { Users, handlerInActiveUser } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredUsers = Users.filter(user =>
        user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 550, mt: 5 }}>
            <TextField
                label={searchQuery.length || isInputFocused ? "Search" : "Search Email, Name and Username..."}
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ ml: 1, mr: -6, width: "550px" }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff', fontWeight: "bold" }}>
                        <TableCell>User ID</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">User Name</TableCell>
                        <TableCell align="center">Deptartment</TableCell>
                        <TableCell align="center">Sub Function</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Registered On</TableCell>
                        <TableCell align="center">Approved By</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((row) => (
                        <TableRow
                            key={row.user_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.user_id}
                            </TableCell>
                            <TableCell align="center">
                                <Link
                                    to={`/profile/${row.user_id}`}
                                > {row.email} </Link>
                            </TableCell>
                            <TableCell align="center">{row.first_name}</TableCell>
                            <TableCell align="center">{row.last_name}</TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.dept_name ? row.dept_name : "-"}</TableCell>
                            <TableCell align="center">{row.function_name ? row.function_name : "-"}</TableCell>
                            <TableCell align="center">{row.role_name ? row.role_name : "-"}</TableCell>
                            <TableCell align="center">{row.created_on}</TableCell>
                            <TableCell align="center">{row.approved_by}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ width: "110px", fontSize: "1", mr: 1 }}
                                    onClick={() => handlerInActiveUser(row.user_id, false)}
                                >
                                    {/* <DoneIcon /> */}
                                    Deactivate
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

ActiveUsersTable.propTypes = {
    Users: PropTypes.array,
    handlerInActiveUser: PropTypes.func
};
