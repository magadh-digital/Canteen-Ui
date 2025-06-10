import { GridColDef } from "@mui/x-data-grid";


export const SellReportColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'SNO',
        width: 100,
    },
    {
        field: "name",
        headerName: "Product Name",
        width: 300
    },
    {
        field: 'qty',
        headerName: 'Quantity',
        width: 300
    },
    {
        field: 'total',
        headerName: 'Selling Price',
        width: 300
    },
]