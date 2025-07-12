
import { Box,  colors,  Stack, Tab, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CreateCanteen from './CreateCanteen'
import { TabContext, TabList, } from '@mui/lab'
import React, { useMemo } from 'react'
import { GetCanteenUserApi } from '../AllGetApi'
import RefecthButton from '../RefecthButton'
import { GetCanteenUser } from '../AllTypes'
import { CanteenUserColumn } from '../DataGridColumn/CanteenUserColumn'

const CanteenList = () => {

    const [value, setValue] = React.useState("0");

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    const { data, isRefetching, refetch } = GetCanteenUserApi()


    const CanteenDataRows = useMemo(() => {
        if (!data) return []
        const canteenData = data?.canteens
        if (canteenData) return canteenData?.map((item: GetCanteenUser, idx: number) => {
            return {
                ...item,
                id: item?.id,
                idx: idx + 1
            }
        })


    }, [data])

    return (
        <Box sx={{
            padding: 2,
            backgroundColor: "white",
            
          
        }}>
            <Stack direction={"row"} justifyContent={"space-between"} 
             sx={{
                backgroundColor: "white",
              
                
             }}
            >
                <Typography variant='h5' sx={{
                     color: colors.grey[600],
                     fontWeight: 'bold',
                     letterSpacing: '1px',
                     fontFamily: 'monospace'
                }}>
                    Canteen List
                </Typography>
                <TabContext value={value}>
                    <Box sx={{
                        
                      }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Canteen List" value="0" />
                            <Tab label="Create Canteen" value="1" />

                        </TabList>
                    </Box>
                </TabContext>
                <RefecthButton refetch={refetch} isRefetching={isRefetching} />
            </Stack>
            {value === "1" && (
                <CreateCanteen />
            )}
            {value === "0" && (
                <Box sx={{
                    
                    backgroundColor: "white",
                    height: "75vh",
                    mt: 5,
                    
                    
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                   
                   
                }}>

                    <DataGrid
                        rows={CanteenDataRows}
                        columns={CanteenUserColumn}
                        pageSizeOptions={[10, 20, 50, 100]}
                        sx={{
                            width: "100%",
                            bgcolor: "white"
                        }}
                    />

                </Box>
            )}

        </Box >
    )
}

export default CanteenList