import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { Box, Button, colors, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  useMediaQuery } from '@mui/material';
import { MenuItemType } from '../AllTypes';
import { Delete } from '@mui/icons-material';
import { decrementQuantity, incrementQuantity, removeItem, resetData, updateQuantity, } from '../AllStoreSlice/AddQuantitySlice';
import { setOrderData, setPrice, setQuantity } from '../AllStoreSlice/PriceAndQuantitySlice';
import { useEffect, } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ItemQuantityDetails = () => {
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
                                            {/* <TextField
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={itemQuantity}
                                                inputProps={{
                                                    min: 1,
                                                    style: {
                                                        textAlign: "center",
                                                        padding: "1px 0",   // reduce padding
                                                        height: "15px",     // control input height
                                                    },
                                                }}
                                                sx={{
                                                    width: "50px",
                                                    mx: 1,
                                                    '& .MuiInputBase-root': {
                                                        height: '30px', // set total height
                                                        fontSize: '12px', // reduce font size
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (!isNaN(value) && value >= 1) {
                                                        dispatch(updateQuantity({ id: item.id, quantity: value }));
                                                    }
                                                }}
                                            /> */}

                                            <input
                                               
                                                value={itemQuantity}
                                                min={1}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (!isNaN(value) && value >= 1) {
                                                        dispatch(updateQuantity({ id: item.id, quantity: value }));
                                                    }
                                                }}
                                                style={{
                                                    width: "50px",
                                                    textAlign: "center",
                                                    padding: "1px 0",   
                                                    height: "15px",     
                                                    fontSize: '12px',
                                                    backgroundColor: "transparent",
                                                    border: "1px solid #ccc",
                                                    margin: "1.5px",
                                                    color:"black"
                                                }}
                                            />
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
