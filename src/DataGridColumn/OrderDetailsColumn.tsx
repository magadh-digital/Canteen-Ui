import {  Chip, colors, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { GetOrderTypes } from "../AllTypes";
import { useDispatch } from "react-redux";
import { setItemViewData, setItemViewId, setOrderDetails } from "../AllStoreSlice/ItemViewSlice";
import moment from "moment";


export const OrderDetailsColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70,
    },
    {
        field: "canteen",
        headerName: "Canteen Name",
        width: 130,
        renderCell: ({ value }) => {
            return (
                <Stack direction="row" sx={{ alignItems: "center", height: "100%" }}>
                    <Typography sx={{ fontWeight: "bold", color: colors.blue[500] }}>{value.name}</Typography>
                </Stack>
            )
        }
    },
    {
        field: 'order_id',
        headerName: 'Order Id',
        width: 130
    },
    {
        field: 'customer_name',
        headerName: 'Customer Name',
        width: 230,
        renderCell: ({ value }) => {
            return (
                <Stack direction="row" sx={{ alignItems: "center", height: "100%" }}>
                    <Typography sx={{ fontWeight: "bold", color: colors.blue[500] }}>{value}</Typography>
                </Stack>
            )

        }
    },
    {
        field: 'customer_type',
        headerName: 'Type',
        width: 130,
        renderCell: ({ value }) => {
            return (
                <Stack direction="row" sx={{ alignItems: "center", height: "100%" }}>
                    <span style={{ color: colors.red[500] }}>{value}</span>
                </Stack>
            )
        }
    },
    {
        field: 'total_amount',
        headerName: 'Amount',
        width: 130,
        renderCell: ({ value }) => {
            return (
                <Stack direction="row" sx={{ alignItems: "center", height: "100%" }}>
                    <Typography sx={{ color: colors.green[500] }}>{value}</Typography>
                </Stack>
            )
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 230,
        renderCell: ({ value }) => {
            return (
                <Stack direction="row" sx={{ alignItems: "center", height: "100%" }}>
                    <Chip label={value} color="secondary" sx={{
                        fontWeight: "bold"
                    }} />
                </Stack>
            )
        }
    },
    {
        field: 'created_at',
        headerName: 'Created At',
        width: 180,
        renderCell: ({ value }) => {
            return (
                <span style={{ color: "grey" }}>{moment(value).format("DD-MM-YYYY")} </span>
            )
        }
    },

    {
        field: "action",
        headerName: "View Items",
        width: 180,
        renderCell: ({ row }: { row: GetOrderTypes }) => {
            const dispatch = useDispatch();
            const handleViewItem = () => {
                dispatch(setItemViewId(row.id))
                dispatch(setItemViewData(row.items))
                dispatch(setOrderDetails(row))
            }
            return (
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        height: "100%"
                    }}>

                        <p 
                         style={{
                            color: colors.blue[500],
                            cursor: "pointer",
                            fontWeight: "bold",
                            textDecoration: "underline",
                            textDecorationColor: colors.blue[500],
                            textDecorationThickness: "1px",

                         }}
                         onClick={handleViewItem}
                        >
                            view
                        </p>
                  
                </Stack>
            )
        }
    }
]