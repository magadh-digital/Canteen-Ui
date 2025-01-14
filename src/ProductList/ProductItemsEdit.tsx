
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slide, Stack, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { setMenuItemId } from '../AllStoreSlice/AllMenuItemsSlice'
import React, { useEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { UpdateProductItem } from '../AllPostApi';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const ProductItemsEdit = () => {
    const { menuItemId, menuItemsData } = useSelector((state: RootState) => state.allMenuItems)
    const { canteen } = useSelector((state: RootState) => state.LoginCanteenUser)
    const dispatch = useDispatch()
    const { mutateAsync: updateMenuItem } = UpdateProductItem()

    const [EditData, setEditData] = useState({
        name: menuItemsData?.name,
        price: menuItemsData?.price,
        description: menuItemsData?.description,
        category: menuItemsData?.category,
        unit: menuItemsData?.unit,
        available: menuItemsData?.available,
        image_url: menuItemsData?.image_url,
        canteen_id: canteen?.id
    })

    useEffect(() => {
        setEditData({
            name: menuItemsData?.name,
            price: menuItemsData?.price,
            description: menuItemsData?.description,
            category: menuItemsData?.category,
            unit: menuItemsData?.unit,
            available: menuItemsData?.available,
            image_url: menuItemsData?.image_url,
            canteen_id: canteen?.id
        })
    }, [menuItemsData, menuItemId])
    const handleClose = () => {

        dispatch(setMenuItemId(''));

    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData({ ...EditData, unit: e.target.value })
    }

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         setEditData((prevState: any) => ({
    //             ...prevState,
    //             image_url: file
    //         }));
    //     }
    // }

    const handleUpdate = async () => {
        try {

            await updateMenuItem({
                id: menuItemId,
                data: EditData,
            })
            toast.success("Product Updated Successfully")
            handleClose()

        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    }

    return (
        <>
            <Dialog
                open={menuItemId !== ""}
                TransitionComponent={Transition}
                onClose={() => dispatch(setMenuItemId(""))}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '50%',
                        maxWidth: '50%',
                        height: '50%',
                    },
                }}>
                <DialogTitle>
                    <Typography sx={{
                        fontSize: 25,
                        color: "blue",
                        fontWeight: "bold",
                        fontStyle: "italic"
                    }}>
                        Update Product
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={4}>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>Name:</Typography>
                            <TextField
                                name="name"
                                size='small'
                                value={EditData.name}
                                onChange={(e) => setEditData({ ...EditData, name: e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>Price:</Typography>
                            <TextField
                                name="price"
                                size='small'
                                value={EditData.price}
                                onChange={(e) => setEditData({ ...EditData, price: +e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>Description:</Typography>
                            <TextField
                                name="description"
                                size="small"
                                value={EditData.description}
                                onChange={(e) => setEditData({ ...EditData, description: e.target.value })}
                            />
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>Category:</Typography>
                            <FormControl size="small" sx={{ bgcolor: "white" }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    sx={{
                                        width: "250px"
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={EditData.category}
                                    label="Category"
                                    name="category"
                                    onChange={(event: any) => handleInputChange(event)}
                                >
                                    <MenuItem value="SNACKS">Snacks</MenuItem>
                                    <MenuItem value="BEVERAGES">Beverages</MenuItem>
                                    <MenuItem value="MEALS">Meals</MenuItem>
                                </Select>
                            </FormControl>

                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>Unit:</Typography>
                            <FormControl size="small" sx={{ bgcolor: "white" }}>
                                <InputLabel id="demo-simple-select-label">UNIT</InputLabel>
                                <Select
                                    sx={{
                                        width: "250px"
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={EditData.unit}
                                    label="Unit"
                                    name="unit"
                                    onChange={(event: any) => handleInputChange(event)}
                                >
                                    <MenuItem value="PIECE">Piece</MenuItem>
                                    <MenuItem value="KG">Kg</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' size='small' onClick={() => dispatch(setMenuItemId(""))}>Cancel</Button>
                    <Button size='small' variant='contained' onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}