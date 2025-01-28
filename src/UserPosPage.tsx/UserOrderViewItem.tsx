
import { Box, Button, Container, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setUserItemViewId } from '../AllStoreSlice/UserOrderListSlice';

const UserOrdersViewItems = () => {
    const { id, data, order } = useSelector((state: RootState) => state.OrderViewList)
    console.log(data)
    console.log(id)
    console.log(order)
    const totalPrice = data.reduce((acc, item) => acc + item.total_amount, 0);
    const dispatch = useDispatch()
    const mobile = useMediaQuery('(max-width:600px)');
    return (
        <>
            <Modal
                open={id !== ""}
                onClose={() => dispatch(setUserItemViewId(""))}
                aria-labelledby="modal-modal-title"
            >
                <Box >


                    <Container
                        maxWidth="xs"
                        style={{
                            padding: "15px",
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "12px",
                            backgroundColor: "#f9f9f9",
                            height: "80vh",
                            overflowY: "auto",
                            overflowX: "hidden"
                        }}
                    >
                        {/* Header */}
                        <Typography
                            variant="h6"
                            align="center"
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#333",
                                marginBottom: "15px",
                            }}
                        >
                            {order?.canteen?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            style={{ fontSize: "10px", color: "#555", marginBottom: "5px" }}
                        >
                            {order?.canteen?.location || "Address Not Available"}
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            style={{ fontSize: "10px", color: "#555", marginBottom: "10px" }}
                        >
                            Phone: {order?.canteen?.contact || "Not Available"} | Email:{" "}
                            {order?.canteen?.email || "Not Available"}
                        </Typography>

                        <TableContainer sx={{ border: "1px solid #ccc", mt: "5px", }}>
                            <Table size="small" sx={{

                            }}>
                                <TableBody>
                                    <TableRow>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                            Customer Name:
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", textAlign: "right" }}>{order?.customer_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                            Customer Email:
                                        </TableCell>
                                        <TableCell style={{
                                            fontSize: "12px",
                                            textAlign: "right"
                                            , fontWeight: "bold", color: "#333", padding: "8px"
                                        }}>{order?.user?.email || 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                            Customer Phone:
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", textAlign: "right" }}>{order?.user?.phone}</TableCell>
                                    </TableRow>


                                </TableBody>

                            </Table>
                        </TableContainer>


                        <Divider style={{ marginBottom: "15px" }} />
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "#333",
                            }}
                        >
                            Orders
                        </Typography>
                        <TableContainer
                            component={Paper}
                            style={{
                                boxShadow: "none",
                                border: "1px solid #e0e0e0",
                                borderRadius: "5px",
                                height: mobile ? "200px" : "340px",
                            }}
                            sx={{
                                "&::-webkit-scrollbar": {
                                    width: "4px",
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: "#f1f1f1",
                                },
                            }}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#f1f1f1" }}>
                                        <TableCell
                                            style={{ fontSize: "12px", width: "20%", padding: "8px", color: "#555" }}
                                        >
                                            Canteen Name
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "center",
                                                color: "#555",
                                                width: "30%",
                                            }}
                                        >
                                            Order Id
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                // width: "10px",
                                                textAlign: "right",
                                                color: "#555",
                                                width: "10%",
                                            }}
                                        >
                                            Voucher Amt
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "center",
                                                color: "#555",
                                            }}
                                        >
                                            Payment Type
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "8px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {item.canteen?.name}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", padding: "8px", width:"30%", textAlign: "center" }}>
                                                {item.order_id}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "8px",
                                                    textAlign: "right",
                                                }}
                                            >
                                                ₹{Number(item.voucher_amt ?? 0) || ""}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "8px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.payment_type}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={3} style={{ fontSize: "12px", padding: "8px" }}>
                                            <strong>Subtotal :</strong>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            <strong>₹{totalPrice}</strong>
                                        </TableCell>
                                    </TableRow>

                                    {
                                        order?.voucher && (
                                            <TableRow>
                                                <TableCell colSpan={3} style={{ fontSize: "12px", padding: "8px" }}>
                                                    <strong>Voucher :</strong>
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontSize: "12px",
                                                        padding: "8px",
                                                        textAlign: "right",
                                                        color: "green"
                                                    }}
                                                >
                                                    <strong>- ₹ {order?.voucher_amt?.toString()}</strong>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }

                                    <TableRow>
                                        <TableCell colSpan={3} style={{ fontSize: "12px", padding: "8px" }}>
                                            <strong>Payable :</strong>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "right",
                                            }}
                                        >
                                            <strong>₹{order?.payable_amt?.toString()}</strong>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Divider style={{ margin: "15px 0" }} />


                        <Divider style={{ margin: "15px 0" }} />

                        {/* Footer */}
                        <Typography
                            variant="body2"
                            align="center"
                            style={{
                                fontSize: "12px",
                                color: "#777",
                                fontStyle: "italic",
                                marginTop: "20px",
                            }}
                        >
                            Thank you for visiting {order?.canteen?.name}!
                        </Typography>

                        {/* Print Button */}
                        <Grid container justifyContent="center" style={{ marginTop: "20px", gap: "10px" }}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => window.print()}
                                    style={{
                                        fontSize: "12px",
                                        textTransform: "none",
                                        backgroundColor: "#007bff",
                                    }}
                                >
                                    Print Bill
                                </Button>

                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => dispatch(setUserItemViewId(""))}
                                    style={{
                                        fontSize: "12px",
                                        textTransform: "none",
                                        backgroundColor: "#007bff",
                                    }}
                                >
                                    Close
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>


            </Modal>
        </>
    )
}

export default UserOrdersViewItems