import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { Stack } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import RowButton from './RowButton'
import PropTypes from 'prop-types'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import FileActionModal from './FileActionModal'


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

export default function EnhancedTable(props) {
    const { rows } = props
    // console.log("Rows:", rows)

    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('id')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(true)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = rows.map(n => n.id)
            // console.log(newSelected)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id)
        // console.log("selectedIndex", selectedIndex, " ID", id)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
        // console.log("Selected Row:", selected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = event => {
        setDense(event.target.checked)
    }

    const isSelected = name => selected.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    )

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />

                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                onClick={event =>
                                                    handleClick(event, row.id)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {
                                                <FileActionModal
                                                    row={row}
                                                ></FileActionModal>
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.date_modified}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.type}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.size} KB
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.uploaded_by}
                                        </TableCell>
                                        <TableCell align="right">
                                            <RowButton row={row}></RowButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
            <Box textAlign="center">
                <Stack
                    direction="row"
                    sx={{ my: 5, mx: 1 }}
                    justifyContent="space-evenly"
                >
                </Stack>
            </Box>
        </Box>
    )
}

EnhancedTable.propTypes = {
    rows: PropTypes.array,
}
