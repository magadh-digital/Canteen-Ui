
import React, { useMemo, useState } from 'react'
import { GetStocksApi, } from '../AllGetApi'
import { Box, colors, Stack, TextField, Typography } from '@mui/material'
import RefecthButton from '../RefecthButton'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'
import CreateStocks from './CreateStocks'
import { StockItemColumn } from '../DataGridColumn/StockItemColumn'
// import CreatePurchase from './CreatePurchase'

const StocksList = () => {
    const { data, isLoading, isRefetching, refetch } = GetStocksApi()
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 20,
    })
    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const StockItem = useMemo(() => {
        if (!data) return []
        const stockData = data?.remaining
        if (stockData) {
            return stockData?.map((item, index: number) => {
                return {
                    ...item,
                    id: item?.ID,
                    idx: index + 1 * (paginationModel.page * paginationModel.pageSize + 1),
                    address: item?.description,
                    remaining: {
                        remaining: item?.remaining,
                        unit: item?.unit
                    }
                }
            })
        }
    }, [data])
    return (
        <Box sx={{
            p: 2,
            // width: '85vw',
            height: '100vh',
            mt:2
        }}>
            <Stack direction='row' justifyContent={'space-between'}>
                <Typography variant='h5' sx={{
                    color: colors.red[500],
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                }}>
                    Stock Item
                </Typography>
                <Stack spacing={2} direction='row' alignItems={'center'}>
                    <CreateStocks />
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                    <TextField
                        size='small'
                        sx={{
                            width: '15vw',
                            bgcolor: colors.grey[200],
                            borderRadius: '5px',

                        }}
                    />
                </Stack>
            </Stack>
            <Box mt={2} bgcolor={colors.grey[200]} p={2}>
                <DataGrid
                    rows={StockItem || []}
                    columns={StockItemColumn}
                    loading={isLoading || isRefetching}
                    paginationMode='client'
                    paginationModel={{
                        page: 0,
                        pageSize: 10
                    }}
                    style={{
                        height: '75vh',
                        backgroundColor: 'white'
                    }}
                    onPaginationModelChange={handlePaginationModelChange}

                />

            </Box>
        </Box>
    )
}

export default StocksList