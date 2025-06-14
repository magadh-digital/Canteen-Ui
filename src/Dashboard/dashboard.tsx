import {
    Avatar, Box, Card, CardContent,
    colors, Grid, LinearProgress, Stack, Typography,
} from "@mui/material";
import { BarChart, PieChart, } from "@mui/x-charts";
import { GetMonthlyWiseDataApi, GetReportOrderApi, GetSellReportApi, GetTodaySellReport } from "../AllGetApi";
import { ShoppingCart, LocalOffer, } from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setUserItemViewData, setUserItemViewId, setuserOrderDetails } from "../AllStoreSlice/UserOrderListSlice";
import { QuantityType, User } from "../AllTypes";
import { useState } from "react";

export const Dashboard = () => {
    const { data, isLoading } = GetReportOrderApi();
    const [date, setDate] = useState({
        start_date: moment().startOf('month').format('YYYY-MM-DD'),
        end_date: moment().endOf('month').format('YYYY-MM-DD'),
    })
    const { data: monthlyReport, isLoading: monthlyDataLoading } = GetMonthlyWiseDataApi({
        start_date: date.start_date,
        end_date: date.end_date
    })

    const { data: TodaySellData, isLoading: TodaySellDataLoading } = GetTodaySellReport()

    console.log(monthlyReport);
    const metrics = [
        {
            title: "Monthly Orders / Sales",
            value: `${data?.data?.monthlyOrders ?? 0} / ${data?.data?.monthlySales ?? 0}`,
            color: "primary.main",
            icon: <ShoppingCart fontSize="large" />
        },
        {
            title: "Today's Orders / Sales",
            value: `${data?.data?.todayOrders ?? 0} / ${data?.data?.todaySales ?? 0}`,
            color: "error.main",
            icon: <ShoppingCart fontSize="large" />
        },
        {
            title: "Yearly Orders / Sales",
            value: `${data?.data?.yearlyOrders ?? 0} / ${data?.data?.yearlySales ?? 0}`,
            color: "primary.dark", icon: <ShoppingCart fontSize="large" />
        },
        {
            title: "Monthly Vouchers",
            value: data?.data?.monthlyVouchers ?? 0,
            color: "info.main",
            icon: <LocalOffer fontSize="large" />
        },
        {
            title: "Today's Vouchers",
            value: data?.data?.todayVouchers ?? 0,
            color: "warning.main",
            icon: <LocalOffer fontSize="large" />
        },
        {
            title: "Yearly Vouchers",
            value: data?.data?.yearlyVouchers ?? 0,
            color: "info.dark",
            icon: <LocalOffer fontSize="large" />
        },
    ];
    const dispatch = useDispatch()
    const handleOpenViewItems = ({ user, data, details }: { user: User, data: QuantityType[], details: any }) => {
        dispatch(setUserItemViewId(user?.id))
        dispatch(setUserItemViewData(data))
        dispatch(setuserOrderDetails(details))
    }




    return (
        <Box sx={{ height: '100%', p: 2, bgcolor: colors.grey[100], overflowX: "hidden" }}>
            <Typography variant="h4" align="left" sx={{ marginBottom: 3, fontWeight: 600 }}>Dashboard</Typography>
            {isLoading ? (
                <LinearProgress />
            ) : (
                <Grid container spacing={3} sx={{ padding: 0 }}>
                    {metrics.map((metric, index) => (
                        <Grid item xs={16} sm={6} md={3} key={index}>
                            <Card sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                boxShadow: 3,
                                borderLeft: `5px solid`,
                                borderColor: metric.color
                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" color="textSecondary">
                                        {metric.title}
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {metric.value}
                                    </Typography>
                                </CardContent>
                                {metric.icon}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}




            <Grid container spacing={3} sx={{ mt: 5 }}>
                <Grid item xs={8} md={6}>
                    <Card sx={{ p: 2, boxShadow: 3, borderRadius: "15px", height: "400px", width: "100%" }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Latest 20 Orders
                        </Typography>
                        <div className="table-dashboard">
                            <table style={{ width: "100%", }}>
                                <tbody>
                                    {data?.last20orders?.filter((item) => item?.status !== "DELETED").map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                                <Avatar alt={item?.canteen?.name} src={item?.canteen?.name} sx={{ bgcolor: "#1976d2", color: "#fff" }} />
                                                <span style={{ fontWeight: "bold" }}>{item?.canteen?.name}</span>
                                            </td>
                                            <td>{moment(item?.created_at).format("MM-DD-YYYY")}</td>
                                            <td>{item?.order_id}</td>
                                            <td style={{ textAlign: "right", fontWeight: "bold", color: "green" }}>
                                                &#8377; {item?.total_amount}
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                <span
                                                    style={{ textDecoration: "underline", color: "#2196f3", cursor: "pointer" }}
                                                    onClick={() => handleOpenViewItems({ data: item?.items, details: item, user: item?.user })}
                                                >
                                                    View
                                                </span>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            p: 2,
                            boxShadow: 3,
                            borderRadius: "15px",
                            height: "400px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} textAlign="left" mb={1}>
                            Today's Sale Summary : -
                        </Typography>

                        <PieChart
                            height={220}
                            series={[
                                {
                                    data: [
                                        {
                                            id: 0,
                                            value: TodaySellData?.sell_summary?.sub_total || 0,
                                            label: "Sell",
                                            color: colors.green[300],
                                        },
                                        {
                                            id: 1,
                                            value: TodaySellData?.sell_summary?.VoucherAmt || 0,
                                            label: "Discount",
                                            color: colors.blue[300],
                                        },
                                        {
                                            id: 2,
                                            value: TodaySellData?.purchases?.due_amount || 0,
                                            label: "Due",
                                            color: colors.deepOrange[300],
                                        },
                                        {
                                            id: 3,
                                            value:
                                                (TodaySellData?.sell_summary?.cash_payment || 0) +
                                                (TodaySellData?.sell_summary?.online_payment || 0),
                                            label: "Received",
                                            color: colors.purple[300],
                                        },
                                    ],
                                },
                            ]}
                        />

                        <Box
                            sx={{
                                mt: 2,
                                px: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {[
                                {
                                    label: "Sell Amount",
                                    color: colors.green[500],
                                    value: TodaySellData?.sell_summary?.sub_total || 0,
                                },
                                {
                                    label: "Discount",
                                    color: colors.blue[500],
                                    value: TodaySellData?.sell_summary?.VoucherAmt || 0,
                                },
                                {
                                    label: "Due Amount",
                                    color: colors.deepOrange[500],
                                    value: TodaySellData?.purchases?.due_amount || 0,
                                },
                                {
                                    label: "Received Amount",
                                    color: colors.purple[500],
                                    value:
                                        (TodaySellData?.sell_summary?.cash_payment || 0) +
                                        (TodaySellData?.sell_summary?.online_payment || 0),
                                },
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 16,
                                                height: 16,
                                                borderRadius: "50%",
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <Typography fontSize={14}>{item.label}</Typography>
                                    </Box>
                                    <Typography fontWeight={600} fontSize={14}>₹{item.value.toFixed(2)}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>

            </Grid>

            <Stack
                direction={"row"}
                width={"100%"}
                alignItems="center" sx={{
                    marginTop: 2,
                    overflowX: "auto"
                }}>
                {Array.isArray(monthlyReport?.data) && (
                    <BarChart
                        height={400}
                        xAxis={[
                            {
                                scaleType: "band",
                                data: monthlyReport.data.map((item) =>
                                    new Date(item.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                ),
                                label: "Date",
                            },
                        ]}
                        series={[
                            {
                                type: "bar",
                                data: monthlyReport.data.map((item) => item.Expense ?? 0),
                                label: "Expense",
                                color: "#ef5350",
                            },
                            {
                                type: "bar",
                                data: monthlyReport.data.map((item) => item.Income ?? 0),
                                label: "Income",
                                color: "#42a5f5",
                            },
                            {
                                type: "bar",
                                data: monthlyReport.data.map((item) => item.net_profit ?? 0),
                                label: "Net Profit",
                                color: "#66bb6a",
                            },
                        ]}
                    />
                )}



            </Stack>

        </Box >
    );
};
