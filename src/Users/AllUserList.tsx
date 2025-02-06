import { Box, Breadcrumbs, colors, Stack, TableContainer, TextField, Typography } from "@mui/material"
import RefecthButton from "../RefecthButton"
import { GetAllUserApi, GetAllUserApiSearch } from "../AllGetApi"
import { useState } from "react"
import { Person } from "@mui/icons-material"
import moment from "moment"

const AllUserList = () => {
    const [search, setSearch] = useState("")
    const { data, refetch, isRefetching, isLoading } = GetAllUserApiSearch({
        search: search
    })
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            mt: 2,
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
                    <button style={{
                        borderRadius: "15px",
                        border: "none",
                        backgroundColor: colors.grey[800],
                        color: "white",
                        cursor: "pointer",
                        height: "40px",
                        fontWeight: "bold"
                    }}>
                        + Add New User
                    </button>
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                </Stack>
            </Stack>
            <Stack mt={5} ml={2} spacing={2}>
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
                <TableContainer style={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "5px",
                    overflow: "auto",
                    width: "100%",
                    height: "70vh",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    padding: "30px"
                }}>
                    <div >
                        <table className="user_table">
                            <tr>
                                <th> Name </th>
                                <th> Email </th>
                                <th> Contact </th>
                                <th> Role </th>
                                <th> Created  </th>
                            </tr>
                            {data?.users?.map((user, index) => (
                                <tr key={index + 1}>
                                    <td>
                                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                            <div style={{
                                                padding:"10px",
                                                borderRadius:"50%",
                                                width:"30px",
                                                height:"30px",
                                                backgroundColor: "#E0E0E0"
                                            }}>
                                            <img src={user?.image_url} alt="" width={"30px"} height={"30px"} style={{borderRadius:"50%"}} />
                                            </div>
                                            <span>
                                                {user?.name}
                                            </span>
                                        </Stack>
                                    </td>
                                    <td> {user?.email} </td>
                                    <td> {user?.phone} </td>
                                    <td> {user?.role} </td>
                                    <td> {moment(user?.created_at).format("YYYY-MM-DD : HH:mm")} { } </td>
                                </tr>
                            ))}
                        </table>
                    </div>

                </TableContainer>
            </Stack>
        </Box >
    )
}

export default AllUserList