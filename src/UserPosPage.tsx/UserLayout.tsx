import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'


import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Typography, useMediaQuery,
    Divider,
    Button,

} from "@mui/material"
import { GridMenuIcon, GridMoreVertIcon } from "@mui/x-data-grid";
// import {  } from '@mui/x-data-grid';
import moment from 'moment';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../AllStoreSlice/UserSaveSlice';

import { AccountCircle, ListAlt, LogoutOutlined } from '@mui/icons-material';
import { SetLoginModel, SetLogOut } from '../AllStoreSlice/LoginSlice';
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

const UserLayout = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentDate, setCurrentDate] = React.useState<string>(moment().format("DD-MM-YYYY hh:mm:ss"));
    const { user } = useSelector((state: RootState) => state.LoginSlice)
    const theme = useTheme()
    const open = Boolean(anchorEl);

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
        navigate('/user/order/view')
    }

    const mobile = useMediaQuery('(min-width:800px)');


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(moment().format("DD-MM-YYYY hh:mm:ss"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleOpenLogin = () => {
        handleClose()
        dispatch(SetLoginModel(true))
    }


    return (
        <>
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


                        {user?.id ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <Button
                                    color='success'
                                    variant='contained'
                                    onClick={handleOpenLogin}>
                                    Login
                                </Button>
                            </>
                        )}



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
                            </MenuItem>
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
                                <Typography variant="body2" fontWeight="500">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box>
                <Outlet />

            </Box>
        </>

    )
}

export default UserLayout