import { styled, } from '@mui/material/styles';
import { Box, Button, colors, Stack, Tooltip, useMediaQuery } from "@mui/material"
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AllProductCard from './AllProductCard';
import ItemQuantityDetails from './ItemQuantityDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import ViewListIcon from '@mui/icons-material/ViewList';
import PaymentMethod from './PaymentMethod';
import { useNavigate } from 'react-router-dom';


const PosList = () => {
    const navigate = useNavigate()
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
                        <Box sx={{
                            width: '30%',
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            bgcolor: "white"
                        }}>
                            <ItemQuantityDetails />

                        </Box>
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
                            </Box>
                        </Box>
                    </>
                )}
            </Box>

        </Box >
    )
}

export default PosList