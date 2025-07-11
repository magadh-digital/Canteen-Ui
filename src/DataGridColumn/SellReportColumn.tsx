import { GridColDef } from "@mui/x-data-grid";


export const SellReportColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'SNO',
        width: 100,
    },
    {
        field: "name",
        headerName: "ProductName",
        width: 300
    },
    {
        field: "unit_type",
        headerName: "UnitType",
        width: 150
    },
    {
        field: 'qty',
        headerName: 'Quantity',
        width: 300
    },
    {
        field: 'total',
        headerName: 'SellingPrice',
        width: 300,
        renderCell: ({ value }) => {
            return (
                <span> {"₹"}{value}</span>
            )
        }
    },
]