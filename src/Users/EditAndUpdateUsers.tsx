import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, Stack, TextField, } from '@mui/material';
import React, { useEffect } from 'react';
import { CanteenUserDataType } from '../AllTypes';
import { UpdateUserData } from '../AllPostApi';
import { toast } from 'react-toastify';
import { GetCanteenUserApi } from '../AllGetApi';
import { ErrorHandle } from '../ErrorHandle';

const EditAndUpdateUsers = ({ user_id, data }: { user_id: string, data: CanteenUserDataType }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { mutateAsync, isPending } = UpdateUserData();
    const { data: canteenUser } = GetCanteenUserApi();

    const [updateUserData, setUpdateUserData] = React.useState<CanteenUserDataType>({
        name: "", email: "", role: "", profile_url: "", phone: "", canteen_id: []
    });

    useEffect(() => {
        if (data) {
            setUpdateUserData({
                name: data.name, email: data.email, role: data.role,
                profile_url: data.profile_url, phone: data.phone,
                canteen_id: data.canteen_id || []
            });
        }
    }, [data]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('name', updateUserData.name || '');
        formData.append('email', updateUserData.email || '');
        formData.append('role', updateUserData.role || '');
        formData.append('phone', Number(updateUserData.phone)?.toString() || '');
        formData.append('canteen_id', updateUserData?.canteen_id?.toString() || '');
        if (updateUserData.profile_url instanceof File) {
            formData.append('profile_url', updateUserData.profile_url);
        }
        try {
            const res = await mutateAsync({ data: formData, user_id });
            if (res?.status === 200) {
                handleClose();
                toast.success("User Updated Successfully");
            }
        } catch (error: any) {
            // toast.error(error.response.data.message);
            ErrorHandle(error.response)
        }
    };

    return (
        <>
            <Button onClick={handleOpen} variant="contained" color="primary"> <Edit /></Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle textAlign="center" fontWeight={600}>Update User</DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            value={updateUserData.name}
                            size='small'
                            fullWidth
                            onChange={(e) =>
                                setUpdateUserData({
                                    ...updateUserData,
                                    name: e.target.value
                                })}
                        />
                        <TextField label="Email" value={updateUserData.email} size='small' fullWidth onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })} />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={updateUserData.role}
                            label="User Role"
                            name="role"
                            size='small'
                            fullWidth
                            onChange={(e) => {
                                setUpdateUserData({
                                    ...updateUserData,
                                    role: e.target.value
                                })
                            }}
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
                        <TextField label="Phone" value={updateUserData.phone} size='small' fullWidth onChange={(e) => setUpdateUserData({ ...updateUserData, phone: e.target.value })} />
                        <FormControl fullWidth>
                            <Select
                                multiple
                                size='small'
                                value={updateUserData.canteen_id}
                                onChange={(e) => setUpdateUserData({ ...updateUserData, canteen_id: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value })}
                                renderValue={(selected) => selected.map(id => canteenUser?.canteens?.find(c => c.id === id)?.name).join(', ')}
                            >
                                {canteenUser?.canteens?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {updateUserData?.canteen_id?.map(id => (
                                <Chip
                                    key={id}
                                    label={canteenUser?.canteens?.
                                        find(c =>
                                            c.id === id)?.name || "Unknown"
                                    }
                                    onDelete={() =>
                                        setUpdateUserData({
                                            ...updateUserData,
                                            canteen_id: updateUserData?.canteen_id?.filter(cid =>
                                                cid !== id
                                            )
                                        })}
                                    deleteIcon={<Delete />}
                                />
                            ))}
                        </Box>
                        <Button variant="contained" component="label" fullWidth>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    setUpdateUserData({
                                        ...updateUserData,
                                        profile_url: e.target.files[0]
                                    })} />
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
                    <Button disabled={isPending} onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditAndUpdateUsers;
