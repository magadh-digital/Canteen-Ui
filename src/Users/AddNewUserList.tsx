
import { LoadingButton } from '@mui/lab'
import { Box, colors, Dialog, DialogActions, DialogTitle, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { AddNewUserRegister } from '../AllPostApi';
import { toast } from 'react-toastify';
import { ErrorHandle } from '../ErrorHandle';

export interface AddNewUserListProps {
    name: string;
    email: string;
    role: string;
    image: string | File;
    phone: string | number
}
const AddNewUserList = () => {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const [addUser, setAddUser] = useState<AddNewUserListProps>({
        name: "",
        email: "",
        role: "CUSTOMER",
        image: "",
        phone: ""
    })
    const handleClose = () => {
        setOpen(false)
        setAddUser({
            name: "",
            email: "",
            role: "",
            image: "",
            phone: ""
        })
    }
    const { mutateAsync, isPending } = AddNewUserRegister()

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAddUser((prevState) => ({
            ...prevState,
            [name]: name === "phone" ? Number(value) : value
        }))
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAddUser((prevState) => ({
                ...prevState,
                image: file,
            }));
        };
    }

    const handleSaveUser = async () => {
        const formData = new FormData();

        formData.append("name", addUser.name);
        formData.append("email", addUser.email);
        formData.append("role", addUser.role);
        formData.append("phone", Number(addUser.phone).toString());
        if (addUser.image instanceof File) {
            formData.append("image", addUser.image);
        }

        if (formData?.get("name") === "") {
            toast.error("Please Enter User Name")
            return
        }
        if (formData?.get("email") === "") {
            toast.error("Please Enter User Email")
            return
        }
        if (formData?.get("role") === "") {
            toast.error("Please Enter User Role")
            return
        }
        if (formData?.get("phone") === "") {
            toast.error("Please Enter User Phone")
            return
        }
        try {
            const res = await mutateAsync(formData);
            if (res?.status === 200) {
                handleClose()
                toast.success("User Added Successfully")
            }



        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }

    return (
        <div>
            <button style={{
                borderRadius: "15px",
                border: "none",
                backgroundColor: colors.grey[800],
                color: "white",
                cursor: "pointer",
                height: "40px",
                fontWeight: "bold"
            }}
                onClick={handleClickOpen}
            >
                + Add New User
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": {
                        minWidth: "28vw",
                        maxWidth: "28vw",
                        minHeight: "auto",
                        maxHeight: "auto",
                        borderRadius: "20px",
                        overflow: "auto",
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: colors.blue[400],
                        textAlign: "center",
                        textDecoration: "underline"
                    }}>
                        Add New User
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        p: 0,
                        bgcolor: "white",
                        boxShadow: 4,
                        borderRadius: "20px",
                        mt: 2
                    }}>
                        <Stack spacing={3} width={"95%"} p={2} height={"100%"}>
                            <TextField
                                id="outlined-basic"
                                label="User Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                name="name"
                                onChange={handleChange}
                                value={addUser.name}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px"
                                    }
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="User Phone"
                                variant="outlined"
                                size="small"
                                fullWidth
                                name="phone"
                                onChange={handleChange}
                                value={addUser.phone}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px"
                                    }
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="User Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                name="email"
                                onChange={handleChange}
                                value={addUser.email}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px"
                                    }
                                }}
                            />
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={addUser.role}
                                label="User Role"
                                name="role"
                                size='small'
                                fullWidth
                                onChange={handleChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px"
                                    }
                                }}
                            >
                                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                                <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
                                <MenuItem value={"EMPLOYEE"}>EMPLOYEE</MenuItem>
                            </Select>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                type='file'
                                fullWidth
                                onChange={handleFileChange}
                                name='image'
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px"
                                    }
                                }}
                            />
                            <Stack direction={"row"} justifyContent={"center"} sx={{ width: "100%" }}>
                                <LoadingButton
                                    onClick={handleSaveUser}
                                    sx={{
                                        bgcolor: colors.blue[400],
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        "&:hover": {
                                            bgcolor: colors.blue[200],
                                            color: "white",
                                        },
                                        width: "50%",
                                        borderRadius: "15px",

                                    }}
                                    size='small'
                                    loading={isPending}
                                >
                                    Save
                                </LoadingButton>
                                <LoadingButton
                                    onClick={handleClose}
                                    sx={{
                                        bgcolor: colors.red[400],
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        "&:hover": {
                                            bgcolor: colors.red[200],
                                            color: "white",
                                        },
                                        width: "50%",
                                        borderRadius: "15px",

                                    }}
                                    size='small'
                                >
                                    close
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Box>
                    <DialogActions>
                    </DialogActions>
                </DialogTitle>
            </Dialog>
        </div >
    )
}

export default AddNewUserList