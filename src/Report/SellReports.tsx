import { useMemo, useState } from 'react';
import {

  GetSellReportApi,
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
  useTheme,
} from '@mui/material';
import RefecthButton from '../RefecthButton';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { SellReportColumn } from '../DataGridColumn/SellReportColumn';
import { Print } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
import dayjs from 'dayjs';
import CustomDateRangePicker from '../Utils/CustomeDateRange';


const SellReport = () => {

  const [date, setDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  });
  const reportTitle = `Sell Report (${moment(date.startDate).format('DD-MM-YYYY')} to ${moment(date.endDate).format('DD-MM-YYYY')})`;


  const { data, isLoading, isRefetching, refetch } = GetSellReportApi({
    startDate: date.startDate as string,
    endDate: date.endDate as string
  });
  const [page, setPage] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 100
  });
  const [search, setSearch] = useState<string>("");

  const handlePageChange = (newPage: GridPaginationModel) => {
    setPage(newPage);
  };

  const ReportItem = useMemo(() => {
    if (!data) return [];
    const sellDataReport = data?.items || [];
    return sellDataReport
      .filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      )
      .map((item, index: number) => ({
        ...item,
        id: index,
        idx: index + 1 + page.pageSize * page.page,
        unit_type: item?.item_details?.unit,
      }));
  }, [data, search]);

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
  const theme = useTheme();
  const handlePrint = () => {
    const WinPrint = window.open('', 'width=900,height=650');
    if (WinPrint) {
      WinPrint.document.write(`
        <html>
          <head>
            <title>${reportTitle}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 4px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid black;
                padding: 3px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              h2 {
                text-align: center;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <h2>${reportTitle}</h2>
            <table>
              <tr>
                <th>S.No.</th>
                <th>Items</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
              ${data?.items?.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.item_details?.unit}</td>
                  <td>${item.qty}</td>
                  <td>${item.total}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="3">Total:</td>
                <td>${data?.total_qty}</td>
                <td>${data?.total_amount}</td>
              </tr>
            </table>
          </body>
        </html>
      `);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
    }
  };


  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text(reportTitle, 50, 15);
    const columns = SellReportColumn.map((col) => col.headerName as string);
    const rows = getPlainRows().map((row) => columns.map((col) => row[col]));

    autoTable(doc, {
      startY: 20,
      showHead: "everyPage",
      head: [columns],
      body: rows,
      foot: [["Total", "", "", data?.total_qty || 0, data?.total_amount || 0]],
    });


    doc.save("sell_report.pdf");
  };

  const handleExcelDownload = () => {
    const plainRows = getPlainRows();
    const worksheet = XLSX.utils.json_to_sheet([]);

    const title = `${reportTitle}`;
    const columnHeaders = SellReportColumn.map(col => col.headerName as string);

    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: 'A1' });

    XLSX.utils.sheet_add_aoa(worksheet, [columnHeaders], { origin: 'A3' });

    const dataRows = plainRows.map(row => columnHeaders.map(col => row[col]));
    dataRows.push(["Total", "", "", data?.total_qty || 0, data?.total_amount || 0]);
    XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: 'A4' });


    worksheet['!merges'] = [
      {
        s: { r: 0, c: 0 },
        e: { r: 0, c: columnHeaders.length - 1 }
      }
    ];

    worksheet['A1'].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" },
    };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sell Report");
    XLSX.writeFile(workbook, "sell_report.xlsx");
  };


  const handleCSVDownload = () => {
    const plainRows = getPlainRows();
    const columnHeaders = SellReportColumn.map((col) => col.headerName as string);
    const title = `${reportTitle}`;

    let csvContent = "";

    const fakeMerge = [title, ...new Array(columnHeaders.length - 1).fill("")].join(",");
    csvContent += `${fakeMerge}\n`;

    csvContent += "\n";

    csvContent += columnHeaders.join(",") + "\n";

    plainRows.forEach(row => {
      const rowData = columnHeaders.map(col => `"${row[col] ?? ""}"`);
      csvContent += rowData.join(",") + "\n";
    });

    csvContent += `Total,,,${data?.total_qty || 0},${data?.total_amount || 0}`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sell_report.csv");
  };


  return (
    <Box
      sx={{

        p: 2,

        bgcolor: "white",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          sx={{
            color: colors.grey[600],
            fontWeight: 'bold',
            letterSpacing: '1px',
            fontFamily: 'monospace'
          }}
        >
          Sell Reports
        </Typography>
        <ButtonGroup size='small'>
          <Tooltip title="Total QTY">
            <Button sx={{ color: colors.grey[700], borderColor: colors.grey[700] }}>
              {data?.total_qty ?? 0}
            </Button>
          </Tooltip>

          <Tooltip title="Total Amount">
            <Button sx={{ color: colors.green[500], borderColor: colors.green[500] }}>
              {"₹"}{data?.total_amount}
            </Button>
          </Tooltip>
        </ButtonGroup>
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
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          {/* Start Date Picker */}
          <CustomDateRangePicker
            width={"350px"}
            date_type="range"
            startDate={dayjs(date.startDate, "YYYY-MM-DD")}
            endDate={dayjs(date.endDate, "YYYY-MM-DD")}
            onChange={(startDate, endDate) => {
              setDate({
                startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
                endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
              });
            }}
          />
          {/* </LocalizationProvider> */}


          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: '12vw', bgcolor: colors.grey[200], borderRadius: '5px' }}
          />
        </Stack>
      </Stack>

      <Box mt={2}>
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
          rows={ReportItem}
          columns={SellReportColumn}
          loading={isLoading || isRefetching}
          paginationMode="client"
          paginationModel={page}
          onPaginationModelChange={handlePageChange}
          pageSizeOptions={[10, 20, 50, 100]}
        />

      </Box>
    </Box>
  );
};

export default SellReport;
