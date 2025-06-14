
import { useMemo, useState } from 'react'
import { GetSupplierApi } from '../AllGetApi'
import { Box, colors, Stack, TextField, Typography } from '@mui/material'
import RefecthButton from '../RefecthButton'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'
import { SupplierColumn } from '../DataGridColumn/SupplierColumn'
import CreateSupplier from './CreateSupplier'
import { UsePageHook } from '../Utils'

const Supplier = () => {
    const { data, isLoading, isRefetching, refetch } = GetSupplierApi()
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 20,
    })

    const [search, setSearch] = useState<string>("")

    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const DataSupplier = useMemo(() => {
        if (!data) return []
        const Supplierdata = data?.suppliers
        if (Supplierdata) {
            return Supplierdata?.filter((item) => item?.name?.toString()?.toLowerCase()?.includes(search.toLowerCase())).map((item, index: number) => {
                return {
                    ...item,
                    id: item?.ID,
                    idx: index + 1 * (paginationModel.page * paginationModel.pageSize + 1),
                    address: item?.address
                }
            })
        }
    }, [data, paginationModel, search])
    return (
        <Box sx={{
            p: 2,
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
                    Supplier
                </Typography>
                <Stack spacing={2} direction='row' alignItems={'center'}>
                    <CreateSupplier />
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                    <TextField
                        size='small'
                        sx={{
                            width: '12vw',
                            bgcolor: colors.grey[50],
                            borderRadius: '5px',

                        }}
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}

                    />
                </Stack>
            </Stack>
            <Box
                mt={2}
                sx={{
                    backgroundColor: colors.grey[200],
                    p: 2
                }}
            >
                <DataGrid
                    rows={DataSupplier || []}
                    columns={SupplierColumn}
                    loading={isLoading || isRefetching}
                    paginationMode='client'
                    paginationModel={{
                        page: 0,
                        pageSize: 10
                    }}
                    style={{
                        height: '80vh',
                        backgroundColor: "white"
                    }}
                    onPaginationModelChange={handlePaginationModelChange}
                />
            </Box>
        </Box>
    )
}

export default Supplier