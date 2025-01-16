import { styled, useTheme, } from '@mui/material/styles';
import { Box, Button, colors, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Toolbar, Tooltip, Typography, useMediaQuery } from "@mui/material"
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
import QrCode from "react-qr-code";
import { resetData, } from '../AllStoreSlice/AddQuantitySlice';
import { setAddProduct } from '../AllStoreSlice/AddProductCanteenSlice';
import { setCanteenIdURl } from '../AllStoreSlice/CanteenIdSlice';
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
    const { canteen } = useSelector((state: RootState) => state.LoginCanteenUser)
    const { canteenId: canteenIdUrl } = useSelector((state: RootState) => state.canteenId)
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
    const [canteenData, setCanteenData] = React.useState<any | null>(null);
    const dispatch = useDispatch()


    const handleChange = (event: SelectChangeEvent) => {
        const selectedId = event.target.value;
        setCanteenID(selectedId);
        const selectedCanteen = canteenList?.canteens?.find((canteen: any) => canteen.id === selectedId);
        setCanteenData(selectedCanteen || null);
        dispatch(resetData())

    }

    useEffect(() => {

        if (canteen.id) {
            setCanteenID(canteen.id)
            setCanteenData(canteenList?.canteens?.find((canteen: any) => canteen.id === canteen.id));

        }
        else if (canteen.id === "") {
            const firstCanteen = canteenList?.canteens[0];
            setCanteenID(firstCanteen?.id || '');
            setCanteenData(firstCanteen);

        }
    }, [canteen.id, canteenList?.canteens])

    const newDate = new Date();
    const currentDate = newDate.toISOString().split('T')[0] + ' ' + newDate.toLocaleTimeString();

    useEffect(() => {
        let location = new URL(window.location.href);
        let canteen_id = location.search;
        if (canteen_id) {
            dispatch(setCanteenIdURl(canteen_id))
        }
    }, [dispatch])
    const Barcode = () => {
        const qrCodeUrl = `http://localhost:3000/pos?canteenId=${canteenIdUrl}`;
        console.log(qrCodeUrl)

        return (
            <QrCode
                size={256}
                value={qrCodeUrl}
                style={{ width: "400px", height: "400px" }}
            />
        );
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
                        sx={{ marginRight: 5, color: 'black', ...(open && { display: 'none' }) }}
                    >
                        <GridMenuIcon />
                    </IconButton>
                    {
                        open ? null :
                            <img src='public/2795550.png' alt='"no img' width={"48px"} height={"48px"} style={{ borderRadius: "30%", marginRight: "10px" }} />
                    }
                    <Stack width={"100%"} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
                                Magadh Canteen
                            </Typography>
                            <Typography textAlign={"center"} sx={{ color: 'black' }}>
                                ({currentDate})
                            </Typography>
                        </div>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Tooltip title="Add Product">
                                <span onClick={() => dispatch(setAddProduct(canteenId))} style={{ cursor: "pointer" }}>
                                    <img src="public/10608872.png" width={"50px"} />
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
                                    label="Age"
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
                            <Button
                                onClick={() => navigate("/dashboard")}
                                variant="contained"
                                size="small"
                                style={{
                                    backgroundColor: colors.orange[500],
                                    color: "black",
                                    borderColor: "none",
                                    border: "none",
                                    height: "40px"
                                }}>
                                Canteen
                            </Button>
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
                                bgcolor: "white"
                            }}>

                                <ItemQuantityDetails tableSelected={tableSlected} setTableSelected={setTableSelected} />
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
                                        display={"flex"}
                                        justifyContent={"end"}
                                        alignItems={"center"}
                                        margin={"auto"}
                                        zIndex={1}
                                        position={"sticky"}
                                        bottom={400}
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
                                        height: '100px',
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

                                        <PaymentMethod canteenId={canteenId || ""} canteenData={canteenData || ""} />
                                    </Stack>
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
                            {canteenIdUrl ? (
                                <>
                                {canteenIdUrl}
                                    <p>Scan this code to redirect to the desired page:</p>
                                    <Barcode />
                                </>
                            ) : (
                                <p>Please provide a valid canteenId in the URL to generate the QR code.</p>
                            )}

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

                                    <PaymentMethod canteenId={canteenId || ""} canteenData={canteenData || ""} />
                                </Stack>
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

export default PosList