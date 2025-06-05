import { useMemo, useState } from 'react';
import {
  GetReportOrderApi,
} from '../AllGetApi';
import {
  Box,
  Button,
  ButtonGroup,
  colors,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import RefecthButton from '../RefecthButton';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { SellReportColumn } from '../DataGridColumn/SellReportColumn';
import { Print } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const SellReport = () => {
  const { data, isLoading, isRefetching, refetch } = GetReportOrderApi();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const [search, setSearch] = useState<string>("");

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  const ReportItem = useMemo(() => {
    if (!data) return [];
    const sellDataReport = data?.last20orders;
    if (sellDataReport) {
      return sellDataReport
        .filter((item) =>
          item.customer_name.toLowerCase().includes(search.toLowerCase())
        )
        .map((item, index: number) => ({
          ...item,
          id: item?.id,
          idx: index + 1 + paginationModel.page * paginationModel.pageSize,
          address: item?.customer_name,
          remaining: {
            remaining: item?.customer_type,
            unit: item?.payable_amt,
          },
        }));
    }
    return [];
  }, [data, search, paginationModel]);

  const getPlainRows = () => {
    return ReportItem.map((row) => {
      const plainRow: Record<string, any> = {};
      SellReportColumn.forEach((col) => {
        const value = (row as any)[col.field];
        plainRow[col.headerName as string] =
          typeof value === "object" ? JSON.stringify(value) : value;
      });
      return plainRow;
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section");
    const WinPrint = window.open('', '', 'width=900,height=650');
    if (WinPrint && printContent) {
      WinPrint.document.write(`<html><head><title>Sell Report</title></head><body>${printContent.innerHTML}</body></html>`);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
    }
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    const columns = SellReportColumn.map((col) => col.headerName as string);
    const rows = getPlainRows().map((row) => columns.map((col) => row[col]));

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save("sell_report.pdf");
  };

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(getPlainRows());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sell Report");
    XLSX.writeFile(workbook, "sell_report.xlsx");
  };

  const handleCSVDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(getPlainRows());
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sell_report.csv");
  };

  return (
    <Box
      sx={{
        m: 2,
        mt: 4,
        p: 2,
        width: '85vw',
        height: '100vh',
        bgcolor: colors.grey[100],
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h5"
          sx={{
            color: colors.red[500],
            fontWeight: 'bold',
            letterSpacing: '1px',
            fontFamily: 'monospace',
          }}
        >
          Sell Reports
        </Typography>
        <Stack spacing={2} direction="row" alignItems="center">
          <ButtonGroup size="small">
            <Tooltip title="Print">
              <Button onClick={handlePrint}>
                <Print />
              </Button>
            </Tooltip>
            <Tooltip title="PDF Download">
              <Button onClick={handlePDFDownload} sx={{ color: colors.grey[500] }}>
                PDF
              </Button>
            </Tooltip>
            <Tooltip title="Excel Download">
              <Button onClick={handleExcelDownload} sx={{ color: colors.orange[500] }}>
                Excel
              </Button>
            </Tooltip>
            <Tooltip title="CSV Download">
              <Button onClick={handleCSVDownload} sx={{ color: colors.green[500] }}>
                CSV
              </Button>
            </Tooltip>
          </ButtonGroup>
          <RefecthButton refetch={refetch} isRefetching={isRefetching} />
          <TextField
            size="small"
            type="date"
            sx={{ width: '9vw', bgcolor: colors.grey[200], borderRadius: '5px' }}
          />
          <span>to</span>
          <TextField
            size="small"
            type="date"
            sx={{ width: '9vw', bgcolor: colors.grey[200], borderRadius: '5px' }}
          />
          <TextField
            size="small"
            placeholder="Search customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: '15vw', bgcolor: colors.grey[200], borderRadius: '5px' }}
          />
        </Stack>
      </Stack>

      <Box mt={2} id="print-section">
        <DataGrid
          rows={ReportItem || []}
          columns={SellReportColumn}
          loading={isLoading || isRefetching}
          paginationModel={paginationModel}
          pageSizeOptions={[20]}
          onPaginationModelChange={handlePaginationModelChange}
          style={{ height: '75vh' }}
        />
      </Box>
    </Box>
  );
};

export default SellReport;
