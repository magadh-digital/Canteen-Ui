import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { Box, Button, colors, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useMediaQuery } from '@mui/material';
import { MenuItemType } from '../AllTypes';
import { Delete } from '@mui/icons-material';
import { decrementQuantity, incrementQuantity, removeItem, resetData, } from '../AllStoreSlice/AddQuantitySlice';
import { setOrderData, setPrice, setQuantity } from '../AllStoreSlice/PriceAndQuantitySlice';
import { useEffect, useRef } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
const ItemQuantityDetails = ({ setTableSelected }: any) => {
    const { data: data } = useSelector((state: RootState) => state.Quantity);
    const dispatch = useDispatch();
    const totalQuantity = data.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = data.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    useEffect(() => {
        dispatch(setPrice(totalPrice));
        dispatch(setQuantity(totalQuantity));
        dispatch(setOrderData(data));
    }, [data]);

    const mobile = useMediaQuery("(min-width: 800px)");
    let wasDragged = useRef(false);
    const handleDrag = (_: DraggableEvent, __: DraggableData) => {
        // Mark drag as occurred
        wasDragged.current = true;
    };

    const handleStop = (_: DraggableEvent, __: DraggableData) => {
        
        if (!wasDragged.current) {
            setTableSelected(false);
        }
       
        wasDragged.current = false;
    };
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            mt: !mobile ? 2 : 3,
            bgcolor: colors.grey[200],
            display: "flex",
            flexDirection: "column",
        }}>

            <TableContainer sx={{ height: "100%", overflowY: "auto" }}>
                {!mobile && (
                    <Draggable
                        bounds="parent"
                        onDrag={handleDrag}
                        onStop={handleStop}

                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            height={"90%"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            position={"absolute"}
                            right={0}
                            zIndex={1}
                            style={{ cursor: "move" }}
                        >
                            <Tooltip title="Add Product">
                                <span
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: colors.deepOrange[300],
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <ShoppingCartIcon
                                        sx={{
                                            color: "white",
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                </span>
                            </Tooltip>
                        </Box>
                    </Draggable>
                )}
                <Table sx={{ mt: 5 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: colors.red[200] }}>
                            <TableCell sx={{ fontSize: !mobile ? "10px" : "" }}>Quantity</TableCell>
                            <TableCell sx={{ fontSize: !mobile ? "10px" : "" }} >Item Name</TableCell>
                            <TableCell sx={{ fontSize: !mobile ? "10px" : "" }}>Price</TableCell>
                            <TableCell sx={{ fontSize: !mobile ? "10px" : "" }}>Quantity</TableCell>
                            <TableCell sx={{ fontSize: !mobile ? "10px" : "" }}>Remove</TableCell>
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
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
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
                p: 2,
                // m: 2,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                // height: "10%",
            }}>

                <Button
                    variant='contained'
                    sx={{
                        width: "100%",
                        height: "50px",
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
                        dispatch(resetData());
                        dispatch(setPrice(0));
                        dispatch(setQuantity(0));
                    }}
                >
                    Reset
                </Button>
            </Box>

        </Box >
    );
};

export default ItemQuantityDetails;
