import { Box, Button, colors, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { PostOtpSender, PostVerifyOtp } from "../AllPostApi";
import { toast } from "react-toastify";

import { CreateOrderType } from "../AllTypes";

import UsersViewItemsDetails from "./UsersViewItemsDetails";
import AnimatedMessage from "../POSPages/AnimatedMessage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { setUser } from "../AllStoreSlice/UserSaveSlice";
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
    setUserData,
    userData,
    loginUser,
    setLoginUser
}: {
    setCreateOrderData: React.Dispatch<React.SetStateAction<CreateOrderType>>;
    createOrderData: CreateOrderType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>
    userData: UserDataType
    loginUser: boolean
    setLoginUser: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [otpTrue, setOtpTrue] = useState(false);
    const { mutateAsync: sendOtp } = PostOtpSender();
    const { mutateAsync: verifyOtp } = PostVerifyOtp();
    const mobile = useMediaQuery("(max-width:800px)");

    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.user)

    const [login, setLogin] = useState({ mobileNumber: 0, otp: 0 });

    const handleSendOtp = async () => {
        setOtpTrue(true);
        try {
            const res = await sendOtp({ data: login.mobileNumber });
            toast.success("OTP sent successfully!");
            const otp = res.data.otp;
            setLogin({ ...login, otp });
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to send OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await verifyOtp({
                data: login.otp,
                phone: login.mobileNumber,
            });
            if (res.status === 200) {
                localStorage.setItem("user_token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                dispatch(setUser(res.data.user))
                setOtpTrue(false);
                setLogin({ mobileNumber: 0, otp: 0 });
                setLoginUser(true)
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Verification failed");
        }
    };

    useEffect(() => {
        const userLog = localStorage.getItem("user");
        dispatch(setUser(userLog ? JSON.parse(userLog) : null))
        setCreateOrderData((prev) => ({
            ...prev,
            user_id: user?.id || "",
            customer_name: user?.name || "WALKING",
            customer_type: user ? "USER" : "WALKING",
        }))
        setUserData((prev) => ({
            ...prev,
            user: {
                id: user?.id || "",
                name: user?.name || "",
                phone: user?.phone || 0,
                email: user?.email || "",
                role: user?.role || "",
                cp_code: user?.cp_code || "",
            },
            vouchers: 0
        }))
    }, [])


    const { user: userLogin } = useSelector((state: RootState) => state.LoginSlice)
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

            { !user?.id &&
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

            }

                {!loginUser && !user && (
                    <Stack sx={{ mt: 10, }} spacing={2} width={"100%"}>
                        <Stack
                            direction={!mobile ? "row" : "column"}
                            alignItems={"center"}
                            justifyContent={mobile ? "center" : "space-between"}
                        >
                            <Typography sx={{
                                fontWeight: "bold",
                                wordWrap: "nowrap"
                            }}>
                                Mobile Number:
                            </Typography>

                            <TextField
                                size="small"
                                sx={{
                                    width: !mobile ? "300px" : "50%"
                                }}
                                variant="outlined"
                                placeholder="Enter Mobile Number"
                                value={login.mobileNumber}
                                onChange={(e) =>
                                    setLogin({ ...login, mobileNumber: +e.target.value })
                                }
                            />


                        </Stack>
                        {!otpTrue ? (
                            <div style={{ display: "flex", justifyContent: !mobile ? "end" : "center" }}>
                                <Button
                                    onClick={handleSendOtp}
                                    style={{
                                        backgroundColor: colors.green[800],
                                        color: "white",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        width: "fit-content",
                                        height: "30px"
                                    }}
                                    size="small"
                                >
                                    Send OTP
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    spacing={2}
                                    justifyContent={mobile ? "center" : "end"}
                                >
                                    <TextField
                                        size="small"
                                        sx={{
                                            width: !mobile ? "300px" : "50%",

                                        }}
                                        variant="outlined"
                                        placeholder="Enter OTP"
                                        value={login.otp}
                                        onChange={(e) =>
                                            setLogin({ ...login, otp: +e.target.value })
                                        }
                                    />
                                </Stack>
                                <div style={{ display: "flex", justifyContent: mobile ? "center" : "end", gap: 2 }}>
                                    <Button
                                        onClick={handleSendOtp}
                                        style={{
                                            color: "white",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            width: "fit-content",
                                        }}
                                        variant="contained"
                                        color="warning"
                                        size="small"
                                    >
                                        Resend OTP
                                    </Button>
                                    <button
                                        style={{
                                            backgroundColor: colors.green[800],
                                            color: "white",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                        onClick={handleVerifyOtp}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => { setOtpTrue(false), setLogin({ mobileNumber: 0, otp: 0 }) }}
                                        style={{
                                            marginLeft: "10px",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </Stack>
                )}
                {user && (
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
                )}

                {
                    (userData?.vouchers || 0) > 0 && (
                        <AnimatedMessage userData={userData} />

                    )
                }

                <UsersViewItemsDetails userData={userData}
                    setUserData={setUserData}
                    setCreatedOrderData={setCreateOrderData}
                    createdOrderData={createOrderData}
                />
            </Box>
            <RenderUserLoginModal />
        </Box>
    );
};
