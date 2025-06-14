
import { useMemo, useState,  } from 'react'
import { GetStocksApi, } from '../AllGetApi'
import { Box, colors, Stack, TextField, Typography } from '@mui/material'
import RefecthButton from '../RefecthButton'
import { DataGrid, } from '@mui/x-data-grid'
import CreateStocks from './CreateStocks'
import { StockItemColumn } from '../DataGridColumn/StockItemColumn'
import { UsePageHook } from '../Utils'
// import CreatePurchase from './CreatePurchase'

const StocksList = () => {
    const { page, limit, setPage, setLimit } = UsePageHook({ page: 1, limit: 100 })

    const { data, isLoading, isRefetching, refetch } = GetStocksApi({
        page,
        limit
    })
    const [search, setSearch] = useState<string>("")
    const StockItem = useMemo(() => {
        if (!data) return []
        const stockData = data?.remaining
        if (stockData) {
            return stockData?.filter((item) => item?.name?.toLowerCase().includes(search.toLowerCase()))?.map((item, index: number) => {
                return {
                    ...item,
                    id: item?.ID,
                    idx: index + 1 * (page * limit + 1),
                    address: item?.description,
                    remaining: {
                        remaining: item?.remaining,
                        unit: item?.unit
                    }
                }
            })
        }
    }, [data, search, page, limit])
    return (
        <Box sx={{
            p: 2,
            // width: '85vw',
            height: '100vh',
            mt: 8
        }}>
            <Stack direction='row' justifyContent={'space-between'}>
                <Typography variant='h5' sx={{
                    color: colors.grey[600],
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                }}>
                    Stock Item
                </Typography>
                <Stack spacing={2} direction='row' alignItems={'center'}>
                    <CreateStocks refetch={refetch} />
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                    <TextField
                        size='small'
                        sx={{
                            width: '15vw',
                            bgcolor: colors.grey[200],
                            borderRadius: '5px',

                        }}
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Stack>
            </Stack>
            <Box mt={2} bgcolor={colors.grey[200]} p={2}>
                <DataGrid
                    rows={StockItem || []}
                    columns={StockItemColumn}
                    loading={isLoading || isRefetching}
                    paginationMode="server"
                    paginationModel={{
                        page: page - 1,
                        pageSize: limit
                    }}
                    style={{
                        height: '80vh',
                        backgroundColor: 'white'
                    }}
                    onPaginationModelChange={(model) => {
                        setPage(model.page + 1);
                        setLimit(model.pageSize);
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    rowCount={data?.total}

                />

            </Box>
        </Box>
    )
}

export default StocksList