import { Box, Button, ButtonGroup, colors, Modal, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { ProductItemsEdit } from "../ProductList/ProductItemsEdit";
import { useDispatch } from "react-redux";
import { setAllMenuItems, setMenuItemId } from "../AllStoreSlice/AllMenuItemsSlice";
import { DeleteProductItem } from "../AllPostApi";
import { toast } from "react-toastify";

export const ProductItemsColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 230,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: colors.blue[500] }}>{value}</Typography>
                </div>
            )
        }
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 130,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: colors.green[500] }}>{value}</Typography>
                </div>
            )
        }
    },

    {
        field: 'description',
        headerName: 'Description',
        width: 230
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 130
    },
    {
        field: 'unit',
        headerName: 'Unit',
        width: 130
    },
    {
        field: "created_at",
        headerName: "Created At",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: colors.grey[800] }}>{moment(value).format("DD-MM-YYYY")} </Typography>
                </div>
            )
        }
    },
    {
        field: 'url',
        headerName: 'Image',
        width: 130,
        renderCell: ({ value }) => {
            const [open, setOpen] = useState(false)
            const handleOpen = () => {
                setOpen(true)
            }
            return (
                <>
                    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                        <img src={value} width={"50px"} height={"50px"} onClick={handleOpen} />
                    </div>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 600,
                            bgcolor: "background.paper",
                            border: "0px solid #000",
                            boxShadow: 24,
                            p: 2,
                            height: "60vh",
                            borderRadius: "10px"
                        }}>
                            <img src={value} width={"100%"} height={"100%"} />
                        </Box>
                    </Modal>
                </>
            )
        }
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 230,
        renderCell: ({ row }) => {
            const dispatch = useDispatch()
            const { mutateAsync } = DeleteProductItem()

            const handleOpen = () => {
                dispatch(setMenuItemId(row.id))
                dispatch(setAllMenuItems(row))
            }

            const handleDeleteItem = async () => {
                const confirmed = window.confirm('Are you sure you want to delete this item?');
                try {
                    if (confirmed) {
                        await mutateAsync({ id: row.id })
                        toast.success("Product Deleted Successfully")
                    }
                } catch (error: any) {
                    toast.error(error.response.data.error)

                }
            }


            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <ButtonGroup size="small">
                        <Button variant="contained" onClick={handleOpen} size="small">Edit</Button>
                        <Button variant="contained" onClick={handleDeleteItem} color="error" size="small">Delete</Button>
                    </ButtonGroup>
                </div>
            )
        }
    }
]


