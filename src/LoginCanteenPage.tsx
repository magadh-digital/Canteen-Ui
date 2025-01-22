import { Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import { FacebookOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PostOtpSender, PostVerifyOtp } from "./AllPostApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoginCanteenData, setLoginCanteenUser, setLoginCanteenUserToken } from "./AllStoreSlice/LoginCanteenUserSlice";
import { LoadingButton } from "@mui/lab";



const LoginCanteenPage = () => {

    const navigate = useNavigate()
    const [signInPage, setSignInPage] = React.useState(false)
    const [loginData, setLoginData] = React.useState<{
        phone?: number,
        otp?: number,
    }>({
        phone: 0,
        otp: 0,
    })
    const { mutateAsync: OtpSender, isPending } = PostOtpSender()
    const { mutateAsync: VerifyOtp, isPending: isPendingVerify } = PostVerifyOtp()



    const handleUpdatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSavePassword = async () => {
        const userData = {
            phone: loginData.phone || 0,
        }
        try {
            const res = await OtpSender({ data: Number(userData.phone) })

            if (res.status === 200) {
                setLoginData((prevState) => ({
                    ...prevState,
                    otp: res.data.otp
                }))
                setSignInPage(true)
            }

        } catch (error: any) {
            toast.error(error.message)
            toast.error(error.response.data.error)

        }
    };

    const dispatch = useDispatch()
    const handleCheckPassword = async () => {
        if (loginData.otp !== 0) {
            const userData = {
                phone: loginData.phone || 0,
                otp: loginData.otp || 0
            }
            try {
                const res = await VerifyOtp({ data: Number(userData.otp), phone: Number(userData.phone) })
                if (res.status === 200) {
                    localStorage.setItem('canteen_token', res.data.token)
                    localStorage.setItem('canteen_data', JSON.stringify(res.data.canteen))
                    dispatch(setLoginCanteenUser(res.data.user))
                    dispatch(setLoginCanteenUserToken(res.data.token))
                    dispatch(setLoginCanteenData(res.data.canteen))
                    navigate('/SelectCanteen')
                }
            } catch (error: any) {
                setSignInPage(false)
                toast.error(error.response.data.error)
            }
        } else {
            toast.error("Enter OTP")
        }
    }

    return (
        <Box sx={{
            position: "relative",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
        }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    backgroundImage: "url('public/ingredients-near-pizza_23-2147772081.avif')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(5px)",
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <Box sx={{
                    height: "70%",
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "15px",
                    border: "1px solid white",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}>
                    <Box sx={{
                        width: "60%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}>
                        <Typography variant="h5" sx={{
                            color: "white",

                            ml: 13
                        }}>
                            <img src="public/Pasted image (2).png" width={"20%"} alt="logo" />
                        </Typography>
                        <Box sx={{
                            ml: 4,
                            mb: 10
                        }}>
                            <img
                                src={"public/pngwing.com1_.webp"}
                                width={"80%"}
                                alt="Canteen Illustration"
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "40%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        <Box
                            sx={{
                                width: "80%",
                                height: "70%",
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                                // border: "1px solid white",
                                borderRadius: "15px",
                                display: "flex",
                                flexDirection: "column",

                            }}
                        >
                            <Typography variant="h5" sx={{
                                color: "white",
                                mt: 3,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center"
                            }}

                            >
                                Login
                            </Typography>
                            <Stack
                                ml={1}
                                p={1}
                                width={"100%"}
                                height={"100%"}
                                overflow={"auto"}
                                justifyContent={"center"}
                                sx={{
                                    "&::-webkit-scrollbar": {
                                        width: "2px",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "2px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                                        borderRadius: "10px",
                                        border: "2px solid rgba(0, 0, 0, 0)",
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    },
                                }}
                            >
                                <Stack sx={{ width: "100%", height: "100%", justifyContent: "space-between", }}>
                                    <Stack mt={12} spacing={3}>
                                        <Stack sx={{ alignItems: "left", width: "100%", height: "100%", justifyContent: "flex-end" }}>
                                            <Typography variant="h6" sx={{ color: "white", }}>
                                                Mobile No.
                                            </Typography>
                                            <TextField
                                                sx={{
                                                    width: "90%",
                                                    height: "auto",
                                                    bgcolor: "white",
                                                    // border: "1px solid white",
                                                    borderRadius: "5px",
                                                    color: "white",
                                                }}
                                                type="number"
                                                name="phone"
                                                value={loginData.phone}
                                                onChange={handleUpdatePassword}
                                                size="small"
                                            />
                                            {signInPage === true && (
                                                <Stack sx={{ alignItems: "left", width: "100%", }}>
                                                    <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                                                        OTP
                                                    </Typography>
                                                    <TextField
                                                        sx={{
                                                            width: "90%",
                                                            height: "40%",
                                                            bgcolor: "white",
                                                            // border: "1px solid white",
                                                            borderRadius: "5px",
                                                            color: "white",
                                                            mt: 0
                                                        }}
                                                        name="otp"
                                                        type="number"
                                                        value={loginData.otp}
                                                        onChange={handleUpdatePassword}
                                                        size="small"
                                                    />
                                                </Stack>
                                            )}
                                        </Stack>
                                        <Stack sx={{ alignItems: "left", }}>
                                            {isPending && <CircularProgress />}
                                            {signInPage === false ? (
                                                <LoadingButton
                                                    sx={{
                                                        width: "90%",
                                                        height: "fit-content",
                                                        borderRadius: "5px",
                                                        bgcolor: "orangered",
                                                        color: "white",
                                                        fontSize: "14px",
                                                        fontWeight: "bold"
                                                    }}
                                                    variant="contained"
                                                    loading={isPending}
                                                    onClick={() => handleSavePassword()}
                                                > Send OTP
                                                </LoadingButton>
                                            ) : (
                                                <>
                                                    <LoadingButton
                                                        sx={{
                                                            width: "90%",
                                                            height: "fit-content",
                                                            borderRadius: "5px",
                                                            bgcolor: "orangered",
                                                            color: "white",
                                                            fontSize: "14px",
                                                            fontWeight: "bold"
                                                        }}
                                                        disabled={isPendingVerify}
                                                        onClick={() => handleCheckPassword()}
                                                    >
                                                        Verify
                                                    </LoadingButton>

                                                </>
                                            )}
                                        </Stack>

                                    </Stack>
                                    <Stack spacing={2}>
                                        <Stack sx={{ alignItems: "center", width: "100%", height: "100%", justifyContent: "end" }}>
                                            <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>
                                                <u style={{
                                                    cursor: "pointer",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    textDecoration: "none"
                                                }}
                                                >sign in </u>
                                            </span>
                                        </Stack>
                                        <Stack
                                            direction={"row"}
                                            mb={1}
                                            sx={{
                                                justifyContent: "end",
                                                width: "100%",
                                                height: "100%",

                                            }}
                                            flexDirection={"column"}
                                        >
                                            <Stack direction={"row"}
                                                spacing={2}
                                                justifyContent={"center"}
                                                alignContent={"center"}
                                                width={"100%"}

                                            >
                                                <GoogleIcon sx={{
                                                    color: "red",
                                                    bgcolor: "white",
                                                    borderRadius: "50%",
                                                    width: "60px",
                                                    p: 0.2
                                                }} />
                                                <FacebookOutlined sx={{
                                                    color: "red",
                                                    bgcolor: "white",
                                                    borderRadius: "50%",
                                                    width: "60px",
                                                    p: 0.2
                                                }} />
                                                <XIcon sx={{
                                                    color: "red",
                                                    bgcolor: "white",
                                                    borderRadius: "50%",
                                                    width: "60px",
                                                    p: 0.2
                                                }}
                                                />
                                            </Stack>

                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginCanteenPage;
