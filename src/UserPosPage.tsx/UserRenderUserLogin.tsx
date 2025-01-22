import { Box, Button, colors, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { PostOtpSender, PostVerifyOtp } from "../AllPostApi";
import { toast } from "react-toastify";

import { CreateOrderType } from "../AllTypes";

import UsersViewItemsDetails from "./UsersViewItemsDetails";


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
                localStorage.setItem("user", JSON.stringify(res.data));
                setUserData({
                    user: {
                        id: res.data.user.id,
                        name: res.data.user.name,
                        phone: res.data.user.phone,
                        email: res.data.user.email,
                        role: res.data.user.role,
                        cp_code: res.data.user.cp_code,
                    },
                    vouchers: res.data.vouchers
                })

                setCreateOrderData((prev) => ({
                    ...prev,
                    user_id: res.data.user.id,
                    customer_name: res.data.user.name,
                    customer_type: "USER",
                }));
                setOtpTrue(false);
                setLogin({ mobileNumber: 0, otp: 0 });
                setLoginUser(true)
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Verification failed");
        }
    };


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("user_token");
        if (token && storedUser) {
            setUserData({
                user: {
                    id: storedUser?.user?.id || "",
                    name: storedUser?.user?.name || "",
                    phone: storedUser?.user?.phone || 0,
                    email: storedUser?.user?.email || "",
                    role: storedUser?.user?.role || "",
                    cp_code: storedUser?.user?.cp_code || "",
                },
                vouchers: storedUser?.vouchers
            });
            setCreateOrderData((prev) => ({
                ...prev,
                user_id: storedUser?.user?.id || "",
                customer_name: storedUser?.user?.name || "",
                customer_type: "USER",
            }));
            setLoginUser(true);
        }

    }, [])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
            <Box sx={{ width: mobile ? "100%" : "40%", display: "flex", flexDirection: "column", justifyContent: "start", bgcolor: colors.grey[50] }}>
                {!loginUser && (
                    <Stack sx={{ mt: 10 }} spacing={2} width={"100%"}>
                        <Stack direction={"row"} alignItems={"center"} spacing={2} justifyContent={"space-between"}>
                            <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>Mobile Number:</Typography>
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder="Enter Mobile Number"
                                value={login.mobileNumber}
                                onChange={(e) =>
                                    setLogin({ ...login, mobileNumber: +e.target.value })
                                }
                            />
                        </Stack>
                        {!otpTrue ? (
                            <div style={{ display: "flex", justifyContent: "end" }}>
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
                                    justifyContent={"space-between"}
                                >
                                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>OTP:</Typography>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter OTP"
                                        value={login.otp}
                                        onChange={(e) =>
                                            setLogin({ ...login, otp: +e.target.value })
                                        }
                                    />
                                </Stack>
                                <div style={{ display: "flex", justifyContent: "end" }}>
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
                {loginUser && (<Stack sx={{ mt: 10, width: "100%" }}>
                    <Box sx={{ display: "flex", gap: 2, bgcolor: colors.grey[100], p: 2, justifyContent: "space-between" }}>
                        <Typography sx={{ fontWeight: "bold", color: colors.blue[800] }}>
                            {userData.user.name}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", color: colors.red[400] }}>
                            {userData.user.phone}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", color: colors.blue[800] }}>
                            {userData.user.email}
                        </Typography>
                    </Box>
                </Stack>)}
                <UsersViewItemsDetails userData={userData}
                    setUserData={setUserData}
                    setCreatedOrderData={setCreateOrderData}
                    createdOrderData={createOrderData}
                />
            </Box>
        </Box>
    );
};
