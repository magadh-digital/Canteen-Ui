import { Autocomplete, Box, Checkbox, colors, FormControlLabel, FormGroup, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateOrderType } from "../AllTypes";
import ViewItemsDetails from "./ViewItemsDetails";
;
// import { useSelector } from "react-redux";

import axios from "axios";
import { GetAllUserApi } from "../AllGetApi";
import { baseUrl } from "../ApiEndPoint";
import AnimatedMessage from "./AnimatedMessage";

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

    useEffect(() => {
        setCreateOrderData((prev) => ({
            ...prev,
            user_id: selectedUser?.id || "",
            customer_name: selectedUser?.name || "WALKING",
            customer_type: selectedUser ? "USER" : "USER",
            status: "COMPLETED"
        }))
    }, [createOrderData])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
            <Box
                sx={{
                    width: mobile ? "100%" : "40%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    bgcolor: colors.grey[50],
                }}
            >
                <Stack direction={mobile ? "column" : "row"} sx={{ mt: 9, width: "100%", justifyContent: "space-between", }} spacing={2} >
                    <Stack>
                        <FormGroup row sx={{
                            ml: !mobile ? 0 : 5
                        }}>
                            <FormControlLabel
                                sx={{
                                    fontSize: 12
                                }}
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
                                                customer_type: "USER",
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
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 1
                }}>
                    <TableContainer sx={{ border: "0.5px solid #ccc", }}>
                        <Table size="small" sx={{}}>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{
                                        fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px",
                                        backgroundColor: colors.grey[200],
                                    }}>
                                        Name :
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right", padding: "8px", }}>{
                                        userData?.user?.name || 'N/A'
                                    }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", backgroundColor: colors.grey[200], fontWeight: "bold", color: "#333", padding: "8px" }}>
                                        Email     :                               </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", textAlign: "right", padding: "8px" }}>
                                        {userData?.user?.email || 'N/A'}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", backgroundColor: colors.grey[200], }}>
                                        Phone     :
                                    </TableCell>
                                    <TableCell style={{ fontSize: "12px", fontWeight: "bold", color: "#333", padding: "8px", textAlign: "right" }}>
                                        {userData?.user?.phone || 'N/A'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {
                    (userData?.vouchers || 0) > 0 && (
                        <AnimatedMessage userData={userData} />
                    )
                }


                <ViewItemsDetails userData={userData}
                    setCreatedOrderData={setCreateOrderData}
                    createdOrderData={createOrderData}
                />
            </Box>
        </Box>
    );
};
