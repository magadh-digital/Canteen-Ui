import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { styled, useTheme, } from '@mui/material/styles';
import { Box, Button, colors, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { MenuItemType } from '../AllTypes';
import { Delete } from '@mui/icons-material';
import { decrementQuantity, incrementQuantity, removeItem, resetData, } from '../AllStoreSlice/AddQuantitySlice';
import { setOrderData, setPrice, setQuantity } from '../AllStoreSlice/PriceAndQuantitySlice';
import React, { useEffect, useRef } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { GridMenuIcon } from '@mui/x-data-grid';
import moment from 'moment';
import UserPaymentMethod from './UserPaymentMethod';
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const drawerWidth = "100vw";


const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export const MobileViewItemDetails = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentDate, setCurrentDate] = React.useState<string>(moment().format("DD-MM-YYYY hh:mm:ss"));
    const { data: data } = useSelector((state: RootState) => state.Quantity);
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        setOpen(true);
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(moment().format("DD-MM-YYYY hh:mm:ss"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const totalQuantity = data.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = data.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    useEffect(() => {
        dispatch(setPrice(totalPrice));
        dispatch(setQuantity(totalQuantity));
        dispatch(setOrderData(data));
    }, [data]);

    const mobile = useMediaQuery("(min-width: 800px)");
    let wasDragged = useRef(false);
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const canteenId = queryParams.get("canteen_id");
    // const { price, quantity } = useSelector((state: RootState) => state.PriceAndQuantity)

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: 'grey',
        }}>
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    bgcolor: "#9FD675",
                    border: "none",
                    boxShadow: "none",
                    borderBottom: "0.1px solid #E0E0E0",
                }}>

                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            color: 'black',
                            ...(open && { display: 'none' })
                        }}
                    >
                        <GridMenuIcon />
                    </IconButton>
                    {
                        open ? null :
                            <img src='public/2795550.png' alt='"no img' width={"48px"} height={"48px"} style={{ borderRadius: "30%", marginRight: "10px" }} />
                    }
                    <Stack
                        width={"100%"}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 12
                        }}>
                            <Typography
                                noWrap
                                component="div"
                                sx={{
                                    color: 'black',
                                    fontWeight: "bold",
                                    fontSize: mobile ? "20px" : "18px",
                                    fontFamily: "Poppins",
                                    letterSpacing: "1px"
                                }}>
                                Magadh Canteen
                            </Typography>
                            <Typography
                                noWrap
                                textAlign={"center"}
                                sx={{ color: 'black' }}>
                                ({currentDate})
                            </Typography>
                        </div>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box sx={{
                width: "100%",
                height: "100%",
                bgcolor: colors.grey[200],
                display: "flex",
                flexDirection: "column",
            }}>


                <TableContainer sx={{ width: "100%", height: "60%", overflowY: "auto", mb: 12 }}>
                    <Table sx={{ mt: 5 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: colors.red[200] }}>
                                <TableCell sx={{ fontSize: !mobile ? "9px" : "", width: "10%" }}>Quantity</TableCell>
                                <TableCell sx={{ fontSize: !mobile ? "9px" : "", width: "auto", m: 0, p: 0 }} >Item Name</TableCell>
                                <TableCell sx={{ fontSize: !mobile ? "9px" : "" }}>Price</TableCell>
                                <TableCell sx={{ fontSize: !mobile ? "9px" : "" }}>Quantity</TableCell>
                                <TableCell sx={{ fontSize: !mobile ? "9px" : "" }}>Remove</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {data?.map((item: MenuItemType, index: number) => {
                                const itemQuantity = item.quantity || 1;
                                const itemTotalPrice = item.price * itemQuantity;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Stack m={-2} alignItems={"center"}>
                                                <ExpandMoreIcon
                                                    sx={{
                                                        bgcolor: "green",
                                                        color: "white",
                                                        cursor: "pointer",
                                                        width: "60px",
                                                        borderRadius: "4px",
                                                        height: "15px",

                                                    }}
                                                    onClick={() =>
                                                        dispatch(incrementQuantity(item.id))}
                                                />
                                                <span
                                                    style={{
                                                        fontSize: "14px",
                                                        color: "red",
                                                    }}
                                                >
                                                    {itemQuantity}
                                                </span>
                                                <ExpandLessIcon
                                                    sx={{
                                                        bgcolor: "red",
                                                        color: "white",
                                                        cursor: "pointer",
                                                        width: "60px",
                                                        borderRadius: "4px",
                                                        height: "15px",
                                                    }}
                                                    onClick={() =>
                                                        dispatch(decrementQuantity(item.id))}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: !mobile ? "10px" : "",
                                            width: "auto",
                                            m: 0,
                                            p: 1
                                        }}>{item.name}</TableCell>
                                        <TableCell sx={{
                                            fontSize: !mobile ? "10px" : "",
                                        }}>
                                            <span style={{ color: "green" }}>
                                                &#8377;{`${itemTotalPrice}`}
                                            </span>
                                        </TableCell>
                                        <TableCell>{item.quantity || 1}</TableCell>
                                        <TableCell>

                                            <Delete sx={{
                                                cursor: "pointer",
                                            }} onClick={() => dispatch(removeItem(item.id))} />

                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                              
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    position: "fixed",
                    bottom: 4,
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}>
                    <Button sx={{
                        width: "100%",
                        alignSelf: "center",
                        height: "20px"
                    }} variant='contained' onClick={() => {
                        dispatch(resetData())
                        dispatch(setPrice(null))
                        dispatch(setQuantity(null))
                    }}>
                        Reset
                    </Button>
                    <Stack sx={{ width: "100%" }} direction={"row"}>
                        <Button
                            variant='contained'
                            sx={{
                                width: "100%",
                                bgcolor: colors.red[300],
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "600",
                                borderRadius: "8px",
                                "&:hover": {
                                    bgcolor: colors.red[400],
                                },
                            }}
                            onClick={() => {
                                navigate('/user?canteen_id=' + canteenId)
                            }}
                        >
                            Go to Store
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                width: "100%",
                                bgcolor: colors.green[300],
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "600",
                                borderRadius: "8px",
                                "&:hover": {
                                    bgcolor: colors.green[400],
                                },
                            }}
                            onClick={() => {

                            }}
                        >
                            <UserPaymentMethod canteen_id={canteenId || ""} />
                        </Button>
                    </Stack>
                </Box>

                {/* <Box
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            width: '100%',
                            bgcolor: colors.green[100],
                            height: '70px',
                            display: 'flex',
                            flexShrink: 0,
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
                                fontSize: '',
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                Quantity : {quantity}
                            </span>
                        </Stack>
                        <Stack sx={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        >

                            <UserPaymentMethod canteen_id={canteenId || ""} />
                        </Stack>
                        <Stack
                            sx={{
                                width: '300px',
                                height: '100%',
                                justifyContent: 'center',
                                backgroundColor: colors.green[500],
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <span style={{
                                fontSize: '',
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                Total Price &#8377;{price}
                            </span>
                        </Stack>
                    </Box> */}

            </Box >
        </Box >
    );
};


