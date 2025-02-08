import { Box, colors, Stack, TextField, Typography } from "@mui/material"
import { DataGrid,  } from "@mui/x-data-grid"
import { GetOrderDetailsApi } from "../AllGetApi"
import { useEffect, useMemo, useState } from "react"
import RefecthButton from "../RefecthButton"
import { OrderDetailsColumn } from "../DataGridColumn/OrderDetailsColumn"
import {  UsePageHook } from "../Utils"

export const OrderList = () => {
    const canteen_id = localStorage.getItem("canteen_user_id")
    const [search, setSearch] = useState<string>("")
    const { page, limit, setPage, setLimit } = UsePageHook({ page: 1, limit: 100 })
    const { data, isRefetching, refetch } = GetOrderDetailsApi({
        page,
        limit,
        canteen_id: canteen_id || ""

    })

    useEffect(() => {
        refetch();
    }, [page, limit]);

    const OrderRowsData = useMemo(() => {
        if (data) {
            return data?.orders?.filter((item) =>
                item?.customer_name?.toLowerCase().includes(search.toLowerCase())
            )?.map((item, index: number) => {
                return {
                    ...item,
                    id: item?.id,
                    idx: index + 1 + ((page - 1) * limit),
                }
            })
        }
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
                    />
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
                        page,
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
