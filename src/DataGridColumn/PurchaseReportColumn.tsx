import { GridColDef } from "@mui/x-data-grid";


export const PurchaseReportColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'SNO',
        width: 80,
    },
    {
        field: "purchase_date",
        headerName: "Date",
        width: 140
    },
    {
        field: "reference_no",
        headerName: "Reference No",
        width: 150
    },
    {
        field: "supplier",
        headerName: "Supplier Name",
        width: 200
    },
    {
        field: 'paid_amount',
        headerName: 'Paid Amount',
        width: 140,
        renderCell: ({ value }) => {
            return (
                <span> {"₹"}{value}</span>
            )
        }
    },
    {
        field: 'due',
        headerName: 'Due Payment',
        width: 140,
        renderCell: ({ value }) => {
            return (
                <span> {"₹"}{value}</span>
            )
        }
    },
    {
        field: 'total_amount',
        headerName: 'Total Amount',
        width: 140,
        renderCell: ({ value }) => {
            return (
                <span> {"₹"}{value}</span>
            )
        }
    },

]