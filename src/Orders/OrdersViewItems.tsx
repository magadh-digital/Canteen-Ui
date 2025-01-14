
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { Box, colors, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, } from '@mui/material'
import { setItemViewId } from '../AllStoreSlice/ItemViewSlice'

const OrdersViewItems = () => {
    const { id, data } = useSelector((state: RootState) => state.ItemView)
    const dispatch = useDispatch()

    return (
        <>
            <Modal
                open={id !== ""}
                onClose={() => dispatch(setItemViewId(""))}
                aria-labelledby="modal-modal-title"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 900,
                        padding: 4,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 24,
                        height: "50vh",
                    }}
                >
                    <TableContainer sx={{ height: "100%", overflowY: "auto", width: "100%" }}>

                        <Box
                            display={"flex"}
                            justifyContent={"end"}
                            alignItems={"center"}
                            margin={"auto"}
                            zIndex={1}
                            position={"sticky"}
                            top={400}
                        >
                        </Box>

                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: colors.red[200] }}>
                                    <TableCell>S No</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {data?.map((item, index: number) => {
                                    const itemQuantity = item.qty || 1;
                                    const itemTotalPrice = item.price * itemQuantity;
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <span style={{ color: "green" }}>
                                                    &#8377;{`${itemTotalPrice}`}
                                                </span>
                                            </TableCell>
                                            <TableCell>{item.qty || 1}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Modal>
        </>
    )
}

export default OrdersViewItems