import { Print } from '@mui/icons-material';
import { Button, } from '@mui/material';
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
                <section className="receipt-template">
                    <header className="receipt-header">
                        <h2 className="store-name">{order?.canteen?.name}</h2>
                    </header>

                    <section className="info-area">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="w-30"><span>Date:</span></td>
                                    <td>{moment(order?.created_at).format("DD MMM YYYY")}</td>
                                </tr>
                                <tr>
                                    <td className="w-30"><span>Invoice ID:</span></td>
                                    <td>{order?.order_id}</td>
                                </tr>
                                <tr>
                                    <td className="w-30">Customer Name:</td>
                                    <td>{order?.customer_name}</td>
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
                                {order?.items?.map((item, index) => (
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
                                    <td>₹{order?.total_amount}</td>
                                </tr>
                                <tr>
                                    <td className="w-70">Voucher:</td>
                                    <td>₹{Number(order?.voucher_amt ?? 0)}</td>
                                </tr>
                                <tr>
                                    <td className="w-70">Amount Paid:</td>
                                    <td>₹{Number(order?.payable_amt ?? 0)}</td>
                                </tr>
                                <tr>
                                    <td className="w-70">Due:</td>
                                    <td>₹{Number(order?.total_amount) - Number(order?.payable_amt)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="info-area italic">
                        <span className="text-small"><b>In Text:</b> {toWord.convert(Number(order?.total_amount ?? 0))}</span>
                    </section>
                    <section style={{ marginTop: "5px", fontWeight: 800 }}>
                        <span className="duplicate-tag">DUPLICATE</span>
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
    font-size: 14px;
    color: red;
    font-weight: 800;
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
    font-weight: 600;
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
