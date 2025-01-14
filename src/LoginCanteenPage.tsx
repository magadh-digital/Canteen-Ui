import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import { FacebookOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { LoginCanteenUser } from "./AllPostApi";
import { toast } from "react-toastify";
import { LoginType } from "./AllTypes";
import { useDispatch } from "react-redux";
import { setLoginCanteenUser, setLoginCanteenUserToken } from "./AllStoreSlice/LoginCanteenUserSlice";

interface LoginTypes {
    user: {
        email?: string | null;
        password?: string | null;
        userName?: string | null;
    } | null
}

const LoginCanteenPage = () => {

    const navigate = useNavigate()
    const [signInPage, setSignInPage] = React.useState(false)
    const [loginData, setLoginData] = React.useState<{
        email?: string,
        password?: string,
        userName?: string
    }>({
        email: "",
        password: "",
        userName: "",
    })

    const [loginCheck, setLoginCheck] = React.useState<{
        email?: string,
        password?: string,

    }>({
        email: "",
        password: "",

    })



    const handleUpdatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSavePassword = () => {
        const { email, password, userName } = loginData;
        const userData: LoginTypes = {
            user: { email, password, userName },
        };
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
    };

    const { mutateAsync } = LoginCanteenUser()

    const handleUpdateCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCheck((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }
    const dispatch = useDispatch()
    const handleCheckPassword = React.useCallback(async () => {
        try {
            const res = await mutateAsync({
                data: loginCheck as LoginType,
            });
            if (res.status === 200) {
                toast.success("Login Successfully");
                navigate("/");
                localStorage.setItem("token", res.data.token);
                dispatch(setLoginCanteenUser(res.data.canteen));
                dispatch(setLoginCanteenUserToken(res.data.token));
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    }, [loginCheck, navigate, dispatch]);





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
                            // mt: -54,
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
                                {signInPage === false && (
                                    <>
                                        <Stack sx={{ alignItems: "left", width: "100%", }}>
                                            <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                                                Username
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
                                                name="userName"
                                                value={loginData.userName}
                                                onChange={handleUpdatePassword}
                                                size="small"
                                            />
                                        </Stack>
                                        <Stack sx={{ alignItems: "left", width: "100%", }}>
                                            <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                                                Email
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
                                                name="email"
                                                value={loginData.email}
                                                onChange={handleUpdatePassword}
                                                size="small"
                                            />
                                        </Stack>
                                        <Stack sx={{ alignItems: "left", width: "100%", }}>
                                            <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                                                Password
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
                                                name="password"
                                                onChange={handleUpdatePassword}
                                                type="password"
                                                value={loginData.password}
                                                size="small"
                                            />
                                        </Stack>
                                        <Stack sx={{ alignItems: "left", width: "100%", mt: 3 }}>
                                            <Button
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
                                                onClick={() => handleSavePassword()}
                                            > Register
                                            </Button>
                                        </Stack>
                                    </>

                                )}

                                {signInPage === true && (
                                    <>
                                        <Stack sx={{ alignItems: "left", width: "100%", }}>
                                            <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                                                Email
                                            </Typography>
                                            <TextField
                                                sx={{
                                                    width: "90%",
                                                    height: "40%",
                                                    bgcolor: "white",
                                                    borderRadius: "5px",
                                                    color: "white",
                                                    mt: 0
                                                }}
                                                name="email"
                                                value={loginCheck.email}
                                                onChange={handleUpdateCheckPassword}
                                                size="small"
                                            />
                                        </Stack>
                                        <Stack sx={{ alignItems: "left", width: "100%", }}>
                                            <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                                                Password
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
                                                name="password"
                                                onChange={handleUpdateCheckPassword}
                                                type="password"
                                                value={loginCheck.password}
                                                size="small"
                                            />
                                        </Stack>
                                        <Stack sx={{ alignItems: "left", width: "100%", mt: 3 }}>
                                            <Button
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
                                                onClick={() => handleCheckPassword()}
                                            >Sign In
                                            </Button>
                                        </Stack>
                                    </>
                                )}
                                <Stack sx={{ alignItems: "center", width: "100%", height: "100%", justifyContent: "end" }}>
                                    <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>
                                        <u style={{
                                            cursor: "pointer",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            textDecoration: "none"
                                        }}
                                            onClick={() => setSignInPage(true)}
                                        >sign in </u>
                                        /
                                        <u
                                            style={{
                                                cursor: "pointer",
                                                color: "white",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                textDecoration: "none"
                                            }}
                                            onClick={() => setSignInPage(false)}
                                        >new register</u>
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
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginCanteenPage;
