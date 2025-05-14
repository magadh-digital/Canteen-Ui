import { Box, Checkbox, colors, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { CreateOrderType, MenuItemType } from '../AllTypes'
import { useEffect, useState } from 'react'
import { UserDataType } from './RenderUserLogin'
import { setPrice } from '../AllStoreSlice/PriceAndQuantitySlice'


const ViewItemsDetails = ({ userData,
    setCreatedOrderData,
    createdOrderData
}: {
    userData: UserDataType,
    setCreatedOrderData: React.Dispatch<React.SetStateAction<CreateOrderType>>,
    createdOrderData: CreateOrderType

}) => {
    const dispatch = useDispatch()
    const [voucherChecked, setVoucherChecked] = useState(false)
    const [alertVouhcer, setAlertVoucher] = useState(false)

    useEffect(() => {
        if ((userData?.vouchers ?? 0) > 0) {
            setAlertVoucher(true)
        } else {
            setAlertVoucher(false)
        }
    }, [userData?.vouchers])


    const { data } = useSelector((state: RootState) => state.Quantity)
    const rateCheck = () => {
        const value = data.reduce((acc, item: MenuItemType) => acc + item.price * (item.quantity ?? 0), 0)
        return value
    }

    const totalPrice = data?.reduce((acc, item: MenuItemType) => acc + item.price * (item.quantity ?? 0), 0)
    const totalPaybaleAmount = () => {
        if (voucherChecked) {
            const rate = totalPrice - (userData?.vouchers ?? 0)
            if (rate > 0) {
                return rate
            } else {
                return 0
            }
        } else {
            return rateCheck()
        }
    }

    const [selectPyment, setSelectPyment] = useState("CASH")
    const mobile = useMediaQuery('(max-width: 800px)')
    const checkedVoucher = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (voucherChecked === true) {
            dispatch(setPrice(totalPaybaleAmount()))
        }
        if (voucherChecked === false) {
            const ratePrice = data?.reduce((acc, item: MenuItemType) => acc + item.price * (item.quantity ?? 0), 0)
            dispatch(setPrice(ratePrice))
        }
        setVoucherChecked(event.target.checked)
        setCreatedOrderData((prevState) => ({
            ...prevState,
            voucher: event.target.checked,
            total_amount: totalPaybaleAmount(),
            payable_amt: totalPaybaleAmount()
        }))
    }

    useEffect(() => {
        setCreatedOrderData((prevState) => ({
            ...prevState,
            total_amount: totalPaybaleAmount(),
            payable_amt: totalPaybaleAmount(),
            voucher: voucherChecked


            
        }))
    }, [voucherChecked, userData?.vouchers, totalPrice])

    const voucherAmountRender = () => {
        if (alertVouhcer) {
            if (rateCheck() < (userData?.vouchers ?? 0)) {
                return rateCheck()

            }
            if (rateCheck() > (userData?.vouchers ?? 0)) {
                return (userData?.vouchers ?? 0)
            }

        } else {
            return 0
        }
    }
    useEffect(() => {
        setCreatedOrderData((prevState) => ({
            ...prevState,
            total_amount: totalPaybaleAmount(),
            payable_amt: totalPaybaleAmount(),
            payment_type: selectPyment ? selectPyment : "CASH",
            voucher: voucherChecked,
            status: "COMPLETED"
        }))
    }, [createdOrderData])

    return (
        <Box sx={{
            padding: mobile ? 1 : 0
        }}>

            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: "none",
                    border: "1px solid #e0e0e0",
                    borderRadius: "5px",
                    overflowY: "auto",
                    maxHeight: "300px",
                    minHeight: "100px",
                    width: "100%",
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: colors.grey[400],
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: colors.grey[600],
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: colors.grey[200],
                    }
                }}
            >
                <Table size="small" stickyHeader >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{
                                    fontSize: "12px",
                                    padding: "8px",
                                    color: "#555",
                                    backgroundColor: colors.grey[100],
                                    width: "20%"
                                }}
                            >
                                Item
                            </TableCell>
                            <TableCell
                                style={{
                                    fontSize: "12px",
                                    padding: "8px",
                                    textAlign: "center",
                                    color: "#555",
                                    backgroundColor: colors.grey[100],
                                    width: "20%"
                                }}
                            >
                                Qty
                            </TableCell>
                            <TableCell
                                style={{
                                    fontSize: "12px",
                                    padding: "8px",
                                    textAlign: "right",
                                    color: "#555",
                                    backgroundColor: colors.grey[100],
                                    width: "20%"
                                }}
                            >
                                Price
                            </TableCell>
                            <TableCell
                                style={{
                                    fontSize: "12px",
                                    padding: "8px",
                                    textAlign: "right",
                                    color: "#555",
                                    backgroundColor: colors.grey[100],
                                    width: "20%"
                                }}
                            >
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {data?.map((item: MenuItemType) => (

                            <TableRow key={item.id}>
                                <TableCell style={{ fontSize: "12px", padding: "8px" }}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems={"center"}

                                    >

                                        <img
                                            src={item.image_url}
                                            alt="logo"
                                            style={{

                                                width: "30px",
                                                height: "30px"
                                            }}
                                        />
                                        <Typography sx={{ color: colors.grey[800], fontSize: "13px" }}>{item.name}</Typography>


                                    </Stack>

                                </TableCell>
                                <TableCell
                                    style={{
                                        fontSize: "12px",
                                        padding: "8px",
                                        textAlign: "center",
                                        width: "20%"
                                    }}
                                >
                                    {item.quantity}
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontSize: "12px",
                                        padding: "8px",
                                        textAlign: "right",
                                        width: "20%"
                                    }}
                                >
                                    ₹{item.price}
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontSize: "12px",
                                        padding: "8px",
                                        textAlign: "right",
                                        width: "10%"
                                    }}
                                >
                                    ₹{item.price * (item.quantity ?? 0)}
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: "none",
                    border: "1px solid #e0e0e0",
                    borderRadius: "5px",
                    width: "100%",
                    mt: 0
                }}
            >
                <Table>
                    <TableBody>
                        <TableRow sx={{
                            width: "100%"
                        }}>
                            <TableCell sx={{
                                fontSize: "12px",
                                padding: "8px",
                                backgroundColor: colors.grey[100],
                                width: "50%"
                            }}>
                                Sub Total
                            </TableCell>
                            <TableCell sx={{
                                fontSize: "12px",
                                padding: "8px",
                                bgcolor: colors.grey[100]
                            }}></TableCell>
                            <TableCell
                                colSpan={3}
                                style={{
                                    fontSize: "12px",
                                    padding: "8px",
                                    textAlign: "right",
                                }}
                            >
                                <strong>₹{
                                    rateCheck()
                                }</strong>
                            </TableCell>
                        </TableRow>
                        {(userData?.vouchers ?? 0) > 0 && (

                            <TableRow>
                                <TableCell colSpan={3} style={{
                                    fontSize: "12px", padding: "8px",
                                    backgroundColor: colors.grey[100],
                                    width: "50%"

                                }}>
                                    <strong>Voucher :</strong>
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontSize: "12px",
                                        padding: "8px",
                                        textAlign: "right",
                                        color: "green"
                                    }}
                                >
                                    <strong> ₹ {
                                        voucherAmountRender() || ""
                                    }</strong>
                                </TableCell>
                            </TableRow>



                        )}
                        <TableRow>
                            <TableCell colSpan={3} style={{
                                fontSize: "12px", padding: "8px",
                                backgroundColor: colors.grey[100],
                                width: "50%"

                            }}>
                                <strong>Payable :</strong>
                            </TableCell>
                            <TableCell
                                style={{
                                    fontSize: "12px",
                                    padding: "8px",
                                    textAlign: "right",
                                }}
                            >
                                <strong>-₹{totalPaybaleAmount().toString()}</strong>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>

            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }}>

            </Box>

            {alertVouhcer === true && (
                <div style={{
                    backgroundColor: colors.amber[200]
                }}>
                    <Stack m={3} alignItems={"center"} direction={"row"} justifyContent={"space-around"}>
                        <Typography color='red' fontWeight={"bold"} fontStyle={"italic"}>Use Voucher</Typography>
                        <Checkbox
                            size='small'
                            checked={voucherChecked}
                            onChange={(e) => {
                                checkedVoucher(e)
                            }}
                        />
                    </Stack>
                </div>
            )}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
            }}>
                <Typography sx={{ fontWeight: "bold", ml: 3 }}>
                    Select Payment Method
                </Typography>
                <FormControl sx={{
                    width: !mobile ? "300px" : "200px"
                }}

                >
                    <InputLabel id="demo-simple-select-label" >SELECT PAYMENT METHOD</InputLabel>
                    <Select
                        size='small'

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectPyment}
                        label="SELECT PAYMENT METHOD"
                        onChange={(e) => {
                            setCreatedOrderData({
                                ...createdOrderData,
                                payment_type: e.target.value
                            }),
                                setSelectPyment(e.target.value)
                        }}
                    >
                        <MenuItem value="CASH">Cash</MenuItem>
                        <MenuItem value="CARD">Card</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                    </Select>
                </FormControl>
            </div>

        </Box>
    )
}

export default ViewItemsDetails