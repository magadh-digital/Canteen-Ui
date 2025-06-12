import {
    Avatar, Box, Card, CardContent,
    colors, Grid, LinearProgress, Stack, Typography,
} from "@mui/material";
import { BarChart, PieChart, } from "@mui/x-charts";
import { GetMonthlyWiseDataApi, GetReportOrderApi } from "../AllGetApi";
import { ShoppingCart, LocalOffer, } from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setUserItemViewData, setUserItemViewId, setuserOrderDetails } from "../AllStoreSlice/UserOrderListSlice";
import { QuantityType, User } from "../AllTypes";
import { useState } from "react";

export const Dashboard = () => {
    const { data, isLoading } = GetReportOrderApi();
    const [date, setDate] = useState({
        start_date: moment(new Date()).format('YYYY-MM-DD'),
        end_date: moment(new Date()).format('YYYY-MM-DD'),
    })
    const { data: monthlyData, isLoading: monthlyDataLoading } = GetMonthlyWiseDataApi({
        start_date: date.start_date,
        end_date: date.end_date
    })
    console.log(monthlyData);
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

    const amount = [
        {
            name: "Sell Amount",
            value: 785
        },
        {
            name: "Discount Amount",
            value: 678
        },
        {
            name: "Due Amount",
            value: 899
        },
        {
            name: "Received Amount",
            value: 378
        }

    ]

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
                    <Card sx={{
                        p: 2,
                        boxShadow: 3,
                        borderRadius: "15px",
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <PieChart
                            sx={{
                            }}
                            height={300}
                            series={[
                                {
                                    data:
                                        amount?.map((item) => ({
                                            name: item?.name,
                                            value: item?.value,
                                            color: item?.name === "Sell Amount" ? colors.green[500] : item?.name === "Discount Amount" ? colors.blue[500] : item?.name === "Due Amount" ? colors.deepOrange[500] : colors.purple[500],
                                        })) || [],
                                    innerRadius: 90,
                                    arcLabel: (params) => params.label ?? "",
                                    arcLabelMinAngle: 20,
                                    valueFormatter: (value) => `₹ ${value?.value}`,
                                },
                            ]}
                            skipAnimation={false}
                        />

                        <Box sx={{
                            width: "100%",
                            height: "200px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            color: "grey",
                            bgcolor: colors.grey[100],
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                                width: "60%",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>

                                <span style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "space-between" }}>
                                    <span style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: colors.green[500],
                                        borderRadius: "50%",
                                        display: "inline-block",
                                    }}>
                                    </span>
                                    Sell Amount
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "space-between" }}>
                                    <span style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: colors.blue[500],
                                        borderRadius: "50%",
                                        display: "inline-block",
                                    }}>
                                    </span>
                                    Discount
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "space-between" }}>
                                    <span style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: colors.deepOrange[500],
                                        borderRadius: "50%",
                                        display: "inline-block",
                                    }}>
                                    </span>
                                    Due Amount
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", justifyContent: "space-between" }}>
                                    <span style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: colors.purple[500],
                                        borderRadius: "50%",
                                        display: "inline-block",
                                    }}>
                                    </span>
                                    Recived  Amount
                                </span>
                            </div>
                        </Box>
                    </Card>
                </Grid>
            </Grid>


            {/* <Stack spacing={2} direction={isSmallScreen ? "column" : "row"} alignItems="center">
                    <PieChart
                        series={[{ data: [] }]}
                        width={isSmallScreen ? 300 : 400}
                        height={isSmallScreen ? 150 : 200}
                    />
                    <ScatterChart
                        width={isSmallScreen ? 300 : 600}
                        height={isSmallScreen ? 200 : 300}
                        sx={{ bgcolor: colors.grey[100] }}
                        series={[]}
                    />
                </Stack> */}

            <Stack spacing={2} direction={"row"} alignItems="center" sx={{ marginTop: 2, overflowX: "auto" }}>
                <BarChart
                    width={900}
                    height={300}
                    xAxis={[{ scaleType: 'band', data: [monthlyData?.data?.map((item) => item?.date)] }]}
                    series={[{ data: [4, 3, 5, 7, 8] }, { data: [1, 6, 3, 6, 8] }]}
                />
            </Stack>

        </Box >
    );
};
