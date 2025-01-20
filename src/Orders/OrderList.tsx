import { Box, colors, Stack, TextField, Typography } from "@mui/material"
import { DataGrid, GridPaginationModel, } from "@mui/x-data-grid"
import { GetOrderDetailsApi } from "../AllGetApi"
import { useMemo, useState } from "react"
import RefecthButton from "../RefecthButton"
import { OrderDetailsColumn } from "../DataGridColumn/OrderDetailsColumn"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

export const OrderList = () => {
   const canteen_id = localStorage.getItem("canteen_user_id")
    const [search, setSearch] = useState<string>("")
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 20,
    })
    const { data, isRefetching, refetch } = GetOrderDetailsApi({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        canteen_id: canteen_id || ""

    })

    const OrderRowsData = useMemo(() => {
        if (data) {
            return data?.orders?.filter((item) =>
                item?.customer_name?.toLowerCase().includes(search.toLowerCase())
            )?.map((item, index: number) => {
                return {
                    ...item,
                    id: item?.id,
                    idx: index + 1 * (paginationModel.page * paginationModel.pageSize + 1)
                }
            })
        }
    }, [data])

    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    return (
        <Box
            sx={{
                m: 1,
                p: 2,
                width: "85vw",
                height: "100vh",
                overflow: "hidden"
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
                backgroundColor: colors.grey[100],
                p: 2,
                borderRadius: "10px",
                mt: 2
            }}>

                <DataGrid
                    pagination
                    rows={OrderRowsData || []}
                    columns={OrderDetailsColumn}
                    rowCount={data?.pagination?.total_items || 0}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    pageSizeOptions={[10, 20, 50, 100]}
                />

            </Box>
        </Box>
    )
}
