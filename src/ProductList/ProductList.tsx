import { useDispatch, } from "react-redux";
import { GetMenuItemListApi } from "../AllGetApi";
import { Box, Button, Stack, Typography } from "@mui/material";
import RefecthButton from "../RefecthButton";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { ProductItemsColumn } from "../DataGridColumn/ProductItemsColumn";
import { setAddProduct } from "../AllStoreSlice/AddProductCanteenSlice";

const ProductList = () => {
    const canteen_id = localStorage.getItem("canteen_user_id");
    const { data, isLoading, isRefetching, refetch } = GetMenuItemListApi({
        canteen_id: canteen_id || "",
    });
    const dispatch = useDispatch()
    const [page, setPage] = useState<GridPaginationModel>({
        page: 1,
        pageSize: 100
    });

    const handlePageChange = (newPage: GridPaginationModel) => {
        setPage(newPage);
    };


    const ProductItemsRows = useMemo(() => {

        const itemsData = data?.menuitems || [];
        if (!itemsData) return [];
        if (itemsData) {
            return itemsData?.map((items, index) => {
                return {
                    ...items,
                    id: items?.id,
                    idx: index + 1,
                    url: data?.base_url + items?.image_url
                }
            })

        }

    }, [data])

    return (
        <Box sx={{
            height: "100%",
            backgroundColor: "white",
            m: 1,
            p: 1
        }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">Product List</Typography>
                <Stack direction="row" spacing={3}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            dispatch(setAddProduct(canteen_id))
                        }}
                    >
                        Add Product
                    </Button>
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                </Stack>
            </Stack>
            <Box sx={{
                width: "100%",
                height: "95%",
                backgroundColor: "#E0E0E0",
                mt: 2,
                p: 2,
            }}>
                <DataGrid
                    style={{
                        backgroundColor: "white"
                    }}
                    rows={ProductItemsRows}
                    columns={ProductItemsColumn}
                    loading={isLoading}
                    paginationMode="client"

                    rowCount={data?.menuitems?.length || 0}
                    paginationModel={page}
                    onPaginationModelChange={handlePageChange}
                    pageSizeOptions={[10, 20, 50, 100]}
                />

            </Box>
        </Box>
    )
}

export default ProductList