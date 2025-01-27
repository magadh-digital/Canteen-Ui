
import { Box, Button, Container, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setItemViewId } from '../AllStoreSlice/ItemViewSlice';
import { RootState } from '../Store';

const OrdersViewItems = () => {
    const { id, data, order } = useSelector((state: RootState) => state.ItemView)

    console.log(order)

    const dispatch = useDispatch()
    return (
        <>
            <Modal
                open={id !== ""}
                onClose={() => dispatch(setItemViewId(""))}
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

                       
                        <TableContainer  sx={{ border: "1px solid #ccc" }}>

                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333",padding:"8px" }}>
                                        Order ID:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right",padding:"8px" }}>{order?.order_id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333" ,padding:"8px"}}>
                                        Order Date:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right",padding:"8px" }}>
                                        {moment(order?.created_at).format("DD-MM-YYYY")}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333",padding:"8px" }}>
                                        Customer Name:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333",padding:"8px", textAlign: "right" }}>{order?.customer_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333" ,padding:"8px"}}>
                                        Customer Email:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px",
                                        textAlign: "right"
                                        , fontWeight: "bold", color: "#333" ,padding:"8px"}}>{order?.customer_email || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333",padding:"8px" }}>
                                        Customer Phone:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333",padding:"8px", textAlign: "right" }}>{order?.user?.phone}</TableCell>
                                </TableRow>
                               

                            </TableBody>

                            





                        
                        </Table>
                        </TableContainer>

                        


                        {/* Order Details */}
                        {/* <Grid container spacing={1} style={{ fontSize: "12px" }}>
                            <Grid item xs={6}>
                                <Typography variant="body2" style={{ color: "#333" }}>
                                    Order ID: <strong>{order?.order_id}</strong>
                                </Typography>
                                <Typography variant="body2" style={{ color: "#333" }}>
                                    Customer: <strong>{order?.customer_name}</strong>
                                </Typography>
                                <Typography variant="body2" style={{ color: "#333" }}>
                                    Email: <strong>{order?.customer_email}</strong>
                                </Typography>
                                <Typography variant="body2" style={{ color: "#333" }}>
                                    Phone: <strong>{}</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    style={{ color: "#333", textAlign: "right" }}
                                >
                                    Payment Type: <strong>{order?.payment_type}</strong>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{ color: "#333", textAlign: "right" }}
                                >
                                    Status: <strong>{order?.status}</strong>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{ color: "#333", textAlign: "right" }}
                                >
                                    Created At:{" "}
                                    <strong>{moment(order?.created_at).format("DD-MM-YYYY")}</strong>
                                </Typography>
                            </Grid>
                        </Grid> */}

                        <Divider style={{ marginBottom: "15px" }} />

                        {/* Items Table */}
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                color: "#333",
                            }}
                        >
                            Items
                        </Typography>
                        <TableContainer
                            component={Paper}
                            style={{
                                boxShadow: "none",
                                border: "1px solid #e0e0e0",
                                borderRadius: "5px",
                            }}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#f1f1f1" }}>
                                        <TableCell
                                            style={{ fontSize: "12px", padding: "8px", color: "#555" }}
                                        >
                                            Item
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "center",
                                                color: "#555",
                                            }}
                                        >
                                            Qty
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "right",
                                                color: "#555",
                                            }}
                                        >
                                            Price
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: "12px",
                                                padding: "8px",
                                                textAlign: "right",
                                                color: "#555",
                                            }}
                                        >
                                            Total
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order?.items.map((item: {
                                        item_id: string;
                                        name: string;
                                        qty: number;
                                        price: number;
                                        total: number;
                                    }) => (
                                        <TableRow key={item.item_id}>
                                            <TableCell style={{ fontSize: "12px", padding: "8px" }}>
                                                {item.name}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "8px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.qty}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "8px",
                                                    textAlign: "right",
                                                }}
                                            >
                                                ₹{item.price}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "8px",
                                                    textAlign: "right",
                                                }}
                                            >
                                                ₹{item.total}
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
                                            <strong>₹{order?.total_amount}</strong>
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
                        <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
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
                        </Grid>
                    </Container>
                </Box>


            </Modal>
        </>
    )
}

export default OrdersViewItems