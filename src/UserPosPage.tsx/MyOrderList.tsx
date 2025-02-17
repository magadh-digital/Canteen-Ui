import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { GetOrderDetailsApi } from '../AllGetApi';
import { Box, Card, Typography, Stack, Divider } from '@mui/material';
import moment from 'moment';
import { setUserItemViewData, setUserItemViewId, setuserOrderDetails } from '../AllStoreSlice/UserOrderListSlice';
import { GetOrderTypes, QuantityType } from '../AllTypes';
import { ArrowBack, } from '@mui/icons-material';


const MyOrderList = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()
    const { data } = GetOrderDetailsApi({
        user_id: user?.id || '',
    });


    const handleOpenViewItems = ({ data, details }: { data: QuantityType[], details: GetOrderTypes }) => {
        dispatch(setUserItemViewId(user?.id))
        dispatch(setUserItemViewData(data))
        dispatch(setuserOrderDetails(details))
    }

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100%',
                bgcolor: 'white',
                mt: 8,
                position: 'fixed',
                top: 10
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                My Orders <span><ArrowBack sx={{
                    cursor: 'pointer',
                    color: 'black',
                    width: "30px",
                    height: "30px",
                }}
                    onClick={() => window.history.back()}
                /></span>
            </Typography>
            {(data?.orders?.length || 0) > 0 ? (
                <Stack spacing={2}>
                    {data?.orders.map((order, idx) => (
                        <Card key={idx} sx={{ p: 1, boxShadow: 3, }}>
                            <Typography fontSize={"14px"}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                Order ID:<span> {order.order_id}</span>
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                variant="subtitle2"
                                color="text.secondary">
                                Ordered on:
                                <span>
                                    {moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                </span>
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: "12px",
                            }}>
                                Customer:
                                <span>
                                    {order.customer_name}
                                </span>
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: "12px"
                                }}
                            >
                                Status:
                                <span>
                                    {order.status}
                                </span>
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: "12px"
                                }}>
                                Items: {order.items.length}
                                <span>
                                    <button
                                        onClick={() => handleOpenViewItems({ data: order.items, details: order })}
                                        style={{
                                            fontSize: '12px',
                                            backgroundColor: 'green',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px'
                                        }}>
                                        View Item
                                    </button>
                                </span>
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Payment Type: {order.payment_type}
                                </Typography>
                                Total Amount: ₹{order.total_amount}
                            </Typography>
                        </Card>
                    ))}
                </Stack>
            ) : (
                <Typography>No orders found.</Typography>
            )}
        </Box>
    );
};

export default MyOrderList;
