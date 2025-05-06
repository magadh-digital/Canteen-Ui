import { Box, colors, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { DataGrid, } from "@mui/x-data-grid"
import { GetOrderDetailsApi } from "../AllGetApi"
import { useEffect, useMemo, useState } from "react"
import RefecthButton from "../RefecthButton"
import { OrderDetailsColumn } from "../DataGridColumn/OrderDetailsColumn"
import { UsePageHook } from "../Utils"

export const OrderList = () => {
    const canteen_id = localStorage.getItem("canteen_user_id")
    const [search, setSearch] = useState<string>("")
    const { page, limit, setPage, setLimit } = UsePageHook({ page: 1, limit: 100 })
    const [filter, setFilter] = useState<string>("COMPLETED")
    const { data, isRefetching, refetch } = GetOrderDetailsApi({
        page,
        limit,
        canteen_id: canteen_id || "",
        status: filter,
        search: search
    })

    useEffect(() => {
        refetch();
    }, [page, limit]);

    const   OrderRowsData = useMemo(() => {
        if (!data) return [];
        return data?.orders?.map((item, idx) => ({
            ...item, 
            id: item?.id,
            idx: idx + 1 + (page - 1) * limit,
        }))
    }, [data, search, page, limit])
    


    return (
        <Box
            sx={{
                p: 4,
                height: "100vh",
                width: "100%",
            }}
        >
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>Order List</Typography>
                <Stack alignItems="center" direction="row" spacing={2}>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <FormControl size="small" sx={{
                        width: "100%"
                    }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            variant="outlined"
                            size="small"
                            label
                            labelId=""
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value)
                            }}
                        >
                            <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                            <MenuItem value={"DELETED"}>DELETED</MenuItem>
                        </Select>
                    </FormControl>
                    <RefecthButton isRefetching={isRefetching} refetch={refetch} />
                </Stack>
            </Stack>
            <Box sx={{
                height: "80vh",
                width: "100%",
                backgroundColor: colors.grey[200],
                p: 2,
                borderRadius: "10px",
                mt: 2
            }}>

                <DataGrid
                    rows={OrderRowsData}
                    columns={OrderDetailsColumn}
                    rowCount={data?.pagination?.total_items || 0}
                    paginationMode="server"
                    paginationModel={{
                        page: page - 1,
                        pageSize: limit
                    }}
                    onPaginationModelChange={(model) => {
                        setPage(model.page + 1);
                        setLimit(model.pageSize);
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    sx={{ bgcolor: "white" }}
                />


            </Box>
        </Box>
    )
}
