import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { styled, useTheme, } from '@mui/material/styles';
import { Box, Button, colors, IconButton, Stack, Table, Checkbox, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography, useMediaQuery, ButtonGroup } from '@mui/material';
import { MenuItemType } from '../AllTypes';
import { Delete } from '@mui/icons-material';
import { decrementQuantity, incrementQuantity, removeItem, resetData, setData, setnewData, } from '../AllStoreSlice/AddQuantitySlice';
import { setOrderData, setPrice, setQuantity } from '../AllStoreSlice/PriceAndQuantitySlice';
import React, { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';


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



    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const handleCheckboxChange = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            setSelectedItems(data.map((item: MenuItemType) => item.id));
        } else {
            setSelectedItems([]);
        }

    };

    const handleBulkDelete = () => {
        const filteredData = data.filter((item: MenuItemType) => !selectedItems.includes(item.id));

        console.log(filteredData)

        dispatch(setnewData(filteredData));

    };

 







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

                height: "100%",
                bgcolor: colors.grey[200],
                display: "flex",
                flexDirection: "column",
                // padding: "10px"
            }}>


                <TableContainer sx={{ width: "100%", maxHeight: "70%", overflowY: "auto", borderRadius: "8px", mt: 5 }}>
                    <Table stickyHeader sx={{}}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                                <TableCell sx={{ backgroundColor: "#f5f5f5", fontSize: !mobile ? "12px" : "10px", padding: "10px", fontWeight: "bold" }}>
                                    Name
                                </TableCell>
                                <TableCell sx={{ backgroundColor: "#f5f5f5", fontSize: !mobile ? "12px" : "10px", padding: "10px", fontWeight: "bold" }}>
                                    Price
                                </TableCell>
                                <TableCell sx={{ backgroundColor: "#f5f5f5", fontSize: !mobile ? "12px" : "10px", padding: "10px", fontWeight: "bold" }}>
                                    Quantity
                                </TableCell>
                                <TableCell sx={{ backgroundColor: "#f5f5f5", fontSize: !mobile ? "12px" : "10px", padding: "10px", }}>
                                    <Checkbox
                                        checked={selectedItems.length === data.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((item: MenuItemType, index: number) => {
                                const itemQuantity = item.quantity || 1;
                                const itemTotalPrice = item.price * itemQuantity;
                                return (
                                    <TableRow key={index} sx={{ "&:hover": { bgcolor: "#f4f4f4" } }}>
                                        <TableCell sx={{ fontSize: !mobile ? "12px" : "10px", padding: "10px", fontWeight: "500" }}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <img src={item.image_url} alt='' width={"28px"} height={"28px"} />
                                                <Typography
                                                    fontSize={!mobile ? "12px" : "10px"}
                                                >{item.name}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: !mobile ? "12px" : "10px", padding: "10px", fontWeight: "500" }}>
                                            <span style={{ color: "green" }}>
                                                &#8377;{`${itemTotalPrice.toFixed(2)}`}
                                            </span>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: !mobile ? "12px" : "10px", padding: "10px" }}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <IconButton
                                                    onClick={() => dispatch(incrementQuantity(item.id))}>
                                                    <AddIcon />
                                                </IconButton>
                                                <span>{itemQuantity}</span>
                                                <IconButton onClick={() => dispatch(decrementQuantity(item.id))}>

                                                    <RemoveIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ padding: "10px" }}>
                                            <Checkbox
                                                color='error'
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}

                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <Table>
                    <TableRow
                        sx={{
                            backgroundColor: colors.grey[300],
                            width: "30%"
                        }}
                    >
                        <TableCell sx={{
                            fontSize: !mobile ? "12px" : "10px",
                            padding: "10px",
                            fontWeight: "bold",
                            width: "30%"
                        }}>
                            Total
                        </TableCell>
                        <TableCell sx={{ fontSize: !mobile ? "12px" : "10px", padding: "10px", fontWeight: "bold" }}>
                            <span style={{ color: "green" }}>
                                &#8377;{totalPrice.toFixed(2)}
                            </span>
                        </TableCell>
                        <TableCell
                            align='center'
                            sx={{
                                fontSize: !mobile ? "12px" : "10px",
                                padding: "10px",
                                fontWeight: "bold",
                                width: "30%"
                            }}>
                            <span style={{ color: "green" }}>
                                {totalQuantity}
                            </span>
                        </TableCell>
                        <TableCell sx={{ padding: "10px" }}>
                            <IconButton onClick={handleBulkDelete}>
                                <DeleteIcon
                                    color='error'

                                />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </Table>
                <Box sx={{
                    position: "fixed",
                    bottom: 4,
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}>

                    <Stack sx={{ width: "100%" }} direction={"row"}>
                        <ButtonGroup
                            sx={{
                                width: "100%",
                            }}>
                            <Button
                                variant='contained'
                                sx={{
                                    width: "100%",
                                    bgcolor: colors.red[300],
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "600",

                                    "&:hover": {
                                        bgcolor: colors.red[400],
                                    },
                                }}
                                onClick={() => {
                                    navigate('/user?canteen_id=' + canteenId)
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                variant='contained'
                                sx={{
                                    width: "100%",
                                    bgcolor: colors.green[300],
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "600",

                                    "&:hover": {
                                        bgcolor: colors.green[400],
                                    },
                                }}
                            >
                                <UserPaymentMethod canteen_id={canteenId || ""} />
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Box>
            </Box >
        </Box >
    );
};


