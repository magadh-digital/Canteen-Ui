import { Box, Button, colors, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Pagination, Stack, TableContainer, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { GetStockTypes } from "../AllTypes";
import { useDispatch, useSelector } from "react-redux";
import { setStocksItemView } from "../AllStoreSlice/StocksItemViewSlice";
import { RootState } from "../Store";
import { baseUrl } from "../ApiEndPoint";
import axios from "axios";
import { toast } from "react-toastify";
import { GetStockDetailsApi } from "../AllGetApi";
import moment from "moment";

export const StockItemColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70
    },
    {
        field: "name",
        headerName: "Stocks Name",
        width: 200,
        renderCell: ({ value }) => {
            return (
                <Stack sx={{
                    color: colors.blue[500]
                }}>
                    {value}
                </Stack>
            )
        }
    },
    {
        field: "description",
        headerName: "Description",
        width: 200,
        renderCell: ({ value }) => {
            return (
                <Stack direction={"row"} sx={{ alignItems: "center", height: "100%" }}>
                    <Typography sx={{
                        fontSize: "12px"
                    }}>
                        {value}
                    </Typography>
                </Stack>
            )
        }
    },
    {
        field: 'remaining',
        headerName: 'Remaining',
        width: 150,
        renderCell: ({ value }) => {
            return (
                <Stack direction={"row"} sx={{ alignItems: "center", height: "100%" }}>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: colors.red[500]
                    }}>
                        {value.remaining} ({value?.unit})
                    </Typography>
                </Stack>
            )
        }
    },
    {
        field: 'view',
        headerName: 'View Details',
        width: 100,
        renderCell: ({ row }) => {
            const dispatch = useDispatch()

            return (
                <Stack direction={"row"} sx={{ alignItems: "center", height: "100%" }}>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: colors.blue[500],
                        textDecoration: "underline",
                        cursor: "pointer"
                    }}
                        onClick={() => {
                            dispatch(setStocksItemView(row?.ID))
                        }}
                    >
                        View
                    </Typography>
                </Stack>
            )
        }
    }
]


export const ViewStocksDetails = () => {
    const dispatch = useDispatch()
    const { stockId } = useSelector((state: RootState) => state.stocksItemView)
    const { data, isLoading } = GetStockDetailsApi({ id: stockId })
    const handleClose = () => {
        dispatch(setStocksItemView(""))
    }


    return (
        <>
            <Dialog
                open={stockId !== ""}
                onClose={() => handleClose()}
                sx={{
                    '& .MuiDialog-paper': {
                        minWidth: '40vw',
                        minHeight: 'auto',
                        borderRadius: '20px',
                        maxHeight: 'auto',
                        overflow: 'auto',
                    },
                    '& .MuiDialog-paper::-webkit-scrollbar': {
                        width: '4px',
                        backgroundColor: '#F5F5F5',
                    }
                }}
            >
                <DialogTitle>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: colors.green[500]
                    }}>
                        Stocks Items Details
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{
                    overflow: "auto",
                    height: "100%",
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        backgroundColor: '#F5F5F5',
                    }
                }}>
                    {isLoading ? <Typography>Loading...</Typography> : (
                        <TableContainer component={Box} sx={{
                            height: "300px", width: "100%",
                            '&::-webkit-scrollbar': {
                                width: '4px',
                                backgroundColor: '#F5F5F5',
                            }
                        }} >
                            <table className="table-container">
                                <thead>
                                    <tr>
                                        <th>Remarks</th>
                                        <th>Date & Time</th>
                                        <th>Unit</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.map((item, index: number) => (
                                        <tr style={{
                                            backgroundColor: item?.quantity > 0 ? "#d4edda" : "#f8d7da"
                                        }} key={index}>
                                            <td>{item.remarks}</td>
                                            <td>{moment(item?.created_at).format("DD-MM-YYYY HH:mm")}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </TableContainer>
                    )}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop:"10px"
                    }}>
                        <Pagination
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: colors.green[500]
                                },
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "center",
                            }}
                            page={1}
                            color="primary"
                            count={data?.total}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => handleClose()}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}