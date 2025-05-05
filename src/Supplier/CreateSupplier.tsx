
import { Button, colors, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify';
import { CreateSupplierApi } from '../AllPostApi';

const CreateSupplier = () => {
    const mobile = useMediaQuery("(max-width:800px)")
    const [open, setOpen] = React.useState(false);
    const { mutateAsync } = CreateSupplierApi()
    const [createSupplierData, setCreateSupplierData] = React.useState({
        name: "",
        contact: "",
        address: ""
    });
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setCreateSupplierData({
            name: "",
            contact: "",
            address: ""
        })
        setOpen(false);
    }
    const handleAddSupplier = async () => {
        const data = {
            name: createSupplierData.name,
            contact: Number(createSupplierData.contact),
            address: createSupplierData.address
        }
        try {
            await mutateAsync({
                data: data
            })
            handleClose()
            toast.success("Supplier Created Successfully")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
            <Button variant="contained" size='small' onClick={handleClickOpen}>
                Create Supplier
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    '& .MuiPaper-root': {
                        height: mobile ? "50%" : "auto",
                        width: mobile ? "auto" : "40%",
                        display: "flex",
                        boxSizing: "border-box",
                        justifyContent: "center",
                        borderRadius: "20px",
                        m: "auto"
                    }
                }}
            >

                <DialogTitle>
                    <Typography variant='h6' sx={{
                        fontWeight: "bold",
                        color: colors.blue[500],
                        textDecoration: "underline"
                    }}>
                        Create Supplier
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <Stack spacing={2}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}>
                            <Typography>Name</Typography>
                            <TextField
                                size='small'
                                value={createSupplierData.name}
                                onChange={(e) => {
                                    setCreateSupplierData({
                                        ...createSupplierData,
                                        name: e.target.value
                                    })
                                }}
                            />
                        </Stack>
                        <Stack spacing={2}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography>Contact</Typography>
                            <TextField
                                size='small'
                                value={createSupplierData.contact}
                                onChange={(e) => {
                                    setCreateSupplierData({
                                        ...createSupplierData,
                                        contact: e.target.value
                                    })
                                }}
                            />
                        </Stack>
                        <Stack spacing={2}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography>Address</Typography>
                            <TextField
                                size='small'
                                value={createSupplierData.address}
                                onChange={(e) => {
                                    setCreateSupplierData({
                                        ...createSupplierData,
                                        address: e.target.value
                                    })
                                }}
                            />
                        </Stack>

                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack
                        direction="row"
                        spacing={2}
                        p={2}
                    >
                        <Button size='small' color='error' variant='contained' onClick={handleClose}>Cancel</Button>
                        <Button size='small' variant='contained' onClick={handleAddSupplier}>Save</Button>
                    </Stack>
                </DialogActions>


            </Dialog >
        </>
    )
}

export default CreateSupplier