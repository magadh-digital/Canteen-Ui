
import { AppBar, Box, Button, Checkbox, Dialog, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slide, TextField, Toolbar, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { GridCloseIcon } from '@mui/x-data-grid';
import React from 'react'
import { AddMenuProductType } from '../AllTypes';
import { PostMenuItemApi } from '../AllPostApi';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setAddProduct } from '../AllStoreSlice/AddProductCanteenSlice';



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddMenuProduct = () => {
    const { canteen_id } = useSelector((state: RootState) => state.AddProductCanteen)
    const dispatch = useDispatch()
    const [available, setAvailable] = React.useState(true);
    const [AddMenuItem, setMenuItem] = React.useState<AddMenuProductType>({
        name: "",
        description: "",
        price: 0,
        category: "",
        unit: "",
        available: true,
        image_url: "",
    })
    const { mutateAsync, isPending } = PostMenuItemApi()



    const handleClose = () => {
        dispatch(setAddProduct(""))
        setMenuItem({
            name: "",
            description: "",
            price: 0,
            category: "",
            unit: "",
            available: true,
            image_url: "",
        })
    };

    const handleCheckboxChange = (value: boolean) => {
        setAvailable(value);
        setMenuItem((prevState) => ({
            ...prevState,
            available: value
        }))

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMenuItem((prevState) => ({
            ...prevState,
            [name]: name === "price" ? Number(value) : value
        }))
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMenuItem((prevState) => ({
                ...prevState,
                image_url: file
            }));
        }
    };
    const saveHandleAllProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("canteen_id", canteen_id || "");
            formData.append("name", AddMenuItem.name || ""); ;
            formData.append("description", AddMenuItem.description || "");
            formData.append("price", AddMenuItem.price.toString() || "");
            formData.append("category", AddMenuItem.category || "");
            formData.append("unit", AddMenuItem.unit || "");
            formData.append("available", AddMenuItem.available.toString() || "");
            // formData.append("image_url", AddMenuItem.image_url);
            if (AddMenuItem.image_url instanceof File) {
                formData.append("image_url", AddMenuItem.image_url);
            }
            const res = await mutateAsync({
                data: formData
            })
            if (res?.status === 200) {
                toast.success("Product Added Successfully")
                handleClose()
                dispatch(setAddProduct(""))
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message)

        }
    }

    return (
        <>
            <Dialog
                fullScreen
                open={canteen_id !== ""}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: "#dc89c1", height: "50px", justifyContent: "center" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <GridCloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add Product Item
                        </Typography>
                        <Button
                            sx={{ bgcolor: "white", color: "black" }}
                            autoFocus
                            color="inherit"
                            onClick={saveHandleAllProduct}
                            variant="contained"
                            disabled={isPending}
                        >
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    bgcolor: "grey",

                }}>
                    <Box sx={{ width: "900px", bgcolor: "white", margin: "auto", p: 10 }}>
                        <Grid container spacing={1}>
                            <Grid container spacing={3}>
                                {/* Name Field */}
                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Name :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="name"
                                        value={AddMenuItem.name}
                                        label="Name"
                                        sx={{ bgcolor: "white" }}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Description :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="description"
                                        label="Description"
                                        value={AddMenuItem.description}
                                        onChange={handleInputChange}
                                        sx={{ bgcolor: "white" }}
                                    />
                                </Grid>

                                {/* Phone Number Field */}
                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Price :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="number"
                                        size="small"
                                        name="price"
                                        value={AddMenuItem.price}
                                        onChange={handleInputChange}
                                        sx={{ bgcolor: "white" }}
                                        label="Price"
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Category :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <FormControl fullWidth size="small" sx={{ bgcolor: "white" }}>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={AddMenuItem.category}
                                            label="Category"
                                            name="category"
                                            onChange={(event: any) => handleInputChange(event)}
                                        >
                                            <MenuItem value="SNACKS">Snacks</MenuItem>
                                            <MenuItem value="BEVERAGES">Beverages</MenuItem>
                                            <MenuItem value="MEALS">Meals</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Unit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <FormControl fullWidth size="small" sx={{ bgcolor: "white" }}>
                                        <InputLabel id="demo-simple-select-label">UNIT</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={AddMenuItem.unit}
                                            label="Unit"
                                            name="unit"
                                            onChange={(event: any) => handleInputChange(event)}
                                        >
                                            <MenuItem value="PIECE">Piece</MenuItem>
                                            <MenuItem value="KG">Kg</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Available :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <FormControl fullWidth size="small" sx={{ bgcolor: "white" }}>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                            <div>

                                                <Checkbox
                                                    checked={available === true}
                                                    onChange={() => handleCheckboxChange(true)}
                                                    name="TRUE"
                                                />
                                                <span>True</span>
                                            </div>
                                            <div>

                                                <Checkbox
                                                    checked={available === false}
                                                    onChange={() => handleCheckboxChange(false)}
                                                    name="FALSE"

                                                />
                                                <span>False</span>
                                            </div>
                                        </div>



                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align="right" sx={{ lineHeight: "40px" }}>
                                        Image :
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        type="file"
                                        fullWidth
                                        size="small"
                                        sx={{ bgcolor: "white" }}
                                        name="image_url"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageChange(event)}
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                        <div style={{ display: "flex", justifyContent: "flex-end", }}>
                            <LoadingButton
                                sx={{ bgcolor: "orange", color: "black", mt: 5 }}
                                autoFocus
                                color="inherit"
                                onClick={saveHandleAllProduct}
                                variant="contained"
                                loading={isPending}
                            >
                                save
                            </LoadingButton>
                        </div>
                    </Box>

                </Box>
            </Dialog>
        </>
    )
}

export default AddMenuProduct