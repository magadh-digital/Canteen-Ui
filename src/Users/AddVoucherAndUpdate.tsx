import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Add, Delete, } from '@mui/icons-material'
import { AddVoucherAndUpdate, GetCanteenUserDelete } from '../AllPostApi'
import EditAndUpdateUsers from './EditAndUpdateUsers'
import { CanteenUserDataType, } from '../AllTypes'


export const AddVoucher = ({ user_id, data }: { user_id: string, data: CanteenUserDataType }) => {
    const [open, setOpen] = useState(false)
    const [voucherData, setVoucherData] = useState({
        description: "",
        amount: 0,
    })
    const { mutateAsync } = AddVoucherAndUpdate()
    const { mutateAsync: deleteUser } = GetCanteenUserDelete()
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setVoucherData({
            description: "",
            amount: 0,
        })
        setOpen(false)
    }
    const handleSubmitVoucher = async () => {
        try {
            const res = await mutateAsync({
                data: {
                    ...voucherData,
                    user_id: user_id
                }
            })
            if (res.status === 200) {
                toast.success(res.data.message)
                handleClose()
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    const handleDeleteUser = async () => {
        try {
            const res = await deleteUser({ id: user_id })
            if (res.status === 200) {
                toast.success(res.data.message)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <ButtonGroup size="small">
                <Button size="small" onClick={handleOpen}>
                    <Add />
                </Button>
                <EditAndUpdateUsers user_id={user_id} data={data} />
                <Button size="small" onClick={handleDeleteUser}>
                    <Delete color="error" />
                </Button>
            </ButtonGroup>
            <Dialog open={open} onClose={handleClose} sx={{
                "& .MuiDialog-paper": {
                    minWidth: "500px",
                    borderRadius: "10px"
                }
            }}>
                <DialogTitle>
                    <Typography variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main"
                        }}>
                        Add Voucher
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} direction={"row"} mt={2}>
                        <TextField
                            label="description"

                            variant="outlined"
                            size="small"
                            sx={{
                                width: "300px"
                            }}
                            value={voucherData?.description}
                            onChange={(e) => setVoucherData({ ...voucherData, description: e.target.value })}
                        />
                        <TextField
                            label="amount"
                            variant="outlined"
                            size="small"
                            sx={{
                                width: "300px"
                            }}
                            value={voucherData?.amount}
                            onChange={(e) => setVoucherData({ ...voucherData, amount: +e.target.value })}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmitVoucher}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}