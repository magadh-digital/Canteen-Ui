import { Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GetOrderTypes, QuantityType } from "../AllTypes";
import { renderToString } from "react-dom/server";
import moment from "moment";
import { ToWords as toWord } from 'to-words'

const PrintUserData = ({
    data,
    order,
}: {
    data: QuantityType[];
    order: GetOrderTypes | null;
}) => {
    const [open, setOpen] = useState(false);
    const Toword = new toWord();

    const handlePrint = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (open && order) {
            const printWindow = window.open("", "_blank");
            if (!printWindow) return;

            const receiptContent = renderToString(
                <div
                    style={{
                        maxWidth: "100%",
                        fontFamily: "Arial, sans-serif",
                        textAlign: "center",
                    }}
                >
                    <div style={{ margin: 0, padding: 0 }}>
                        <h3 style={{ margin: "4px 0" }}>{order?.canteen?.name}</h3>
                        <p style={{ margin: "5px 0", fontSize: "12px" }}>
                            {moment(order?.created_at).format("DD MMM YYYY h:mm A")}
                        </p>
                        <p style={{ margin: "2px 0", fontSize: "12px" }}>Invoice ID: {order?.order_id}</p>
                        <p style={{ margin: "2px 0", fontSize: "12px" }}>Customer: {order?.customer_name}</p>
                        <hr style={{ borderTop: "1px dashed black", margin: "3px 0" }} />
                        <p style={{ margin: "2px 0", fontSize: "17px", fontWeight: "bold" }}>INVOICE</p>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px solid black", fontSize: "5px" }}>
                        <thead>
                            <tr style={{
                                borderBottom: "1px solid black",
                            }}>
                                <th style={{ textAlign: "left", fontSize: "8px" }}>SL</th>
                                <th style={{ textAlign: "left", fontSize: "8px" }}>Name</th>
                                <th style={{ textAlign: "right", fontSize: "8px" }}>Qty</th>
                                <th style={{ textAlign: "right", fontSize: "8px" }}>Price</th>
                                <th style={{ textAlign: "right", fontSize: "8px" }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={item?.item_id}>
                                    <td style={{ fontSize: "8px" }}>{index + 1}</td>
                                    <td style={{ fontSize: "8px" }}>{item.name}</td>
                                    <td style={{ textAlign: "right", fontSize: "8px" }}>{item.qty}</td>
                                    <td style={{ textAlign: "right", fontSize: "8px" }}>₹{item.price}</td>
                                    <td style={{ textAlign: "right", fontSize: "8px" }}>₹{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr style={{ borderTop: "1px dashed black", margin: "1px 0" }} />
                    <table style={{ width: "100%", borderCollapse: "collapse", }}>
                        <tbody>
                            <tr >
                                <td style={{ textAlign: "right", fontSize: "8px" }}>Total Amt:</td>
                                <td style={{ textAlign: "right", fontSize: "8px" }}>₹{order?.total_amount}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right", fontSize: "8px" }}>Total Due:</td>
                                <td style={{ textAlign: "right", fontSize: "8px" }}>₹{order?.total_amount}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right" ,fontSize: "8px" }}>Voucher:</td>
                                <td style={{ textAlign: "right", fontSize: "8px" }}> -₹{Number(order?.voucher_amt ?? 0)}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right",fontSize: "8px" }}>Paid Amount:</td>
                                <td style={{ textAlign: "right" }}>₹{Number(order?.payable_amt ?? 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr style={{ borderTop: "1px dashed black", margin: "1px 0" }} />
                    <p style={{ fontStyle: "italic",fontSize: "8px" }}>In Text: {Toword.convert(Number(order?.total_amount ?? 0))}</p>
                </div >
            );

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice</title>
                       <style>
                               @page {
                                    size: auto; 
                                       margin: 3mm; 
                                    }
                                body {
                                    font-family: Arial, sans-serif;
                                     text-align: center;
                                     margin: 0;
                                     padding: 0;
                                     }
                                 table {
                                     width: 100%;
                                     margin-top: 10px;
                                     border-collapse: collapse;
                                      }
                                 td, th {
                                     padding: 3px;
                                     font-size: 12px;
                                       }
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
        <Button variant="contained" color="success" onClick={handlePrint} size="small">
            <Print />
        </Button>
    );
};

export default PrintUserData;
