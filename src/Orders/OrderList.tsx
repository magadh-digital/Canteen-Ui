import { Box,  FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material"
import { DataGrid, } from "@mui/x-data-grid"
import { GetOrderDetailsApi } from "../AllGetApi"
import { useEffect, useMemo, useState } from "react"
import RefecthButton from "../RefecthButton"
import { OrderDetailsColumn } from "../DataGridColumn/OrderDetailsColumn"
import { UsePageHook } from "../Utils/Utils"

export const OrderList = () => {
    const canteen_id = localStorage.getItem("canteen_user_id");
    const [search, setSearch] = useState<string>("");
    const { page, limit, setPage, setLimit } = UsePageHook({ page: 1, limit: 100 });
    const [filter, setFilter] = useState<string>("COMPLETED");
  
    const { data, isRefetching, refetch } = GetOrderDetailsApi({
      page,
      limit,
      canteen_id: canteen_id || "",
      status: filter,
      search,
    });
  
    useEffect(() => {
      refetch();
    }, [page, limit]);
  
    const OrderRowsData = useMemo(() => {
      if (!data) return [];
      return data?.orders?.map((item, idx) => ({
        ...item,
        id: item?.id,
        idx: idx + 1 + (page - 1) * limit,
      }));
    }, [data, search, page, limit]);
  
    const theme = useTheme();
  
    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
        //   borderRadius: 3,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header Section */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          spacing={2}
          mb={3}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.grey[800],
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            🧾 Order List
          </Typography>
  
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <TextField
              size="small"
              variant="outlined"
              placeholder="🔍 Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 200 }}
            />
  
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filter}
                label="Status"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="COMPLETED">✅ Completed</MenuItem>
                <MenuItem value="DELETED">🗑️ Deleted</MenuItem>
              </Select>
            </FormControl>
  
            <RefecthButton isRefetching={isRefetching} refetch={refetch} />
          </Stack>
        </Stack>
  
        {/* Data Table Section */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <DataGrid
            rows={OrderRowsData}
            columns={OrderDetailsColumn}
            rowCount={data?.pagination?.total_items || 0}
            paginationMode="server"
            paginationModel={{
              page: page - 1,
              pageSize: limit,
            }}
            onPaginationModelChange={(model) => {
              setPage(model.page + 1);
              setLimit(model.pageSize);
            }}
            pageSizeOptions={[10, 20, 50, 100]}
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
          />
        </Box>
      </Box>
    );
  };