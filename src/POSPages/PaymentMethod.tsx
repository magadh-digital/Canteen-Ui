import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey, red } from '@mui/material/colors';
// import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Button, colors, Divider, FormControl, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { PaymentTwoTone, Print } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { CreateOrderType, GetCanteenUser, MenuItemType } from '../AllTypes';
import { PostOrderCreateApi } from '../AllPostApi';
import { resetData } from '../AllStoreSlice/AddQuantitySlice';
// import ItemQuantityDetails from './ItemQuantityDetails';
import { setPrint } from '../AllStoreSlice/PrintSlice';


const drawerBleeding = 56;

interface Props {
    window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.default,
    }),
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[800],
    }),
    // marginTop: '50px',
}));

const Puller = styled('div')(() => ({
    width: "100%",
    height: 1,
    borderRadius: 3,
    position: 'absolute',
    top: 5,
    // left: 'calc(50% - 1px)',
    justifyContent: 'center',
})
);

export default function PaymentMethod({ canteenId, }: { canteenId: string, canteenData: GetCanteenUser }, props: Props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const mobile = useMediaQuery("(min-width: 800px)");
    const { price, quantity } = useSelector((state: RootState) => state.PriceAndQuantity);
    const { orderData: dataItem } = useSelector((state: RootState) => state.PriceAndQuantity)
    const [customer_name, setCustomerName] = React.useState<string>("CUSTOMER");
    const [payment_method, setPaymentMethod] = React.useState<string>("CASH");
    const [createOrderData, setCreateOrderData] = React.useState<CreateOrderType>({
        canteen_id: canteenId,
        user_id: "",
        customer_name: customer_name,
        items: [],
        total_amount: 0,
        status: "COMPLETED",
        customer_type: "USER",
        payment_type: payment_method
    });
    const dispatch = useDispatch()
    const { mutateAsync: createOrder } = PostOrderCreateApi()
    // console.log(dataItem)
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handlePaymentMethod = (e: any) => {
        setPaymentMethod(e.target.value)
        setCreateOrderData((prevState: CreateOrderType) => ({
            ...prevState as CreateOrderType,
            payment_type: e.target.value
        }))
    }

    React.useEffect(() => {
        if (dataItem && dataItem.length) {
            const transformedItems = dataItem.map((item: MenuItemType) => ({
                qty: item.quantity ?? 0,
                item_id: String(item.id),
                price: item.price,
                total: (item.quantity ?? 0) * item.price,
                name: item.name,
                payment_type: payment_method
            }));

            setCreateOrderData((prevState: CreateOrderType) => ({
                ...prevState as CreateOrderType,
                customer_name: customer_name,
                canteen_id: canteenId,
                total_amount: price ?? 0,
                items: transformedItems ?? [],
                payment_type: payment_method
            }));
        }
    }, [price, dataItem, canteenId, customer_name, payment_method]);

    const handleCreateOrder = async () => {
        try {
            await createOrder({
                data: createOrderData
            })
            toast.success("Order Created Successfully")
            setCreateOrderData({
                canteen_id: '',
                user_id: "",
                customer_name: "",
                items: [],
                total_amount: 0,
                status: "COMPLETED",
                customer_type: "USER",
                payment_type: "CASH"
            })

            setOpen(false)
            dispatch(resetData())

        } catch (error: any) {
            toast.error(error.response.data.error[0].message)

        }
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: mobile ? `calc(70% - ${drawerBleeding}px)` : `calc(100% - ${drawerBleeding}px)`,
                        overflow: 'visible',

                    },
                }}
            />
            <span
                style={{
                    fontSize: mobile ? '50px' : '',
                    fontWeight: 'bold',
                    color: 'green',
                    cursor: 'pointer',
                }}
                onClick={toggleDrawer(true)}
            >
                &#8377; {price} PAY NOW
            </span>
            {
                open && (
                    <SwipeableDrawer
                        container={container}
                        anchor={!mobile ? "bottom" : "top"}
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={drawerBleeding}
                        disableSwipeToOpen={false}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <StyledBox
                            sx={{
                                position: 'absolute',
                                bottom: drawerBleeding,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                visibility: open ? 'visible' : 'hidden',
                                display: open ? 'block' : 'none',
                                right: 0,
                                left: 0,
                                mb: !mobile ? 0 : -6,
                            }}
                        >
                            <Puller >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    width={"100%"}
                                    justifyContent={"center"}
                                >
                                    <span style={{
                                        display: 'block',
                                        height: "fit-content",
                                        width: "fit-content",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        backgroundColor: '#E0E0E0',
                                        cursor: 'pointer'

                                    }}
                                        onClick={toggleDrawer(false)}
                                    >
                                        Close
                                    </span>
                                    <span style={{
                                        display: 'block',
                                        height: "fit-content",
                                        width: "fit-content",
                                        padding: "5px 10px 0px 10px",
                                        borderRadius: "5px",
                                        backgroundColor: colors.green[500],
                                        cursor: 'pointer',
                                        color: "white",
                                    }}
                                        onClick={() => dispatch(setPrint(dataItem))}
                                    >
                                        <Print />
                                    </span>
                                    <span>
                                        <Button
                                            variant='contained'
                                            onClick={() => handleCreateOrder()}
                                        >
                                            Create Order
                                        </Button>
                                    </span>
                                </Stack>
                            </Puller>
                            {mobile && (<Typography sx={{ p: 2, color: 'text.secondary' }}>Payment Method</Typography>)}
                        </StyledBox>
                        <StyledBox sx={{
                            px: 0,
                            pb: 2,
                            height: '100%',
                            display: 'flex',
                            overflow: 'auto',
                            flexDirection: 'column',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden'
                            }}>

                                <Box sx={{
                                    display: 'flex',
                                    width: mobile ? '50%' : "100%",
                                    height: '100%',
                                    justifyContent: 'start',
                                    mt: 10,
                                    p: 2,
                                }}>
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography variant="h6">
                                                Customer Name : -
                                            </Typography>
                                            <TextField
                                                style={{
                                                    borderRadius: "5px",
                                                    width: "50%"
                                                }}
                                                autoFocus
                                                value={customer_name}
                                                variant="standard"
                                                size='small'
                                                onChange={(e) => setCustomerName(e.target.value)}
                                            />
                                        </Stack>


                                        <TableContainer sx={{
                                            width: "100%",
                                            height: "40%",
                                            mt: 2,
                                            "&::-webkit-scrollbar": {
                                                width: "6px",
                                            },
                                            "&::-webkit-scrollbar-track": {
                                                backgroundColor: colors.red[100],
                                                borderRadius: "2px",
                                            },
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                                borderRadius: "10px",
                                                border: "2px solid rgba(0, 0, 0, 0)",
                                            },
                                            "&::-webkit-scrollbar-thumb:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            },
                                        }}>
                                            <Table stickyHeader>
                                                <TableHead >
                                                    <TableCell>Item</TableCell>
                                                    <TableCell>Category</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                </TableHead>
                                                <TableBody>
                                                    {dataItem.map((item: MenuItemType) => (
                                                        <TableRow key={item.canteen_id}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>{item.category}</TableCell>
                                                            <TableCell>{item.price}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Stack direction="row" mt={5} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                variant="h6"
                                                // gutterBottom mt={!mobile ? 3 : 5}
                                                color="error"
                                                sx={{
                                                    display: 'flex',
                                                    textDecoration: "underline"
                                                }}
                                            >
                                                Select Payment Method
                                            </Typography>
                                            <FormControl>
                                                <Select
                                                    sx={{
                                                        width: "300px",
                                                        mr: 3
                                                    }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={payment_method}
                                                    onChange={(e) => handlePaymentMethod(e)}
                                                    size="small"
                                                >
                                                    <MenuItem value="CASH">Cash</MenuItem>
                                                    <MenuItem value="CARD">Card</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '10%',
                                            width: '100%',
                                            bgcolor: colors.lightGreen[100],
                                            mt: 3,
                                            // color: "blue"
                                        }}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                width={"100%"}
                                                p={2}
                                            >
                                                <Typography>
                                                    Total Quantity : -
                                                </Typography>
                                                <Typography>
                                                    {quantity}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                width={"100%"}
                                                p={2}
                                            >
                                                <Typography>
                                                    Paybale Amount : -
                                                </Typography>
                                                <Typography>
                                                    {price}
                                                </Typography>
                                            </Stack>

                                        </Box>
                                    </div>
                                </Box>

                            </Box>

                            {/* 
                            */}
                        </StyledBox>
                    </SwipeableDrawer>
                )
            }
        </Root >
    );
}
