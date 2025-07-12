import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slide, Stack, TextField, Paper, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setMenuItemId } from '../AllStoreSlice/AllMenuItemsSlice';
import React, { useEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { UpdateProductItem } from '../AllPostApi';
import { toast } from 'react-toastify';
import { ErrorHandle } from '../ErrorHandle';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ProductItemsEdit = () => {
    const { menuItemId, menuItemsData } = useSelector((state: RootState) => state.allMenuItems);
    const canteen_id = localStorage.getItem('canteen_user_id');
    const dispatch = useDispatch();
    const { mutateAsync: updateMenuItem } = UpdateProductItem();
    const [EditData, setEditData] = useState<{
        name: string;
        price: number;
        description: string;
        category: string;
        unit: string;
        available: boolean;
        image_url: string | File;
        canteen_id: string | null;
        order?: string
    }>({
        name: menuItemsData?.name || "",
        price: menuItemsData?.price || 0,
        description: menuItemsData?.description || "",
        category: menuItemsData?.category || "",
        unit: menuItemsData?.unit || "",
        available: menuItemsData?.available || false,
        image_url: menuItemsData?.image_url || "",
        canteen_id: canteen_id,
        order: menuItemsData?.order
    });

    useEffect(() => {
        if (menuItemsData) {
            setEditData({
                name: menuItemsData.name || '',
                price: menuItemsData.price || 0,
                description: menuItemsData.description || '',
                category: menuItemsData.category || '',
                unit: menuItemsData.unit || '',
                available: menuItemsData.available || true,
                image_url: menuItemsData.image_url || '',
                canteen_id: canteen_id,
                order: menuItemsData.order
            });
        }
    }, [menuItemsData, menuItemId]);

    const handleClose = () => dispatch(setMenuItemId(''));

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditData({
            ...EditData,
            [event.target.name]: event.target.name === 'price' || event.target.name === 'order' ? Number(event.target.value) : event.target.value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setEditData({ ...EditData, [event.target.name]: event.target.value });
    };
    const handleUpdate = async () => {
        try {

            const priceValue = Number(EditData.price);
            if (isNaN(priceValue)) {
                toast.error('Invalid price value');
                return;
            }

            const formData = new FormData();
            formData.append('name', EditData.name);
            formData.append('price', priceValue.toString());
            formData.append('description', EditData.description);
            formData.append('category', EditData.category);
            formData.append('unit', EditData.unit);
            formData.append('available', EditData.available.toString());
            formData.append('canteen_id', canteen_id || '');
            formData.append('order', EditData.order || '');

            if (EditData.image_url instanceof File) {
                formData.append('image_url', EditData.image_url);
            }
            const res = await updateMenuItem({ id: menuItemId, data: formData });
            if (res?.status === 200) {
                toast.success('Product Updated Successfully');
                handleClose();
            }
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setEditData((prevState) => ({
                ...prevState,
                image_url: file,
            }));
        }
    };

    return (
        <Dialog
            open={menuItemId !== ''}
            TransitionComponent={Transition}
            onClose={handleClose}
            sx={{ '& .MuiDialog-paper': { width: '40%', maxWidth: '500px', borderRadius: 3, p: 2, bgcolor: "#f5f5f5" } }}
        >
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>Update Product</DialogTitle>
            <DialogContent>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, }}>
                    <Stack spacing={2}>
                        <TextField size="small" label="Name" name="name" fullWidth value={EditData.name} onChange={handleTextFieldChange} />
                        <TextField size="small" label="Price" name="price" fullWidth type="number" value={EditData.price} onChange={handleTextFieldChange} />
                        <TextField size="small" label="Description" name="description" fullWidth multiline rows={2} value={EditData.description} onChange={handleTextFieldChange} />
                        <TextField size="small"
                            label="OrderNumber"
                            name="order" fullWidth multiline
                            rows={2}
                            value={EditData.order}
                            onChange={handleTextFieldChange}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select size="small" label="category" name="category" value={EditData.category} onChange={handleSelectChange}>
                                <MenuItem value="SNACKS">Snacks</MenuItem>
                                <MenuItem value="BEVERAGES">Beverages</MenuItem>
                                <MenuItem value="MEALS">Meals</MenuItem>
                                <MenuItem value="OTHERS">Others</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Unit</InputLabel>
                            <Select size="small" label="Unit" name="unit" value={EditData.unit} onChange={handleSelectChange}>
                                <MenuItem value="PIECE">Piece</MenuItem>
                                <MenuItem value="KG">Kg</MenuItem>
                                <MenuItem value="PLATE">Plate</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                size="small"
                                type="file"
                                name="image_url"
                                fullWidth
                                onChange={handleFileChange}
                            />
                        </FormControl>
                    </Stack>
                </Paper>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdate}>Update</Button>
            </DialogActions>
        </Dialog>
    );
};
