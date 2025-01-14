import { Box, Button, colors, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react';
import { CanteenUserType } from '../AllTypes';
import { PostCanteenUserApi } from '../AllPostApi';
import { toast } from 'react-toastify';



const CreateCanteen = () => {
    const [CanteenUserData, setCanteenUserData] = React.useState<CanteenUserType>({
        name: "",
        description: "",
        contact: 0,
        email: "",
        password: ""
    });
    const { mutateAsync } = PostCanteenUserApi()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCanteenUserData((prevState) => ({
            ...prevState,
            [name]: name === "contact" ? Number(value) : value
        }))
    }

    const handleSubmitUserDetails = async () => {

        try {
            await mutateAsync({
                data: CanteenUserData
            })
            toast.success("Canteen Created Successfully")
            setCanteenUserData({
                name: "",
                description: "",
                contact: 0,
                email: "",
                password: ""
            })
        } catch (error: any) {
            toast.error(error.response.data.error)
        }

    }

    return (
        <>
            <Box sx={{
                mt: 5,
                p: 5,
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: colors.grey[200],
            }}>
                <Box sx={{ width: "70%" }}>
                    <Typography variant="h5" align="center" mb={3}>
                        Create Canteen
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Name Field */}
                        <Grid item xs={4}>
                            <Typography align="right" sx={{ lineHeight: "40px" }}>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                name="name"
                                value={CanteenUserData.name}
                                label="Name"
                                sx={{ bgcolor: "white" }}
                                onChange={handleChangeValue}
                            />
                        </Grid>

                        {/* Description Field */}
                        <Grid item xs={4}>
                            <Typography align="right" sx={{ lineHeight: "40px" }}>
                                Description
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                name="description"
                                label="Description"
                                onChange={handleChangeValue}
                                value={CanteenUserData.description}
                                sx={{ bgcolor: "white" }}
                            />
                        </Grid>

                        {/* Phone Number Field */}
                        <Grid item xs={4}>
                            <Typography align="right" sx={{ lineHeight: "40px" }}>
                                Phone Number
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type="number"
                                size="small"
                                name="contact"
                                value={CanteenUserData.contact}
                                sx={{ bgcolor: "white" }}
                                label="Phone number"
                                onChange={handleChangeValue}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography align="right" sx={{ lineHeight: "40px" }}>
                                Create Name
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                sx={{ bgcolor: "white" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" sx={{ lineHeight: "40px" }}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                sx={{ bgcolor: "white" }}
                                name="email"
                                value={CanteenUserData.email}
                                label="Email"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="right" sx={{ lineHeight: "40px" }}>
                                Password
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                // type="password"
                                size="small"
                                sx={{ bgcolor: "white" }}
                                name="password"
                                value={CanteenUserData.password}
                                label="Password"
                                onChange={handleChangeValue}
                            />
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Stack direction="row" justifyContent="center" mt={3}>
                        <Button variant="contained" onClick={handleSubmitUserDetails}>
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Box >
        </>
    )
}

export default CreateCanteen