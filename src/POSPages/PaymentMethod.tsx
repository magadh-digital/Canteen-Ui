import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Button, colors, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';

import { RenderUserLogin, UserDataType } from './RenderUserLogin';
import { PostOrderCreateApi } from '../AllPostApi';
import { toast } from 'react-toastify';
import { CreateOrderType, MenuItemType } from '../AllTypes';
import { resetData } from '../AllStoreSlice/AddQuantitySlice';
import { useNavigate } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import moment from 'moment';
import { Print } from '@mui/icons-material';
import { ToWords } from 'to-words';
import { ErrorHandle } from '../ErrorHandle';


const initialState: CreateOrderType = {
    total_amount: 0,
    customer_name: "",
    user_id: "",
    items: [],
    status: "COMPLETED",
    payment_type: "CASH",
    customer_type: "",
    canteen_id: "",
    voucher: false,
    payable_amt: 0
}

export default function PaymentMethod({ canteen_id }: { canteen_id: string }) {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [createOrderData, setCreateOrderData] = React.useState(initialState)
    const { mutateAsync: orderCreate, isPending } = PostOrderCreateApi()
    const { canteenData } = useSelector((state: RootState) => state.canteenData)
    const mobile = useMediaQuery("(max-width:800px)")
    const { orderData, price, } = useSelector((state: RootState) => state.PriceAndQuantity)
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [billData, setBillData] = React.useState<CreateOrderType | null>(null);
    const [billOpen, setBillOpen] = React.useState(false);
    const [printOpen, setPrintOpen] = React.useState(false);
    const toWord = new ToWords()

    const [userData, setUserData] = React.useState<UserDataType>(() => {
        return {
            user: {
            },
            voucher: 0
        };
    });


    const handleCreate = async () => {
        const changeItemData = orderData.map((item: MenuItemType) => ({
            qty: item.quantity ?? 0,
            item_id: item.id ?? "",
            price: item.price,
            name: item.name,
            total: item.price * (item.quantity ?? 0)
        }));

        const data = {
            ...createOrderData,
            canteen_id: canteen_id,
            items: changeItemData,
            payable_amt: price
        };
        try {
            const res = await orderCreate({ data });
            if (res?.status === 201) {
                setBillData(res?.data?.order);
                setBillOpen(true);


                toast.success("Order Created Successfully");
            }
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    };

    const handleCLosePRint = () => {
        setOpen(false);
        localStorage.removeItem('user');
        localStorage.removeItem('user_token');
        dispatch(resetData());
        setCreateOrderData(initialState);
        setSelectedUser(null);
        setUserData({ user: {}, vouchers: 0 });
        setBillOpen(false)
        navigate('/pos?canteen_id=' + canteen_id)
    }

    const handlePrint = () => {
        setPrintOpen(true);
    };


    React.useEffect(() => {
        if (printOpen && billData) {
            const printWindow = window.open("", "_blank");
            if (!printWindow) return;

            const receiptContent = renderToString(
                <section className="receipt-template">
                    <header className="receipt-header">
                        {/* <span className="duplicate-tag">DUPLICATE</span> */}
                        <h2 className="store-name">{canteenData?.name}</h2>
                    </header>

                    <section className="info-area">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="w-30"><span>Date:</span></td>
                                    <td>{moment().format("DD MMM YYYY")}</td>
                                </tr>
                                <tr>
                                    <td className="w-30"><span>Invoice ID:</span></td>
                                    <td>{billData?.order_id}</td>
                                </tr>
                                <tr>
                                    <td className="w-30">Customer Name:</td>
                                    <td>{billData?.customer_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <h4 className="main-title">INVOICE</h4>

                    <section className="listing-area item-list">
                        <table>
                            <thead>
                                <tr>
                                    <td className="w-10 text-center">Sl.</td>
                                    <td className="w-40 text-center">Name</td>
                                    <td className="w-15 text-center">Qty</td>
                                    <td className="w-15 text-right">Price</td>
                                    <td className="w-20 text-right">Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                {billData?.items?.map((item, index) => (
                                    <tr key={item.item_id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td className="text-center">{item.qty}</td>
                                        <td className="text-right">₹{item.price}</td>
                                        <td className="text-right">₹{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <section className="info-area calculation-area">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="w-70">Total Amt:</td>
                                    <td>₹{billData?.total_amount}</td>
                                </tr>
                                <tr>
                                    <td className="w-70">Voucher:</td>
                                    <td>₹{Number(billData?.voucher_amt ?? 0)}</td>
                                </tr>
                                <tr>
                                    <td className="w-70">Amount Paid:</td>
                                    <td>₹{Number(billData?.payable_amt ?? 0)}</td>
                                </tr>
                                <tr>
                                    <td className="w-70">Due:</td>
                                    <td>₹{Number(billData?.total_amount) - Number(billData?.payable_amt)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="info-area italic">
                        <span className="text-small"><b>In Text:</b> {toWord.convert(Number(billData?.total_amount ?? 0))}</span>
                    </section>
                </section>
            );


            const receiptCSS = `
            .receipt-template {
    width: 58mm;
    max-width: 58mm;
    font-family: 'Courier New', monospace;
    margin: 0 auto;
    font-weight: 600;
}
.duplicate-tag {
    font-size: 10px;
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
}
.receipt-template .text-small { font-size: 10px; }
.receipt-template .bold { font-weight: 700; }
.receipt-template .italic { font-style: italic; }
.receipt-template .main-title {
    font-size: 14px;
    font-weight: 800;
    text-align: center;
    margin: 10px 0 5px 0;
}
.receipt-template .store-name {
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    text-align: center;
}
.receipt-template table {
    width: 100%;
    border-collapse: collapse;
}
.receipt-template td, .receipt-template th {
    font-size: 12px;
    padding: 2px;
    word-break: break-word;
    font-weight: 600;
}
.receipt-template .receipt-header {
    text-align: center;
}
.receipt-template .info-area table {
    margin: auto;
    text-align: left;
}
.receipt-template .listing-area table thead tr {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    font-weight: 800;
}
.receipt-template .listing-area table tbody tr {
    border-top: 1px dashed #000;
    border-bottom: 1px dashed #000;
}
.receipt-template .calculation-area {
    font-weight: bold;
}
.receipt-template .calculation-area table td:nth-child(2) {
    border-bottom: 1px dashed #000;
    text-align: right;
}
@media print {
    @page {
        size: 58mm auto;
        margin: 0;
    }

    html, body {
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        background: none;
    }

    .receipt-template {
        width: 58mm;
        margin: 0 auto;
        page-break-after: avoid;
        font-weight: 600;
    }
}

            }
            `;




            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice</title>
                        <style>
                           ${receiptCSS}
                       </style>
                    </head>
                    <body>
                        ${receiptContent}
                        <script>
                            window.print();
                            setTimeout(() => window.close(), 100);
                        </script>
                    </body>
                </html>
            `);

            printWindow.document.close();
            setOpen(false);
        }
    }, [billData, printOpen]);

    return (
        <>
            <Stack sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
            }}
                onClick={() => setOpen(true)}
            >

                <span style={{
                    color: colors.green[800],
                    fontSize: mobile ? "" : 30,
                    fontWeight: "bold"
                }}
                >
                    &#8377; {price} PAY NOW
                </span>
            </Stack>

            <SwipeableDrawer
                anchor={!mobile ? "top" : "bottom"}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '& .MuiDrawer-paper': { height: mobile ? '100%' : '80%', overflow: "auto" },
                }}
            >
                <Box sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}>

                    <RenderUserLogin
                        setCreateOrderData={setCreateOrderData}
                        createOrderData={createOrderData}
                        setUserData={setUserData}
                        userData={userData as UserDataType}
                        selectedUser={selectedUser || null}
                        setSelectedUser={setSelectedUser}
                    />
                    <Box sx={{ display: 'flex', p: 2, justifyContent: 'center', gap: 1, }}>
                        {/* <Button variant="contained" sx={{}}>
                            Print
                        </Button> */}
                        <Button variant='contained' color='error' onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={isPending} onClick={() => handleCreate()} variant="contained" sx={{}} color='success'>
                            Create Order
                        </Button>

                    </Box>
                </Box>
            </SwipeableDrawer>





            <Dialog open={billOpen} onClose={() => handleCLosePRint()}
                fullWidth
                maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6" sx={{
                        fontWeight: "bold",
                        color: colors.green[800],
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        Invoice
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Box width={"100%"} >
                        <Container
                            style={{
                                padding: "5px",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "12px",
                                backgroundColor: "#f9f9f9",
                                height: "64vh",
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
                                {canteenData?.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                style={{ fontSize: "10px", color: "#555", marginBottom: "5px" }}
                            >
                                {canteenData?.location || "Address Not Available"}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                style={{ fontSize: "10px", color: "#555", marginBottom: "10px" }}
                            >
                                Phone: {canteenData?.contact || "Not Available"} | Email:{" "}
                                {canteenData?.email || "Not Available"}
                            </Typography>


                            <TableContainer sx={{ border: "1px solid #ccc" }}>

                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                                Order ID:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right", padding: "8px" }}>{billData?.order_id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                                Order Date:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right", padding: "8px" }}>
                                                {moment().format("DD-MM-YYYY")}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                                Customer Name:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", textAlign: "right" }}>{billData?.customer_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                                Customer Email:
                                            </TableCell>
                                            <TableCell style={{
                                                fontSize: "12px",
                                                textAlign: "right"
                                                , fontWeight: "bold", color: "#333", padding: "8px"
                                            }}>{billData?.customer_email || 'N/A'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px" }}>
                                                Customer Phone:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", textAlign: "right" }}>{billData?.customer_phone}</TableCell>
                                        </TableRow>


                                    </TableBody>

                                </Table>
                            </TableContainer>

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
                                    height: mobile ? "200px" : "200px",
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
                                        {billData?.items?.map((item) => (
                                            <TableRow key={item?.item_id}>
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
                                                <strong>₹{billData?.total_amount}</strong>
                                            </TableCell>
                                        </TableRow>

                                        {
                                            billData?.voucher && (
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
                                                        <strong>- ₹ {billData?.voucher_amt?.toString()}</strong>
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
                                                <strong>₹{billData?.payable_amt?.toString()}</strong>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Divider style={{ margin: "10px 0" }} />


                            <Divider style={{ margin: "10px 0" }} />

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
                                Thank you for visiting {canteenData?.name}!
                            </Typography>

                            {/* Print Button */}

                        </Container>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={() => handleCLosePRint()}
                        color="error">
                        Close
                    </Button>
                    <Button onClick={handlePrint} color="primary" variant='contained'>
                        <Print /> Download invoice
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}
