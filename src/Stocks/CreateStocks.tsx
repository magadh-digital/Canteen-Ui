import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { AddStockItemType } from '../AllTypes';
import { CreateStockItemApi } from '../AllPostApi';

const CreateStocks = () => {
    const [open, setOpen] = React.useState(false);
    const [AddStock, setAddStock] = React.useState<AddStockItemType>({
        name: "",
        description: ""
    })
    const { mutateAsync } = CreateStockItemApi()
    const handleSaveStockData = async () => {
        try {
            await mutateAsync({
                data: AddStock
            })
            setOpen(false)
            setAddStock({
                name: "",
                description: ""
            })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" color="success">
                Create Stock
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} sx={{
                "& .MuiDialog-paper": {
                    width: "50%"
                }
            }}>
                <DialogTitle>
                    <Typography>Create Stock</Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack>
                        <Typography>Name</Typography>
                        <TextField value={AddStock.name} onChange={(e) => setAddStock({ ...AddStock, name: e.target.value })} />
                        <Typography>Description</Typography>
                        <TextField value={AddStock.description} onChange={(e) => setAddStock({ ...AddStock, description: e.target.value })} />
                        <Button onClick={handleSaveStockData}>Save</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateStocks