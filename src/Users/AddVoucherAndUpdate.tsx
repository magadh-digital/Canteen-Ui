import { Button, ButtonGroup, colors, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Add, GridViewOutlined, } from '@mui/icons-material'
import { AddVoucherAndUpdate, } from '../AllPostApi'
import EditAndUpdateUsers from './EditAndUpdateUsers'
import { CanteenUserDataType, UserVoucherTypes, } from '../AllTypes'
import axios from 'axios'
import { baseUrl } from '../ApiEndPoint'
import { ErrorHandle } from '../ErrorHandle'


export const AddVoucher = ({ user_id, data }: { user_id: string, data: CanteenUserDataType }) => {
    const [open, setOpen] = useState(false)
    const [openVoucher, setOpenVoucher] = useState(false)
    const [voucherDataGet, setVoucherDataGet] = useState<UserVoucherTypes | null>(null)
    const [page, setPage] = useState(1)
    const limit = 10
    const [voucherData, setVoucherData] = useState({
        description: "",
        amount: 0,
    })
    
    
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${baseUrl}/voucher/?user_id=${user_id}`,{
                params: {
                    page,
                    limit
                }
            })
            setVoucherDataGet(res.data)
            return res.data as UserVoucherTypes
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    }
    
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
    const totalPages = Math.ceil((voucherDataGet?.total || 0) / limit)
    const { mutateAsync } = AddVoucherAndUpdate()
    // const { mutateAsync: deleteUser } = GetCanteenUserDelete()
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setVoucherData({
            description: "",
            amount: 0,
        })
        setOpen(false)
        setPage(1)
    }
    const handleSubmitVoucher = async () => {
        try {
            const res = await mutateAsync({
                data: {
                    ...voucherData,
                    user_id: user_id
                }
            })
            if (res?.status === 200) {
                toast.success(res.data.message)
                handleClose()
            }
        } catch (error: any) {
            ErrorHandle(error.response)
            // toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        if (openVoucher) {
            fetchUser()
        }
    }, [page, openVoucher])
    
    // const handleDeleteUser = async () => {
    //     try {
    //         const res = await deleteUser({ id: user_id })
    //         if (res.status === 200) {
    //             toast.success(res.data.message)
    //         }
    //     } catch (error: any) {
    //         toast.error(error.response.data.message)
    //     }
    // }

    const handleViewVoucher = () => {
        setPage(1) 
        setOpenVoucher(true) 
    }

    return (
        <>
            <ButtonGroup size="small">
                <Button size="small" onClick={handleOpen}>
                    <Add />
                </Button>
                <Button size="small" onClick={handleViewVoucher}>
                    <GridViewOutlined />
                </Button>
                <EditAndUpdateUsers user_id={user_id} data={data} />
                {/* <Button size="small" onClick={handleDeleteUser}>
                    <Delete color="error" />
                </Button> */}
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
            <Dialog open={openVoucher} onClose={() => setOpenVoucher(false)} sx={{
                "& .MuiDialog-paper": {
                    minWidth: "600px",
                    borderRadius: "10px",
                    maxHeight: "400px",
                    minHeight: "400px",

                },
            }}>
                <DialogTitle>
                    All Voucher
                </DialogTitle>
                <DialogContent sx={{
                    "&::-webkit-scrollbar": {
                        width: "5px",
                        height: "5px"
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#888"
                    },
                }}>
                    <table style={{
                        width: "100%",
                        maxHeight: "200px",
                        minHeight: "200px",
                        overflowX: "hidden",
                        overflowY: "scroll",
                    }}>
                        <thead style={{ position: "sticky", top: "0px", zIndex: "1" }}>
                            <tr>
                                <th>OrderId</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voucherDataGet?.vouchers?.map((item, idx: number) => {
                                const color = Number(item?.amount ?? 0) > 0 ? "green" : "red"
                                return (
                                    <tr key={idx}>
                                        <td>{item?.order_id || ""}</td>
                                        <td>{item.description || "-"}</td>
                                        <td style={{
                                            color: color
                                        }}>{Number(item?.amount ?? 0)}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Pagination
                        page={page}
                        count={totalPages}
                        onChange={handlePageChange}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: colors.green[500]
                            }
                        }}
                    />
                </DialogActions>
            </Dialog>
        </>

    )
}