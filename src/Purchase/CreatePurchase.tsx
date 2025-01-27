import { Button, colors, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import { AddPurcahseTypes } from '../AllTypes';

const CreatePurchase = () => {
    const [open, setOpen] = useState(true);
    const [purchaseData, setPurchaseData] = useState<AddPurcahseTypes>({
        supplier_id: '',
        purchase_date: '',
        refrence_no: '',
        notes: '',
        sub_total: 0,
        shipping_charges: 0,
        discount: 0,
        total_amount: 0,
        paid_amount: 0,
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Button variant="contained" onClick={handleOpen} color="success" size='small'>
                Create Purchase
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{
                '& .MuiDialog-paper': {
                    minWidth: '50vw',
                    height: '50vh',
                    borderRadius: '20px'
                }
            }}>
                <DialogTitle>
                    <Typography variant='h5' sx={{
                        color: colors.blue[500],
                        fontWeight: 'bold',
                        textDecoration: 'underline'
                    }}>
                        Create Purchase
                    </Typography>
                </DialogTitle>
                <DialogContent>

                </DialogContent>

                <DialogActions>
                    <Stack direction='row' spacing={2}>
                        <Button size='small' variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                        <Button size='small' variant='contained' color='success'>Create</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreatePurchase