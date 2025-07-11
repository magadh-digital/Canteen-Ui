import { Box, Button, colors, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material"

import AllProductCard from './AllProductCard';
import ItemQuantityDetails from './ItemQuantityDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';

import PaymentMethod from './PaymentMethod';
import { useNavigate } from 'react-router-dom';
import { setAddProduct } from "../AllStoreSlice/AddProductCanteenSlice";
import { GridAddIcon } from "@mui/x-data-grid";
import UpdateStocks from "../Stocks/UpdateStocks";


const PosList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const mobile = useMediaQuery('(min-width:800px)');
    const { price, quantity } = useSelector((state: RootState) => state.PriceAndQuantity)
    const { data: canteen } = useSelector((state: RootState) => state.Quantity)
    const { canteenData } = useSelector((state: RootState) => state.canteenData)
    const canteenId = canteenData?.id


    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: 'grey',
        }}>

            <Box sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}>
                {!mobile ? (
                    <>
                        <AllProductCard canteenId={canteenId || ""} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "fixed",
                                bottom: "0%",
                                width: "100%"
                            }}
                        >

                            <Button
                                sx={{
                                    width: "100%",
                                    margin: "19px"
                                }}
                                variant='contained'
                                color='success'
                                onClick={() => {
                                    if (canteen.length === 0) {
                                        alert("Please Select Item First")
                                    } else {
                                        navigate("/pos/view_item?canteen_id=" + canteenId)
                                    }
                                }}>
                                View Cart  ({canteen.length})
                            </Button>
                        </Box>

                    </>
                ) : (
                    <>
                        <Box
                            sx={{
                                width: '70%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: colors.grey[50],
                                overflowY: 'auto',
                            }}
                        >
                            <Box
                                sx={{
                                    flex: '1 1 auto',
                                    overflow: 'hidden',
                                }}
                            >
                                <AllProductCard canteenId={canteenId || ""} />
                            </Box>


                            <Box
                                sx={{
                                    width: '100%',
                                    bgcolor: colors.green[100],
                                    height: '100px',
                                    display: 'flex',
                                    flexShrink: 0,
                                    position: "sticky",
                                    bottom: 0,
                                    zIndex: 1
                                }}
                            >


                                {((canteen?.length ?? 0) > 0) ? (
                                    <>
                                        <Stack
                                            sx={{
                                                width: '300px',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: colors.green[500],
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'white',
                                            }}>
                                                Quantity : {quantity}
                                            </span>
                                        </Stack>
                                        <PaymentMethod canteen_id={canteenId || ""} />
                                        <Stack
                                            sx={{
                                                width: '300px',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: colors.green[500],
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'white',
                                            }}>
                                                Total Price &#8377;{price}
                                            </span>
                                        </Stack>
                                    </>
                                ) : (
                                    <>
                                        <Stack sx={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <Typography variant='h5'
                                                color={colors.green[900]}
                                            >
                                                No Items Selected
                                            </Typography>
                                        </Stack>
                                    </>
                                )}

                            </Box>
                        </Box>
                        <Box sx={{
                            width: '30%',
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            bgcolor: "white"
                        }}>
                            <ItemQuantityDetails />
                            <div style={{
                                width: "auto",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: colors.grey[100],
                            }}>
                                <div style={{ width: "100%" }}>
                                    <Tooltip title="Add Product">
                                        <button onClick={() =>
                                            dispatch(setAddProduct(canteenId))}
                                            style={{
                                                padding: 5,
                                                marginTop: 65,
                                                backgroundColor: colors.grey[300],
                                                color: colors.green[500],
                                                width: "100%",
                                                fontWeight: "bold"
                                            }}>
                                            <GridAddIcon sx={{
                                                fontSize: 30,
                                            }} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <UpdateStocks />
                            </div>

                        </Box>

                    </>
                )}
            </Box>

        </Box >
    )
}

export default PosList