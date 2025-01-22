import { Autocomplete, Box, Button, Checkbox, colors, FormControlLabel, FormGroup, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
;
import ViewItemsDetails from "./ViewItemsDetails";
import { CreateOrderType } from "../AllTypes";
// import { useSelector } from "react-redux";

import { GetAllUserApi } from "../AllGetApi";
import axios from "axios";
import { baseUrl } from "../ApiEndPoint";

export interface UserDataType {
    user: {
        id?: string;
        name?: string;
        phone?: number;
        email?: string;
        role?: string;
        cp_code?: string;
    };
    vouchers?: number
}

export const RenderUserLogin = ({
    setCreateOrderData,
    createOrderData,
    setUserData,
    userData,
    selectedUser,
    setSelectedUser
}: {
    setCreateOrderData: React.Dispatch<React.SetStateAction<CreateOrderType>>;
    createOrderData: CreateOrderType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>
    userData: UserDataType;
    selectedUser: any;
    setSelectedUser: React.Dispatch<React.SetStateAction<any>>
}) => {

    const mobile = useMediaQuery("(max-width:800px)");
    const { data, isLoading, refetch, isRefetching } = GetAllUserApi()
    const [userType, setUserType] = useState("WALKING")

    const handleChangeSelectUser = async (user: any) => {
        try {
            const res = await axios.get(`${baseUrl}/voucher/remaining?user_id=${user.id}`)
            setUserData({
                user: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    cp_code: user.cp_code,
                },
                vouchers: res.data.vouchers
            })
        } catch (error: any) {

        }
        setSelectedUser(user || null);
        setCreateOrderData((prev) => ({
            ...prev,
            user_id: user?.id || "",
            customer_name: user?.name || "WALKING",
            customer_type: user ? "USER" : "WALKING",
        }))

    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
            <Box sx={{ width: mobile ? "100%" : "40%", display: "flex", flexDirection: "column", justifyContent: "start", bgcolor: colors.grey[50] }}>
                <Stack direction={mobile ? "column" : "row"} sx={{ mt: 10, width: "100%", justifyContent: "space-between", }} spacing={2} >
                    <Stack>
                        <FormGroup row sx={{
                            ml: !mobile ? 0 : 5
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            userType === "WALKING"
                                        }
                                        onChange={(e) => {
                                            setUserType(e.target.checked ? "WALKING" : "EMPLOYEE")
                                            setUserData({
                                                user: {},
                                                vouchers: 0
                                            })
                                            setSelectedUser(null)
                                            setCreateOrderData((prev) => ({
                                                ...prev,
                                                user_id: "",
                                                customer_name: "WALKING",
                                                customer_type: "WALKING",
                                            }))
                                        }}
                                        name="WALKING" />}
                                label="Walking"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={(
                                            userType === "EMPLOYEE")}
                                        onChange={(e) => setUserType(e.target.checked ? "EMPLOYEE" : "WALKING")}
                                        name="EMPLOYEE"
                                        color="primary"
                                    />
                                }
                                label="EMPLOYEE"
                            />

                        </FormGroup>
                    </Stack>
                    <Stack>
                        {userType === "EMPLOYEE" && <>
                            <Stack width={"100%"} >
                                <Autocomplete
                                    id="free-solo-demo"
                                    size="small"
                                    disablePortal
                                    options={data?.users || []}
                                    getOptionLabel={(option) => option.name || ""}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    value={selectedUser}
                                    onChange={(_, newValue: any) => {
                                        handleChangeSelectUser(newValue)
                                    }}
                                    sx={{ width: !mobile ? 300 : "250px", ml: !mobile ? 0 : 5 }}
                                    renderInput={(params) => <TextField {...params} label="User" />}
                                    loading={isLoading || isRefetching}
                                />
                            </Stack>
                        </>}
                    </Stack>

                </Stack>
                {userData?.user && (
                    <Stack sx={{ mt: 1, width: "100%" }}>
                        <Box sx={{ display: "flex", gap: 2, bgcolor: colors.grey[100], p: 2, justifyContent: "space-between" }}>
                            <Typography sx={{ fontWeight: "bold", color: colors.blue[800] }}>
                                {userData.user?.name || ""}
                            </Typography>
                            <Typography sx={{ fontWeight: "bold", color: colors.red[400] }}>
                                {userData.user?.phone || ""}
                            </Typography>
                            <Typography sx={{ fontWeight: "bold", color: colors.blue[800] }}>
                                {userData.user?.email || ""}
                            </Typography>
                        </Box>
                    </Stack>
                )}



                <ViewItemsDetails userData={userData}
                    setCreatedOrderData={setCreateOrderData}
                    createdOrderData={createOrderData}
                />
            </Box>
        </Box>
    );
};
