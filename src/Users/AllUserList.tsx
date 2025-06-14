import { Box, colors, FormControl, InputLabel, LinearProgress, MenuItem, Modal, Select, Stack, TableContainer, TextField, Typography } from "@mui/material"
import RefecthButton from "../RefecthButton"
import { GetAllUserApiSearch } from "../AllGetApi"
import { useState } from "react"
import moment from "moment"
import AddNewUserList from "./AddNewUserList"

import { AddVoucher } from "./AddVoucherAndUpdate"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { setZoomImage } from "../AllStoreSlice/ZoomImageSlice"
import { CustomPagination, UsePageHook } from "../Utils"

const AllUserList = () => {
    const { page, limit, setPage, setLimit } = UsePageHook({
        page: 1,
        limit: 10
    })
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch()
    const { data, refetch, isRefetching, isLoading } = GetAllUserApiSearch({
        search: search
    })

    const baseUrl = data?.baseUrl


    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            mt: 7,
            p: 2,
        }}>
            <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1} ml={2}>
                    <Typography variant="h5" sx={{
                        fontWeight: "bold",
                        color: colors.grey[700]

                    }}>
                        Users List
                    </Typography>
                    <span>
                        All users in your canteen
                    </span>

                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <AddNewUserList />
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                </Stack>
            </Stack>
            <Stack mt={5} ml={2} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{
                            width: "300px"
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FormControl variant="outlined" sx={{ width: "150px" }} size="small">
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            label="Filter"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <MenuItem value={"ALL"}>All</MenuItem>
                            <MenuItem value={"ADMIN"}>Admin</MenuItem>
                            <MenuItem value={"USER"}>User</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                {isLoading ? <div><LinearProgress /></div> : (
                    <>
                        <TableContainer style={{
                            border: "1px solid #E0E0E0",
                            borderRadius: "5px",
                            overflow: "auto",
                            width: "100%",
                            height: "70vh",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            padding: "30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                            <div >
                                <table className="user_table">
                                    <tr>
                                        <th> Name </th>
                                        <th> Email </th>
                                        <th> Contact </th>
                                        <th> Role </th>
                                        <th style={{ width: "200px", textAlign: "center" }}> Created  </th>
                                        <th style={{ width: "100px", textAlign: "right" }}>Edit</th>
                                    </tr>
                                    {data?.users?.map((user, index) => (
                                        <tr key={index + 1}>
                                            <td>
                                                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                                    <div style={{
                                                        padding: "0px",
                                                        borderRadius: "50%",
                                                        width: "40px",
                                                        height: "40px",
                                                        backgroundColor: "#E0E0E0"
                                                    }}
                                                        onClick={() => dispatch(setZoomImage(`${baseUrl}${user?.profile_url}`))}
                                                    >
                                                        <img src={`${baseUrl}${user?.thumbnail_url}`} alt="" width={"40px"} height={"40px"} style={{ borderRadius: "50%" }} />
                                                    </div>
                                                    <span>
                                                        {user?.name}
                                                    </span>
                                                </Stack>
                                            </td>
                                            <td> {user?.email} </td>
                                            <td> {user?.phone} </td>
                                            <td> {user?.role} </td>
                                            <td style={{ width: "200px", textAlign: "center" }}> {moment(user?.created_at).format("YYYY-MM-DD : HH:mm")} { } </td>
                                            <td style={{
                                                cursor: "pointer",
                                                color: "blue",
                                                width: "100px",
                                                textAlign: "right",
                                            }}>
                                                <AddVoucher user_id={user?.id || ""} data={user} />
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <CustomPagination
                                total={data?.total || 0}
                                page={page}
                                limit={limit}
                                setpage={(value: number) => setPage(value)}
                                setlimit={(value: number) => setLimit(value)}
                            />
                        </TableContainer>
                    </>

                )}

            </Stack>

        </Box >
    )
}

export default AllUserList


export const ZoomImage = () => {
    const { zoomImage } = useSelector((state: RootState) => state.ZoomImage)
    const dispatch = useDispatch()

    return (
        <Modal open={zoomImage !== ""} onClose={() => dispatch(setZoomImage(""))}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                height: "60vh",
                borderRadius: "10px"
            }}>
                <img src={zoomImage} width={"100%"} height={"100%"} />
            </Box>
        </Modal>
    )
}
