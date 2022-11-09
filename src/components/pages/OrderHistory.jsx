import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../customHook/useAxiosPrivate.js';

const columns = [
    { id: 'order', label: 'Order', minWidth: 80 },
    { id: 'product', label: 'Product', minWidth: 200 },
    {
        id: 'total',
        label: 'total',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'link',
        label: 'Link',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 120,
        align: 'right',
    },
];


const OrderHistoryTable = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [orderArray, setOrderArray] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {id} = useParams();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    useEffect(() => {
        const controller = new AbortController();

        const getUserOrder = async () => {
            try {
                const response = await axiosPrivate.get(`/order/user/${id}`, {
                    signal: controller.signal
                });
                setIsLoading(false);
                setOrderArray(response.data.data)
            } catch (err) {
                console.error("error when get order:",err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUserOrder();

        return () => {
            controller.abort();
        }
    }, [])

    const handleCheckout = (id) => {
        localStorage.setItem('order', id);
        navigate("/checkout/step1");
    }

    const handleConfirmation = (id) => {
        navigate(`/confirm/${id}`);
    }

    return (
        isLoading ? 

        <div className='loader-container'>
            <h2>Loading...</h2>
            <div className='loader'></div>
        </div> :

        <Paper sx={{ width: '90%', m: "2ch auto"}}>
        <TableContainer>
            <Table stickyHeader aria-label="sticky table" >
            <TableHead>
                <TableRow>
                <TableCell align="center" colSpan={6} >
                    <Typography variant="h3">
                        Order History
                    </Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 70, minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {orderArray
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                            align={columns[0].align}
                            style={{ top: 70, minWidth: columns[0].minWidth, fontWeight: "bold" }}
                        >{`#${index + 1 + page * rowsPerPage}`}</TableCell>
                        <TableCell
                            align={columns[1].align}
                            style={{ top: 70, minWidth: columns[1].minWidth, fontWeight: "bold" }}
                        >
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                                {row.orderProduct?.map((ele, index) => <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: "17ch", minWidth: "80px", m: '0.5vw' }} key={index}>
                                    <img src={ele.product?.media?.split("|")[0]} />
                                    <Typography variant="div" >{ele.product?.name}</Typography>
                                </Box>)}
                            </Box>
                        </TableCell>
                        <TableCell
                            align={columns[2].align}
                            style={{ top: 70, minWidth: columns[2].minWidth, fontWeight: "bold" }}
                        >{`$${(row.totalPrice*1.13).toFixed(2)}`}</TableCell>
                        <TableCell
                            align={columns[3].align}
                            style={{ top: 70, minWidth: columns[3].minWidth, fontWeight: "bold" }}
                        >
                            <Box>
                                {row.orderStatus?.status === "In Progress" || row.orderStatus?.status === "Payment failed" ? <Button variant="outlined" onClick={() => handleCheckout(row.id)}>checkout</Button> : <Button variant="outlined" sx={{ fontSize: "11.5px" }} onClick={() => handleConfirmation(row.id)}>Confirmation Page</Button>}
                            </Box>
                        </TableCell>
                        <TableCell
                            align={columns[4].align}
                            style={{ top: 70, minWidth: columns[4].minWidth, fontWeight: "bold" }}
                        >
                                {row.orderStatus?.status}
                        </TableCell>
                        
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orderArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}

export default OrderHistoryTable;