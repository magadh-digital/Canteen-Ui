import { useDispatch, } from "react-redux";
import { GetMenuItemListApi } from "../AllGetApi";
import { Box, Button, colors, Stack, TextField, Typography } from "@mui/material";
import RefecthButton from "../RefecthButton";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { ProductItemsColumn } from "../DataGridColumn/ProductItemsColumn";
import { setAddProduct } from "../AllStoreSlice/AddProductCanteenSlice";

const ProductList = () => {
    const canteen_id = localStorage.getItem("canteen_user_id");
    const [Search, setSearch] = useState<string>('');
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
            return itemsData?.filter((item: any) => item?.name?.toLowerCase().includes(Search.toLowerCase()))?.map((items, index) => {
                return {
                    ...items,
                    id: items?.id,
                    idx: index + 1,
                    url: data?.base_url + items?.image_url
                }
            })

        }

    }, [data, Search]);

    return (
        <Box sx={{
            
            backgroundColor: "white",
            padding: 2,
            
        }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{
                    color: colors.grey[600],
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                }}>Product List</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Search"
                        size="small"
                        sx={{
                            height: "30px",
                        }}
                    />
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
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                </Stack>
            </Stack>
            <Box sx={{
                width: "100%",
                height: "95%",
               
                mt: 2,
                
            }}>
                <DataGrid
                    style={{
                        backgroundColor: "white",
                        height: "80vh"
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