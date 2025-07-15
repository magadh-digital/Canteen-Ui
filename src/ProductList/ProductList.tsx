import { useDispatch, } from "react-redux";
import { GetMenuItemListApi, } from "../AllGetApi";
import {
    Box, Button, ButtonGroup, colors, Stack, TextField, Typography, useTheme
} from "@mui/material";
import RefecthButton from "../RefecthButton";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { ProductItemsColumn } from "../DataGridColumn/ProductItemsColumn";
import { setAddProduct } from "../AllStoreSlice/AddProductCanteenSlice";
import AllUnitTypes from "./UnitTypes";


const ProductList = () => {
    const canteen_id = localStorage.getItem("canteen_user_id");

    const { data, isLoading, isRefetching, refetch } = GetMenuItemListApi({
        canteen_id: canteen_id || "",
    });
    const [Search, setSearch] = useState<string>('');
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
            return itemsData?.filter((item: any) => item?.name?.toLowerCase().includes(Search.toLowerCase()))?.map((items, index) => {
                return {
                    ...items,
                    id: items?.id,
                    idx: index + 1,
                    thumbnailurl: data?.base_url + (items?.thumbnailurl ?? ""),
                    url: data?.base_url + (items?.image_url ?? ""),
                }
            })
        }
    }, [data, Search]);
    const theme = useTheme();



    return (
        <Box sx={{
            backgroundColor: "white",
            padding: 2,
        }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography variant="h6" sx={{
                    color: colors.grey[600],
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                }}>
                    Product List
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Search"
                        size="small"
                    />
                    <ButtonGroup size="small">
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                height: "30px",
                            }}
                            onClick={() => {
                                dispatch(setAddProduct(canteen_id))
                            }}
                        >
                            Add Product
                        </Button>
                        <AllUnitTypes />
                    </ButtonGroup>
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                </Stack>
            </Stack>
            <Box sx={{
                mt: 2,
            }}>
                <DataGrid
                    sx={{
                        bgcolor: "white",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.grey[100],
                            fontWeight: 600,
                            fontSize: 14,
                        },
                        "& .MuiDataGrid-row": {
                            fontSize: 13,
                        },
                        height: "75vh",
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