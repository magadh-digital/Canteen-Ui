import { colors } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const SupplierColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70,

    },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        renderCell: ({ value }) => {
            return (
                <span style={{
                    textTransform: "capitalize",
                    color: colors.blue[500]
                }}>
                    {value}
                </span>
            )
        }
    },
    {
        field: 'contact',
        headerName: 'Contact',
        width: 130,
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 230,
    },

] 