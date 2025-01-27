import { styled, useTheme, } from '@mui/material/styles';
import {
    Box,
    Button,
    colors,
    IconButton, ListItemIcon, ListItemIconProps, ListItemText, ListItemButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography, useMediaQuery,
    Popover,
    List,
    ListItem,
    Divider
} from "@mui/material"
import { GridMenuIcon } from "@mui/x-data-grid";
// import React, { useEffect } from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import ListIcon from '@mui/icons-material/List';

import moment from 'moment';
import ItemQuantityDetails from '../POSPages/ItemQuantityDetails';
import AllProductCard from '../POSPages/AllProductCard';
import UserPaymentMethod from './UserPaymentMethod';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const theme = useTheme()
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'list-popover' : undefined;
    const listItems = [
        'Item 1',
        'Item 2',

    ];

    const mobile = useMediaQuery('(min-width:800px)');
    const { data: canteen } = useSelector((state: RootState) => state.Quantity)
    const { price, quantity } = useSelector((state: RootState) => state.PriceAndQuantity)


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(moment().format("DD-MM-YYYY hh:mm:ss"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                color: 'black',
                                ...(open && { display: 'none' })
                            }}
                        >
                            <GridMenuIcon />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            PaperProps={{
                                style: {
                                    maxHeight: 200,
                                    width: 200,
                                    padding: '8px',
                                },
                            }}
                        >
                            <List>
                                {listItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem button>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                        {index < listItems.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Popover>
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

        </Box >
    )
}

export default UserPosList