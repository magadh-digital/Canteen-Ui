import {
    Box,
    Button,
    Divider,
    IconButton, ListItemIcon,
    Menu, MenuItem, Stack, Toolbar,
    Typography,
    colors,
    useMediaQuery
} from "@mui/material";
import { styled, useTheme, } from '@mui/material/styles';
import { GridMenuIcon } from "@mui/x-data-grid";
// import React, { useEffect } from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';

import { AccountCircle, ListAlt, Login, LogoutOutlined } from '@mui/icons-material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetOrderDetailsApi } from '../AllGetApi';
import { setUserItemViewData, setUserItemViewId, setuserOrderDetails } from '../AllStoreSlice/UserOrderListSlice';
import { setUser } from '../AllStoreSlice/UserSaveSlice';
import AllProductCard from '../POSPages/AllProductCard';
import ItemQuantityDetails from '../POSPages/ItemQuantityDetails';
import UserPaymentMethod from './UserPaymentMethod';
import RenderUserLoginModal from "../Modal/RendeUserLoginModal";
import { SetLogOut, SetLoginModel } from "../AllStoreSlice/LoginSlice";

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




const UserPosList = ({ canteenId }: { canteenId: string }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentDate, setCurrentDate] = React.useState<string>(moment().format("DD-MM-YYYY hh:mm:ss"));
    const { user }: any = useSelector((state: RootState) => state.LoginSlice)
    const theme = useTheme()
    const open = Boolean(anchorEl);
    const { data } = GetOrderDetailsApi({ user_id: user?._id || "" })
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const userSlice = JSON.parse(localStorage.getItem('user') || "{}")
        dispatch(setUser(userSlice))
    }, [])

    const handleLogout = () => {
        if (user) {
            const confirm = window.confirm('Are you sure you want to logout?');
            if (confirm) {
                localStorage.removeItem('user_token')
                localStorage.removeItem('user')
                toast.success("Logout Successfully")
                dispatch(SetLogOut())
                handleClose()
            } else {
                return
            }
        } else {
            alert("You are not logged in")
        }
    }

    const dispatch = useDispatch()
    const handleOpenList = () => {
        dispatch(setUserItemViewId(user?._id || ""))
        dispatch(setuserOrderDetails(data?.orders[0] || []))
        dispatch(setUserItemViewData(data?.orders))
    }

    const mobile = useMediaQuery('(min-width:800px)');
    const { data: canteen } = useSelector((state: RootState) => state.Quantity)
    const { price, quantity } = useSelector((state: RootState) => state.PriceAndQuantity)


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(moment().format("DD-MM-YYYY hh:mm:ss"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    const handleOpenLoginModal = () => {
        dispatch(SetLoginModel(true))
    }


   

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
                    <Stack
                        width={"100%"}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <div style={{
                            display: "flex",
                            flexDirection: mobile ? "row" : "column",
                            alignItems: "center",
                            gap: mobile ? 12 : 1
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
                                sx={{ color: 'black', fontSize: mobile ? "16px" : "12px" }}>
                                ({currentDate})
                            </Typography>
                        </div>

                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <GridMenuIcon />
                        </IconButton>

                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                elevation: 3,
                                style: {
                                    maxHeight: 90 * 4.5,
                                    width: "200px",
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                },
                            }}
                        >

                            {user?.id ? 

                              <MenuItem
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    py: 0.8,
                                    px: 1.5,
                                    "&:hover": { bgcolor: "grey.100" },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "primary.main",
                                        minWidth: "28px",
                                    }}
                                >
                                    <AccountCircle fontSize="small" />
                                </ListItemIcon>
                                <div >
                                    <Typography variant="body2" fontWeight="bold">

                                        {user?.name || "No User"}
                                    </Typography>
                                    <Typography variant="body2" fontSize="10px">
                                        {user?.phone || ""}
                                    </Typography>
                                </div>
                            </MenuItem>: 
                            <MenuItem
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                py: 0.8,
                                px: 1.5,
                                "&:hover": { bgcolor: "grey.100" },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "primary.main",
                                    minWidth: "28px",
                                }}
                            >
                                <Login fontSize="small" />
                            </ListItemIcon>
                            <div  
                             onClick={handleOpenLoginModal}
                             style={{
                                cursor: "pointer"
                             }}
                            >
                                <Typography  
                                 
                                variant="body2" fontWeight="bold">

                                    LOGIN
                                </Typography>
                              
                            </div>
                        </MenuItem>
                            }
                            <Divider />
                            <MenuItem
                                onClick={handleOpenList}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    py: 0.8,
                                    px: 1.5,
                                    "&:hover": { bgcolor: "grey.100" },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "secondary.main",
                                        minWidth: "28px",
                                    }}
                                >
                                    <ListAlt fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="body2" fontWeight="500">
                                    My Order List
                                </Typography>
                            </MenuItem>
                            <Divider />

                            <MenuItem
                                onClick={handleLogout}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    py: 0.8,
                                    px: 1.5,
                                    "&:hover": { bgcolor: "grey.100" },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "error.main",
                                        minWidth: "28px",
                                    }}
                                >
                                    <LogoutOutlined fontSize="small" />
                                </ListItemIcon>
                                <Typography  variant="body2" fontWeight="500">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
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

                                        navigate("/view_item?canteen_id=6780bb535e0b1d0fb1daadd9")
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
                                <UserPaymentMethod canteen_id={canteenId || ""} />

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
                                        Total Price &#8377;{price}
                                    </span>
                                </Stack>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
            <RenderUserLoginModal />

        </Box >
    )
}

export default UserPosList


