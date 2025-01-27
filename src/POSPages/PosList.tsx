import { styled, useTheme, } from '@mui/material/styles';
import { Box, Button, colors, FormControl, Icon, IconButton, MenuItem, Select, SelectChangeEvent, Stack, StepIcon, Toolbar, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { GridMenuIcon } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AllProductCard from './AllProductCard';
import ItemQuantityDetails from './ItemQuantityDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import ViewListIcon from '@mui/icons-material/ViewList';
import PaymentMethod from './PaymentMethod';
import { GetCanteenUserApi } from '../AllGetApi';
import { resetData, } from '../AllStoreSlice/AddQuantitySlice';
import { setAddProduct } from '../AllStoreSlice/AddProductCanteenSlice';
import moment from 'moment';
import { setCanteenDataSlice } from '../AllStoreSlice/CanteenIdSlice';
import { AddIcCallTwoTone } from '@mui/icons-material';
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




const PosList = () => {
    const theme = useTheme()
    const [currentDate, setCurrentDate] = React.useState<string>(moment().format("DD-MM-YYYY hh:mm:ss"));
    const { canteenData: canteen } = useSelector((state: RootState) => state.canteenData)
    const [open, setOpen] = React.useState(true);
    const [tableSlected, setTableSelected] = React.useState<boolean>(false);
    const navigate = useNavigate()
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const mobile = useMediaQuery('(min-width:800px)');
    const { price, quantity } = useSelector((state: RootState) => state.PriceAndQuantity)
    const { data } = useSelector((state: RootState) => state.Quantity)
    const { data: canteenList } = GetCanteenUserApi()
    const [canteenId, setCanteenID] = React.useState<string | null>('');
    const dispatch = useDispatch()


    const handleChange = (event: SelectChangeEvent) => {
        const selectedId = event.target.value;
        if (selectedId !== canteenId) {
            setCanteenID(selectedId);
            dispatch(setCanteenDataSlice(canteenList?.canteens?.find((canteen: any) => canteen.id === selectedId)));
            dispatch(resetData());
        }
    };

    useEffect(() => {
        const storedCanteenId = localStorage.getItem('canteen_user_id');
        if (storedCanteenId) {
            setCanteenID(storedCanteenId);
        }
    }, []);

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
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, color: 'black', ...(open && { display: 'none' }) }}
                    >
                        <GridMenuIcon />
                    </IconButton>
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
                                {canteen.name}
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
            <Box sx={{ display: "flex", width: "100%", height: "100%", overflow: "hidden" }}>

                {!mobile ? (
                    <>
                        {tableSlected ? (
                            <Box sx={{
                                width: '100%',
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                bgcolor: "white",
                            }}>

                                <ItemQuantityDetails  />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: '100%',
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "fixed",
                                            right: 0,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            zIndex: 1

                                        }}
                                    >
                                        <Box position="relative" textAlign="center">
                                            <Box
                                                position="absolute"
                                                top="-10px"
                                                left="0%"
                                                bgcolor={colors.blue[500]}
                                                color="white"
                                                borderRadius="4px"
                                                padding="2px 5px"
                                                fontSize="12px"
                                                fontWeight="bold"
                                                zIndex={2}
                                            >
                                                {data?.length}
                                            </Box>

                                            <Tooltip title="View List Product">
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                        backgroundColor: colors.blue[300],
                                                        width: "40px",
                                                        padding: 3,
                                                        height: "30px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: "8px",
                                                    }}
                                                    onClick={() => setTableSelected(true)}
                                                >
                                                    <ViewListIcon
                                                        sx={{
                                                            color: "white",
                                                            width: "30px",
                                                            height: "30px",
                                                        }}
                                                    />
                                                </span>
                                            </Tooltip>
                                        </Box>
                                    </Box>

                                </Box>

                                <Box
                                    sx={{
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

                                        <PaymentMethod canteen_id={canteenId || ""} />
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
                                </Box>
                            </Box>
                        )}


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
                                <Stack sx={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}>

                                    <PaymentMethod canteen_id={canteenId || ""} />
                                </Stack>
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