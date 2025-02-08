import { Box, Button, colors,  Table, TableBody, TableCell, TableContainer, TableRow,  useMediaQuery } from "@mui/material";

import { CreateOrderType } from "../AllTypes";

import UsersViewItemsDetails from "./UsersViewItemsDetails";
import AnimatedMessage from "../POSPages/AnimatedMessage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { SetLoginModel } from "../AllStoreSlice/LoginSlice";
import RenderUserLoginModal from "../Modal/RendeUserLoginModal";


export interface UserDataType {
    user: {
        id?: string;
        name?: string;
        phone?: number;
        email?: string;
        role?: string;
        cp_code?: string;
    };
    vouchers?: number
}

export const UserRenderUserLogin = ({
    setCreateOrderData,
    createOrderData,
}: {
    setCreateOrderData: React.Dispatch<React.SetStateAction<CreateOrderType>>;
    createOrderData: CreateOrderType;
}) => {
    const { user } = useSelector((state: RootState) => state.LoginSlice)
    const mobile = useMediaQuery("(max-width:800px)");
    const dispatch = useDispatch()
    const handleOpenLoginModal = () => {
        dispatch(SetLoginModel(true))
    }

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%"
        }}>
            <Box sx={{
                width: mobile ? "100%" : "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                bgcolor: colors.grey[50],
            }}>

                {!user?.id ? (
                    <Button
                        onClick={handleOpenLoginModal}
                        style={{
                            backgroundColor: colors.green[800],
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginTop: "100px",
                            marginLeft: "10px",

                        }}
                    >
                        Login
                    </Button>
                ) : (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 9
                    }}>
                        <TableContainer sx={{ border: "0.5px solid #ccc", }}>
                            <Table size="small" sx={{}}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{
                                            fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px",
                                            backgroundColor: colors.grey[200],
                                        }}>
                                            Name :
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right", padding: "8px", }}>{
                                            user?.name || 'N/A'
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", backgroundColor: colors.grey[200], fontWeight: "bold", color: "#333", padding: "8px" }}>
                                            Email     :                               </TableCell>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right", padding: "8px" }}>
                                            {user?.email || 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", backgroundColor: colors.grey[200], }}>
                                            Phone     :
                                        </TableCell>
                                        <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", textAlign: "right" }}>{user?.phone || 'N/A'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )

                }

                {
                    (user?.vouchers || 0) > 0 && (
                        <AnimatedMessage userData={user} />

                    )
                }

                <UsersViewItemsDetails
                    setCreatedOrderData={setCreateOrderData}
                    createdOrderData={createOrderData}
                />
            </Box>
            <RenderUserLoginModal />
        </Box>
    );
};
