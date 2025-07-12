import { Box, Button, colors, Drawer, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginCanteenUser, setLoginCanteenUserToken } from "./AllStoreSlice/LoginCanteenUserSlice";
import { RootState } from "./Store";
import { image_base_url } from "./ApiEndPoint";
import { setZoomImage } from "./AllStoreSlice/ZoomImageSlice";
import imgagePr from '../src/assets/imagesPr.png'
import imagelog from '../src/assets/4263209.png'

export const ProfilePage = () => {
    const [open, setOpen] = useState(false);
    const { user: canteen } = useSelector((state: RootState) => state.LoginCanteenUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleLogout = () => {
        dispatch(setLoginCanteenUserToken(""))
        dispatch(setLoginCanteenUser(null))
        localStorage.removeItem('canteen_token')
        localStorage.removeItem('canteen_user_id')
        localStorage.removeItem('canteen_data')
        localStorage.removeItem('canteen_name')
        navigate('/login');
    };



    return (
        <>
            <Tooltip title=" View Profile">
                <span onClick={handleClickOpen} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",

                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    padding: "5px",
                 }}>
                    <img src={`${imgagePr}`} width={"20px"} height={"20px"} />
                </span>
            </Tooltip>

            <Drawer
                anchor='right'
                open={open}
                style={{ position: "absolute", }}
                PaperProps={{
                    sx: {
                        width: "400px",
                        height: "100%",
                        backgroundColor: colors.grey[200],
                    }
                }}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        backgroundColor: colors.grey[200],
                        mt: 8
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                        mt={5}
                    >
                        <img
                            onClick={() => dispatch(setZoomImage(`${image_base_url}${canteen?.profile_url}`))}
                            src={`${image_base_url}${canteen?.profile_url}`}
                            width={"108px"}
                            height={"108px"}
                            style={{ borderRadius: "50%", cursor: "pointer" }}
                        />
                        <div>
                            <Typography variant="h5" component="div"
                                style={{
                                    fontWeight: "bold",
                                    color: "blue",
                                    fontStyle: "italic",

                                }}
                            >
                                {canteen?.name}
                            </Typography>
                            {canteen?.email}
                        </div>
                    </Stack>
                    <div style={{ marginTop: "20px" }}>
                        <hr />
                        <Stack direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                            p={2}
                        >
                            <Typography component="div"
                                style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontStyle: "italic"
                                }}>
                                Name
                            </Typography>
                            {canteen?.name}
                        </Stack>
                        <hr />
                        <Stack direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                            p={2}
                        >
                            <Typography component="div"
                                style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontStyle: "italic"
                                }}>
                                Contact
                            </Typography>
                            {canteen?.phone}
                        </Stack>
                        <hr />
                        <Stack direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                            p={2}
                        >
                            <Typography component="div"
                                style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontStyle: "italic"
                                }}>
                                Email
                            </Typography>
                            {canteen?.email}
                        </Stack>
                        <hr />
                        <Stack direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                            p={2}
                        >
                            <Typography component="div"
                                style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontStyle: "italic"
                                }}>
                                Location
                            </Typography>
                            INDIA
                        </Stack>
                        <hr />
                    </div>
                </Box>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "end",
                    height: "100%",
                    marginBottom: "20px"
                }}>
                    <Button
                        onClick={() => handleLogout()}
                        variant="contained"
                        size="small"
                        style={{
                            backgroundColor: colors.red[400],
                            borderColor: "none",
                            border: "none",
                            color: "white",
                            width: "150px",
                            fontSize: "15px",
                            fontWeight: "bold"
                        }}>
                        Log Out <img src={`${imagelog}`} alt='"no img' width={"40px"} height={"30px"} />
                    </Button>

                </div>
            </Drawer>
        </>
    )
}

