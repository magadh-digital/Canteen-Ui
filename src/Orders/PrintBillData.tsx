import { Print } from '@mui/icons-material';
import { Button, Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetOrderTypes } from '../AllTypes';
import { renderToString } from 'react-dom/server';
import moment from 'moment';
import { ToWords } from 'to-words';

const PrintBillData = ({ data: order }: { data: GetOrderTypes | null }) => {
    const [open, setOpen] = useState(false);
    const toWord = new ToWords();
    const handlePrint = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (open && order) {
            const printWindow = window.open("", "_blank");
            if (!printWindow) return;

            const receiptContent = renderToString(
                <div style={{ maxWidth: "100%", margin: "auto", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
                    <h2>{order?.canteen?.name}</h2>
                    <p>{moment(order?.created_at).format("DD MMM YYYY h:mm A")}</p>
                    <p>Invoice ID: {order?.order_id}</p>
                    <p>Customer: {order?.customer_name}</p>
                    <hr style={{ borderTop: "1px dashed black" }} />
                    <h3>INVOICE</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px solid black" }}>
                        <thead>
                            <tr style={{
                                borderBottom: "1px solid black",
                            }}>
                                <th style={{ textAlign: "left" }}>SL</th>
                                <th style={{ textAlign: "left" }}>Name</th>
                                <th style={{ textAlign: "right" }}>Qty</th>
                                <th style={{ textAlign: "right" }}>Price</th>
                                <th style={{ textAlign: "right" }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.items?.map((item, index) => (
                                <tr key={item?.item_id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td style={{ textAlign: "right" }}>{item.qty}</td>
                                    <td style={{ textAlign: "right" }}>₹{item.price}</td>
                                    <td style={{ textAlign: "right" }}>₹{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr style={{ borderTop: "1px dashed black", margin: "10px 0" }} />
                    <table style={{ width: "100%", borderCollapse: "collapse", }}>
                        <tbody>
                            <tr >
                                <td style={{ textAlign: "right" }}>Total Amt:</td>
                                <td style={{ textAlign: "right" }}>₹{order?.total_amount}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right" }}>Total Due:</td>
                                <td style={{ textAlign: "right" }}>₹{order?.total_amount}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right" }}>Voucher:</td>
                                <td style={{ textAlign: "right" }}> -₹{Number(order?.voucher_amt ?? 0)}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right" }}>Paid Amount:</td>
                                <td style={{ textAlign: "right" }}>₹{Number(order?.payable_amt ?? 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr style={{ borderTop: "1px dashed black", margin: "10px 0" }} />
                    <p style={{ fontStyle: "italic" }}>In Text: {toWord.convert(Number(order?.total_amount ?? 0))}</p>
                </div>
            );

            printWindow.document.write(`
                    <html>
                        <head>
                            <title>Invoice</title>
                            <style>
                                body { font-family: Arial, sans-serif; text-align: center; }
                                table { width: 100%; margin-top: 10px; }
                                td, th { padding: 5px; }
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

            setOpen(false);
        }
    }, [order, open]);

    return (
        <Button
            variant="contained"
            color="success"
            onClick={handlePrint}
            style={{
                fontSize: "12px",
                textTransform: "none",
                backgroundColor: "#28a745",
            }}
            size="small"
        >
            <Print />
        </Button>
    );
};

export default PrintBillData;
