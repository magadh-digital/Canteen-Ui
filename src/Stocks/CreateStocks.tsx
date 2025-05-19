import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { AddStockItemType } from '../AllTypes';
import { CreateStockItemApi } from '../AllPostApi';
import { toast } from 'react-toastify';
import { ErrorHandle } from '../ErrorHandle';

const CreateStocks = (refetch: any) => {
    const [open, setOpen] = React.useState(false);
    const [AddStock, setAddStock] = React.useState<AddStockItemType>({
        name: "",
        description: "",
        unit: "KG"
    })
    const { mutateAsync } = CreateStockItemApi()
    const handleClose = () => {
        setOpen(false)
        setAddStock({
            name: "",
            description: "",
            unit: "KG"
        })
    }
    const handleSaveStockData = async () => {
        if (!AddStock.name) {
            toast.error("Please Enter Stock Name")
            return
        }
        if (!AddStock.description) {
            toast.error("Please Enter Stock Description")
            return
        }
        if (!AddStock.unit) {
            toast.error("Please Enter Stock Unit")
            return
        }
        
        try {
            const res = await mutateAsync({
                data: AddStock
            })
            if (res?.status === 200) {
                toast.success("Stock Created Successfully")
                handleClose();
                refetch();
            }
        } catch (error: any) {
            ErrorHandle(error.response)
            handleClose()
        }

    }
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" color="success">
                Create Stock
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} sx={{
                "& .MuiDialog-paper": {
                    width: "auto",
                    borderRadius: "25px"
                }
            }}>
                <DialogTitle>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "#e74c3c",
                        textAlign: "center"
                    }}>
                        Create Stock
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                    }}>
                        <Box sx={{
                            width: "900px",
                            marginTop: "auto",
                            p: 5
                        }}>
                            <Grid container spacing={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography>Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>

                                        <TextField
                                            size='small'
                                            value={AddStock.name}
                                            sx={{ width: "300px" }}
                                            onChange={(e) =>
                                                setAddStock({
                                                    ...AddStock,
                                                    name: e.target.value
                                                })} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Description</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            size='small'
                                            value={AddStock.description}
                                            onChange={(e) => setAddStock({
                                                ...AddStock,
                                                description: e.target.value
                                            })}
                                            sx={{ width: "300px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Unit</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl>
                                            <Select
                                                size='small'
                                                value={AddStock.unit}
                                                onChange={(e) => setAddStock({
                                                    ...AddStock,
                                                    unit: e.target.value
                                                })}
                                                sx={{ width: "300px" }}
                                            >
                                                <MenuItem value="KG">KG</MenuItem>
                                                <MenuItem value="PIECE">PIECE</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Stack direction='row' justifyContent={"flex-end"}>
                        <Button
                            variant='contained'
                            color='success'
                            size='small'
                            sx={{
                                mt: 2,
                            }}
                            onClick={handleSaveStockData}>Save</Button>
                    </Stack>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default CreateStocks