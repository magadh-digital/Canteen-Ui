
import { useMemo, useState } from 'react'
import { GetReportOrderApi, } from '../AllGetApi'
import { Box, colors, Stack, TextField, Typography } from '@mui/material'
import RefecthButton from '../RefecthButton'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'
import { PurchaseReportColumn } from '../DataGridColumn/PurchaseReportColumn'

const PurchaseReport = () => {
    const { data, isLoading, isRefetching, refetch } = GetReportOrderApi()
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 20,
    })
    const [search, setSearch] = useState<string>("")
    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const ReportItem = useMemo(() => {
        if (!data) return []
        const sellDataReport = data?.last20orders
        if (sellDataReport) {
            return sellDataReport?.filter((item) => item.customer_name.toLowerCase().includes(search.toLowerCase()))?.map((item, index: number) => {
                return {
                    ...item,
                    id: item?.id,
                    idx: index + 1 * (paginationModel.page * paginationModel.pageSize + 1),
                    address: item?.customer_name,
                    remaining: {
                        remaining: item?.customer_type,
                        unit: item?.payable_amt
                    }
                }
            })
        }
    }, [data, search])
    return (
        <Box sx={{
            m: 2,
            mt: 4,
            p: 2,
            width: '85vw',
            height: '100vh',
            bgcolor: colors.grey[100],
        }}>
            <Stack direction='row' justifyContent={'space-between'}>
                <Typography variant='h5' sx={{
                    color: colors.red[500],
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                }}>
                    Purchase Report
                </Typography>
                <Stack spacing={2} direction='row' alignItems={'center'}>
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                    <TextField
                        size='small'
                        type='date'
                        sx={{
                            width: '9vw',
                            bgcolor: colors.grey[200],
                            borderRadius: '5px',
                        }}
                    />
                    <span>to</span> 
                    <TextField
                        size='small'
                        type='date'
                        sx={{
                            width: '9vw',
                            bgcolor: colors.grey[200],
                            borderRadius: '5px',
                        }}
                    />
                    <TextField
                        size='small'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            width: '15vw',
                            bgcolor: colors.grey[200],
                            borderRadius: '5px',
                        }}
                    />
                </Stack>
            </Stack>
            <Box mt={2}>
                <DataGrid
                    rows={ReportItem || []}
                    columns={PurchaseReportColumn}
                    loading={isLoading || isRefetching}
                    paginationMode='client'
                    paginationModel={{
                        page: 0,
                        pageSize: 20
                    }}
                    style={{
                        height: '75vh'
                    }}
                    onPaginationModelChange={handlePaginationModelChange}

                />

            </Box>
        </Box>
        // <></>
    )
}

export default PurchaseReport