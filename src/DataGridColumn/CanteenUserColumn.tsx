import { colors, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";

export const CanteenUserColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 130,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: colors.blue[500] }}>{value}</Typography>
                </div>
            )

        }
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 230,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: "" }}>{value}</Typography>
                </div>
            )
        }
    },
    {
        field: 'contact',
        headerName: 'Contact',
        width: 130
    },
    {
        field: 'updated_at',
        headerName: 'Updated At',
        width: 180,
        renderCell: ({ value }) => {
            return (
                <span style={{ color: "red" }}>{moment(value).format("DD-MM-YYYY")} </span>
            )
        }
    },
    {
        field: 'created_at',
        headerName: 'Created At',
        width: 180,
        renderCell: ({ value }) => {
            return (
                <span style={{ color: "red" }}>{moment(value).format("DD-MM-YYYY")} </span>
            )
        }
    },
    {
        field: 'image_url',
        headerName: 'Image',
        width: 180
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 150
    },
]