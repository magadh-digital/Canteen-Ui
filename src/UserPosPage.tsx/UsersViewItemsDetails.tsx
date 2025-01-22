

import { Box, Checkbox, colors, FormControl, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { CreateOrderType, MenuItemType } from '../AllTypes'
import { useEffect, useState } from 'react'
import { setPrice } from '../AllStoreSlice/PriceAndQuantitySlice'
import { UserDataType } from './UserRenderUserLogin'
import { GetReamainingVoucherApi } from '../AllGetApi'
import { toast } from 'react-toastify'


const UsersViewItemsDetails = ({ userData,
    setCreatedOrderData,
    createdOrderData,
    setUserData
}: {
    userData: UserDataType,
    setCreatedOrderData: React.Dispatch<React.SetStateAction<CreateOrderType>>,
    createdOrderData: CreateOrderType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>

}) => {
    const [voucherChecked, setVoucherChecked] = useState(false)
    const { orderData: data, price: totalPrice, quantity } = useSelector((state: RootState) => state.PriceAndQuantity)
    const rateCheck = () => {
        const value = data.reduce((acc, item: MenuItemType) => acc + item.price * (item.quantity ?? 0), 0)
        return value
    }
    const [alertVouhcer, setAlertVoucher] = useState(false)
    const { data: voucherData, isLoading } = GetReamainingVoucherApi({
        user_id: userData?.user.id || ""
    })

    useEffect(() => {
        if ((userData?.vouchers ?? 0) > 0) {
            setAlertVoucher(true)
            toast.success("Great You Have Voucher")
        } else {
            setAlertVoucher(false)
        }
    }, [userData?.vouchers])
    useEffect(() => {
        if (voucherData) {
            setUserData((prevState) => ({
                ...prevState,
                vouchers: voucherData.vouchers,
            }));
        }
    }, [voucherData]);
    const totalPayableAmount = () => {
        if (voucherChecked) {
            const rate = totalPrice - (userData?.vouchers ?? 0);
            return rate > 0 ? rate : 0;
        }
        return data.reduce(
            (acc, item: MenuItemType) => acc + item.price * (item.quantity ?? 0),
            0
        );
    };
    const [selectPyment, setSelectPyment] = useState("CASH")
    const mobile = useMediaQuery('(max-width: 800px)')
    const checkedVoucher = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherChecked(event.target.checked);
        setCreatedOrderData((prevState) => ({
            ...prevState,
            voucher: event.target.checked,
            total_amount: totalPayableAmount(),
        }));
    };

    useEffect(() => {
        setCreatedOrderData((prevState) => ({
            ...prevState,
            total_amount: totalPayableAmount(),
            voucher: voucherChecked,
        }));
    }, [voucherChecked, userData.vouchers, totalPrice]);


    return (
        <Box sx={{
            mt: 2
        }}>
            <TableContainer
                sx={{
                    height: "auto",
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                    "&::-webkit-scrollbar": {
                        width: "4px",
                        backgroundColor: "#F5F5F5"
                    }
                }}>
                <Table stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{
                                backgroundColor: colors.grey[100]
                            }}>
                                S No
                            </TableCell>
                            <TableCell sx={{
                                backgroundColor: colors.grey[100]
                            }}>
                                Item Name
                            </TableCell>
                            <TableCell sx={{
                                backgroundColor: colors.grey[100]
                            }}>
                                Quantity
                            </TableCell>
                            <TableCell sx={{
                                backgroundColor: colors.grey[100]
                            }}
                                align='right'
                            >
                                Price
                            </TableCell>
                            <TableCell sx={{
                                backgroundColor: colors.grey[100]
                            }}
                                align='right'
                            >
                                Total Amount
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        data.map((item: MenuItemType, index) => (
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell align='right'>{item.price}</TableCell>
                                    <TableCell align='right'>{item.price * (item.quantity ?? 0)}</TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    }

                </Table>
            </TableContainer>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }}>
                <TableContainer>
                    <Table aria-label="spanning table" sx={{ border: "none" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={2} sx={{ border: "none", padding: "4px" }}></TableCell>
                                <TableCell align="right" colSpan={3} sx={{ color: "blue", border: "none" }}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={4} sx={{ border: "none", padding: "6px" }}></TableCell>
                                <TableCell colSpan={2} sx={{ border: "none", padding: "6px" }}>Quantity</TableCell>
                                <TableCell align="right" sx={{ border: "none", padding: "6px" }}>{quantity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ border: "none", padding: "6px" }}>Total Price</TableCell>
                                <TableCell align="right" sx={{ border: "none", padding: "6px" }}>{rateCheck()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ border: "none", padding: "6px", }}>Voucher</TableCell>
                                <TableCell align="right" sx={{ border: "none", padding: "6px" }} colSpan={2}>{userData?.vouchers}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ border: "none", padding: "6px" }}>Total Payable Amount</TableCell>
                                <TableCell align="right" sx={{ border: "none", padding: "6px" }}>{totalPayableAmount()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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

export default UsersViewItemsDetails