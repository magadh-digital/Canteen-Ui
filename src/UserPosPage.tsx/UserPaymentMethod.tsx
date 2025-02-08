import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Button, Stack, useMediaQuery, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { PostOrderCreateApi } from '../AllPostApi';
import { toast } from 'react-toastify';
import { CreateOrderType, MenuItemType } from '../AllTypes';
import { resetData } from '../AllStoreSlice/AddQuantitySlice';
import { UserRenderUserLogin } from './UserRenderUserLogin';
import { useNavigate } from 'react-router-dom';

const initialState: CreateOrderType = {
    total_amount: 0,
    customer_name: "",
    user_id: "",
    items: [],
    status: "COMPLETED",
    payment_type: "CASH",
    customer_type: "",
    canteen_id: "",
    voucher: false,
}

export default function UserPaymentMethod({ canteen_id }: { canteen_id: string }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createOrderData, setCreateOrderData] = React.useState(initialState)
    const { mutateAsync: orderCreate } = PostOrderCreateApi()
    const mobile = useMediaQuery("(max-width:800px)")
    const { orderData, price, } = useSelector((state: RootState) => state.PriceAndQuantity)
    const { user: userData } = useSelector((state: RootState) => state.LoginSlice)
    const handleCreate = async () => {
        const changeItemData = orderData.map((item: MenuItemType) => ({
            qty: item.quantity ?? 0,
            item_id: item.id ?? "",
            price: item.price,
            name: item.name,
            total: item.price * (item.quantity ?? 0)
        }))
        const data = {
            ...createOrderData,
            user_id: userData?.id || "",
            customer_name: userData?.name || "WALKING",
            customer_type: "USER",
            canteen_id: canteen_id,
            items: changeItemData,
        }

        try {
            const res = await orderCreate({ data })
            if (res.status === 201) {
                toast.success("Order Created Successfully")
                setOpen(false)
                dispatch(resetData())
                setCreateOrderData(initialState)
                navigate('/user?canteen_id=' + canteen_id)

            }
        }
        catch (error: any) {
            toast.error(error.response.data.error[0].message)
        }
    }

    return (
        <>
            <Stack sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
            }}
                onClick={() => {
                    if (orderData.length > 0) {
                        setOpen(true)
                    } else {
                        alert("Please Select Product")
                    }
                }}
            >

                <span style={{
                    fontSize: mobile ? "" : 30,
                    fontWeight: "bold"
                }}
                >
                    &#8377; {price} PAY NOW
                </span>
            </Stack>

            <SwipeableDrawer
                anchor={!mobile ? "top" : "bottom"}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '& .MuiDrawer-paper': { height: mobile ? '100%' : '80%', overflow: 'auto' },
                }}
            >
                <UserRenderUserLogin
                    setCreateOrderData={setCreateOrderData}
                    createOrderData={createOrderData}
                />
                <Box sx={{ display: 'flex', p: 2, justifyContent: 'center', gap: 1 }}>
                    {/* <Button variant="contained" sx={{}}>
                        Print
                    </Button> */}
                    <Button variant='contained' color='error' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleCreate()} variant="contained" sx={{}} color='success'>
                        Create Order
                    </Button>
                </Box>
            </SwipeableDrawer>
        </>
    )
}
