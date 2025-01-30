import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'


import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { GetCanteenUserApi, GetOrderDetailsApi } from '../AllGetApi'
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Typography, useMediaQuery,
    Divider,
    Button,
    SelectChangeEvent,
    Tooltip,
    FormControl,
    colors,
    Select,

} from "@mui/material"
import { GridMenuIcon } from "@mui/x-data-grid";
// import {  } from '@mui/x-data-grid';
import moment from 'moment';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../AllStoreSlice/UserSaveSlice';

import { AccountCircle, ListAlt, LogoutOutlined } from '@mui/icons-material';
import { SetLoginModel, SetLogOut } from '../AllStoreSlice/LoginSlice';
import { setCanteenDataSlice } from '../AllStoreSlice/CanteenIdSlice';
import { resetData } from '../AllStoreSlice/AddQuantitySlice';
import { setAddProduct } from '../AllStoreSlice/AddProductCanteenSlice';
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

const CanteenLayout = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentDate, setCurrentDate] = React.useState<string>(moment().format("DD-MM-YYYY hh:mm:ss"));
    const [canteenId, setCanteenID] = React.useState<string | null>('');
    const theme = useTheme()
    const open = Boolean(anchorEl);
    const mobile = useMediaQuery('(min-width:800px)');

    const handleChange = (event: SelectChangeEvent) => {
        const selectedId = event.target.value;
        if (selectedId !== canteenId) {
            setCanteenID(selectedId);
            dispatch(setCanteenDataSlice(canteenList?.canteens?.find((canteen: any) => canteen.id === selectedId)));
            dispatch(resetData());
            navigate(`?canteen_id=${selectedId}`, { replace: true });
        }
    };
    const dispatch = useDispatch()
    const { data: canteenList } = GetCanteenUserApi()




    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const canteenIdParam = queryParams.get("canteen_id");

        if (canteenIdParam && canteenIdParam !== canteenId) {
            setCanteenID(canteenIdParam); // Set the canteenId based on URL parameter
            dispatch(setCanteenDataSlice(canteenList?.canteens?.find((canteen: any) => canteen.id === canteenIdParam)));
            dispatch(resetData()); // Refetch data
        }
    }, [location.search, canteenList?.canteens])



    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(moment().format("DD-MM-YYYY hh:mm:ss"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const storedCanteenId = localStorage.getItem('canteen_user_id');
        if (storedCanteenId) {
            setCanteenID(storedCanteenId);
        }
    }, []);

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
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, color: 'black', ...(open && { display: 'none' }) }}
                    >
                        <GridMenuIcon />
                    </IconButton> */}
                    {
                        open ? null :
                            <img src='public/2795550.png'
                                alt='"no img'
                                width={"48px"}
                                height={"48px"}
                                style={{
                                    borderRadius: "30%",
                                    marginRight: "10px"
                                }} />
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
                            flexDirection: !mobile ? "column" : "row",
                            alignItems: mobile ? "center" : "start",
                            gap: !mobile ? 0 : 12
                        }}>
                            <Typography noWrap component="div" sx={{
                                color: "black",
                                letterSpacing: "1px",
                                fontStyle: "unset",
                                fontFamily: "sans-",
                                fontWeight: "bold",
                                fontSize: mobile ? "20px" : "15px"
                            }}>
                                {canteenList?.canteens?.find((canteen: any) => canteen.id === canteenId)?.name}
                            </Typography>
                            <Typography
                                textAlign={"center"}
                                sx={{
                                    color:
                                        'black',
                                    fontSize: mobile ? "18px" : "12px"
                                }}
                                noWrap component="div">
                                ({currentDate})
                            </Typography>
                        </div>
                        <Stack direction="row" spacing={0} alignItems="center">
                            <Tooltip title="Add Product">
                                <span onClick={() =>
                                    dispatch(setAddProduct(canteenId))}
                                    style={{
                                        cursor: "pointer"
                                    }}>
                                    <img
                                        src="public/10608872.png"
                                        width={"50px"}
                                    />
                                </span>
                            </Tooltip>
                            <FormControl size='small' sx={{
                                m: 1,
                                minWidth: !mobile ? "100px" : "300px",
                                bgcolor: colors.grey[100],
                                border: "none",
                                borderRadius: "1px",
                                p: 1
                            }}
                                variant='standard'
                            >
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={canteenId || ""}
                                    onChange={handleChange}
                                    label="canteen"
                                >
                                    {canteenList?.canteens?.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item?.id}
                                                value={item?.id}
                                            >{item?.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            <div>
                                <img src="public/618729-200.png"
                                    width={mobile ? "60px" : "30px"}
                                    height={mobile ? "50px" : "30px"}
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "50%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate("/dashboard")}
                                />
                            </div>


                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box>
                <Outlet />

            </Box>
        </>

    )
}

export default CanteenLayout