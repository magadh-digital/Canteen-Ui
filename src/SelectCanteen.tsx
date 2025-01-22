
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, Typography, colors, Stack } from '@mui/material'
import { RootState } from './Store'
import { setLoginCanteenData, setLoginCanteenUser, setLoginCanteenUserToken } from './AllStoreSlice/LoginCanteenUserSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { baseUrl } from './ApiEndPoint'
import { CanteenData } from './AllTypes'


const SelectCanteen = () => {
    const { canteen } = useSelector((state: RootState) => state.LoginCanteenUser)
    const [openModal, setOpenModal] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("canteen_token");
        const canteenData = localStorage.getItem("canteen_data");
        const canteen_id = localStorage.getItem("canteen_user_id");
        if (token) {
            axios.get(`${baseUrl}/user/token/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res: any) => {
                dispatch(setLoginCanteenUser(res.data.user));
                if (canteen_id === null) {
                    setOpenModal(true)
                    dispatch(setLoginCanteenData(JSON.parse(canteenData as "{}")));
                    dispatch(setLoginCanteenUserToken(res.data.token));
                } else {
                    navigate('/dashboard')
                }
            }).catch((error: any) => {
                toast.error(error?.response?.data?.error);
                localStorage.removeItem("token");
                navigate("/");
            });
        }
    }, [navigate]);
    const onSelect = (canteen: string, name: CanteenData) => {
        localStorage.setItem('canteen_user_id', canteen)
        localStorage.setItem('canteen_name', JSON.stringify(name))
        setOpenModal(false)
        navigate('/dashboard')
    }

    return (
        <Dialog
            open={openModal}
            onClose={() => toast.error("Please Select a Canteen")}
            sx={{
                '& .MuiDialog-root': {
                    position: 'relative',
                },
                '& .MuiBackdrop-root': {
                    backgroundImage: `url('public/ingredients-near-pizza_23-2147772081.avif')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                },
                '& .MuiDialog-paper': {
                    width: '50%',
                    maxWidth: '40%',
                    height: '50%',
                    maxHeight: '50%',
                    borderRadius: '20px',
                    bgcolor: colors.green[300],
                    overflow: 'auto',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 2.5)',
                },
            }}
        >
            <DialogTitle>
                <Typography variant="h6" sx={{
                    color: colors.blue[800],
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    fontSize: "25px",
                    fontStyle: "italic"
                }}>
                    Select a Canteen
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Stack direction={"row"} width={"100%"} gap={2} mt={2} justifyContent={"center"}>
                    <List>
                        {canteen?.map((canteen: CanteenData, index: number) => (
                            <ListItem key={index} sx={{
                                width: "100%",
                                borderRadius: "10px",
                                bgcolor: colors.red[100],
                                mt: 1
                            }}>
                                <ListItemButton onClick={() => onSelect(canteen.id, canteen)}>
                                    {canteen.name}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default SelectCanteen