import { Autocomplete, Box, Button, Checkbox, colors, FormControlLabel, FormGroup, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { PostOtpSender, PostVerifyOtp } from "../AllPostApi";
import { toast } from "react-toastify";
import ViewItemsDetails from "./ViewItemsDetails";
import { CreateOrderType } from "../AllTypes";
// import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { GetAllUserApi } from "../AllGetApi";
import axios from "axios";
import { baseUrl } from "../ApiEndPoint";

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

export const RenderUserLogin = ({
    setCreateOrderData,
    createOrderData,
}: {
    setCreateOrderData: React.Dispatch<React.SetStateAction<CreateOrderType>>;
    createOrderData: CreateOrderType;


}) => {
    // const [loginUser, setLoginUser] = useState(!!localStorage.getItem("user_token"));
    const [otpTrue, setOtpTrue] = useState(false);
    const { mutateAsync: sendOtp } = PostOtpSender();
    // const { mutateAsync: verifyOtp } = PostVerifyOtp();
    const mobile = useMediaQuery("(max-width:800px)");
    const [selectedUser, setSelectedUser] = useState(null);
    const { data, isLoading, refetch, isRefetching } = GetAllUserApi()
    const [userType, setUserType] = useState("WALKING")

    const [userData, setUserData] = useState<UserDataType>(() => {
        return {
            user: {
            },
            voucher: 0
        };
    });



    // const [login, setLogin] = useState({ mobileNumber: 0, otp: 0 });

    // const handleSendOtp = async () => {
    //     setOtpTrue(true);
    //     try {
    //         const res = await sendOtp({ data: login.mobileNumber });
    //         toast.success("OTP sent successfully!");
    //         const otp = res.data.otp;
    //         setLogin({ ...login, otp });
    //     } catch (error: any) {
    //         toast.error(error.response?.data?.error || "Failed to send OTP");
    //     }
    // };

    // const handleVerifyOtp = async () => {
    //     try {
    //         const res = await verifyOtp({
    //             data: login.otp,
    //             phone: login.mobileNumber,
    //         });
    //         if (res.status === 200) {
    //             localStorage.setItem("user_token", res.data.token);
    //             localStorage.setItem("user", JSON.stringify(res.data));
    //             setUserData({
    //                 user: {
    //                     name: res.data.user.name,
    //                     phone: res.data.user.phone,
    //                     email: res.data.user.email,
    //                     role: res.data.user.role,
    //                     cp_code: res.data.user.cp_code,
    //                 },
    //                 vouchers: 0
    //             });


    //             setLoginUser(true);
    //             toast.success("Login Successful!");
    //             setCreateOrderData((prev) => ({
    //                 ...prev,
    //                 user_id: res.data.user.id,
    //                 customer_name: res.data.user.name,
    //                 customer_type: "USER",
    //             }));
    //         }
    //     } catch (error: any) {
    //         toast.error(error.response?.data?.error || "Verification failed");
    //     }
    // };

    // useEffect(() => {
    //     // const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    //     const token = localStorage.getItem("canteen_token");
    //     if (token) {
    //         setUserData({
    //             user: {
    //                 name: userData?.user?.name || "",
    //                 phone: userData?.user?.phone || "",
    //                 email: userData?.user?.email || "",
    //                 role: userData?.user?.role || "",
    //                 cp_code: userData?.user?.cp_code || "",
    //             },
    //             vouchers: userData?.vouchers
    //         });
    //         console.log(userData),
    //             setCreateOrderData((prev) => ({
    //                 ...prev,
    //                 user_id: userData?.user?.id || "",
    //                 customer_name: userData?.user?.name || "",
    //                 customer_type: "USER",
    //             }));
    //         setLoginUser(true);
    //     }
    // }, [selectedUser]);

    const handleChangeSelectUser = async (user: any) => {
        console.log(user)
        try {
            const res = await axios.get(`${baseUrl}/voucher/remaining?user_id=${user.id}`)
            setUserData({
                user: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    cp_code: user.cp_code,
                },
                vouchers: res.data.vouchers
            })
        } catch (error: any) {

        }
        setSelectedUser(user);
        setCreateOrderData((prev) => ({
            ...prev,
            user_id: user.id,
            customer_name: user.name,
            customer_type: "USER",
        }))

    };



    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
            <Box sx={{ width: mobile ? "100%" : "40%", display: "flex", flexDirection: "column", justifyContent: "start", bgcolor: colors.grey[50] }}>
                {/* {!loginUser && (
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
                                        onClick={() => setOtpTrue(false)}
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
                )} */}

                <Stack direction={"row"} sx={{ mt: 10, width: "100%", justifyContent: "space-between" }} spacing={2} >
                    <Stack>
                        <FormGroup row >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            userType === "WALKING"
                                        }
                                        onChange={(e) => {
                                            setUserType(e.target.checked ? "WALKING" : "EMPLOYEE")
                                            setUserData({
                                                user: {},
                                                vouchers: 0
                                            })
                                            setSelectedUser(null)
                                            setCreateOrderData((prev) => ({
                                                ...prev,
                                                user_id: "",
                                                customer_name: "WALKING",
                                                customer_type: "WALKING",
                                            }))
                                        }}
                                        name="WALKING" />}
                                label="Walking"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={(
                                            userType === "EMPLOYEE")}
                                        onChange={(e) => setUserType(e.target.checked ? "EMPLOYEE" : "WALKING")}
                                        name="EMPLOYEE"
                                        color="primary"
                                    />
                                }
                                label="EMPLOYEE"
                            />

                        </FormGroup>
                    </Stack>
                    <Stack>
                        {userType === "EMPLOYEE" && <>
                            <Stack>
                                <Autocomplete
                                    id="free-solo-demo"
                                    size="small"
                                    disablePortal
                                    options={data?.users || []}
                                    getOptionLabel={(option) => option.name || ""}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    value={selectedUser}
                                    onChange={(_, newValue: any) => {
                                        handleChangeSelectUser(newValue)
                                    }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="User" />}
                                    loading={isLoading || isRefetching}
                                />
                            </Stack>
                        </>}
                    </Stack>

                </Stack>
                {userData?.user && (
                    <Stack sx={{ mt: 1, width: "100%" }}>
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
                    </Stack>
                )}



                <ViewItemsDetails userData={userData}
                    setCreatedOrderData={setCreateOrderData}
                    createdOrderData={createOrderData}
                />
            </Box>
        </Box>
    );
};
