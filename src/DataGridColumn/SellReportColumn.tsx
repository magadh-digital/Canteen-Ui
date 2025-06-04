import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";


export const SellReportColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'SNO',
        width: 100,
    },
    {
        field: 'created_at',
        headerName: 'Created At',
        width: 300,
        renderCell: (value) => {
            return (
                <>{moment(value.row.created_at).format("DD-MM-YYYY")}</>
            )

        }
    },
    {
        field: "customer_name",
        headerName: "Customer Name",
        width: 300
    },
    {
        field: 'product_name',
        headerName: 'Product Name',
        width: 300
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 300
    },
    {
        field: 'selling_price',
        headerName: 'Selling Price',
        width: 300
    }
]