
import { useMemo, useState } from 'react'
import { GetPurchaseApi, } from '../AllGetApi'
import { Box, Button, colors, Stack, TextField, Typography } from '@mui/material'
import RefecthButton from '../RefecthButton'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { PurchasesColumn } from '../DataGridColumn/PurchaseColumn'

const Purchases = () => {
    const navigate = useNavigate()
    const { data, isLoading, isRefetching, refetch } = GetPurchaseApi()
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 20,
    })

    const [search, setSearch] = useState<string>("")

    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const DataPurchase = useMemo(() => {
        if (!data) return []
        const purchaseData = data?.purchases
        if (purchaseData) {
            return purchaseData?.filter((item) => item?.refrence_no?.toString()?.toLowerCase()?.includes(search.toLowerCase())).map((item: any, index: number) => {
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
            mt: 8,
            width: "87vw"
        }}>
            <Stack direction='row' justifyContent={'space-between'}>
                <Typography variant='h5' sx={{
                    color: colors.grey[600],
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                }}>
                    Purchase
                </Typography>
                <Stack spacing={2} direction='row' alignItems={'center'}>
                    <Button variant="contained" onClick={() => navigate('/add-purchase')} sx={{
                        fontWeight: 'bold'
                    }} color='primary' size='small'>
                        Create Purchase
                    </Button>
                    <RefecthButton refetch={refetch} isRefetching={isRefetching} />
                    <TextField
                        size='small'
                        sx={{
                            bgcolor: "#fff",
                            borderRadius: '5px',

                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search'
                    />
                </Stack>
            </Stack>
            <Box sx={{
                height: "80vh",
                backgroundColor: "#E0E0E0",
                p: 2,
                borderRadius: "10px",
                mt: 2
            }}>

                <DataGrid
                    rows={DataPurchase || []}
                    columns={PurchasesColumn}
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

export default Purchases