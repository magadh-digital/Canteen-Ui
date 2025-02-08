import {
    Avatar, Box, Card, CardContent,
    colors, Grid, LinearProgress, Typography,
} from "@mui/material";
import { PieChart, } from "@mui/x-charts";
import { GetReportOrderApi } from "../AllGetApi";
import { ShoppingCart, LocalOffer } from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setUserItemViewData, setUserItemViewId, setuserOrderDetails } from "../AllStoreSlice/UserOrderListSlice";
import { QuantityType, User } from "../AllTypes";

export const Dashboard = () => {
    const { data, isLoading } = GetReportOrderApi();
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
                                    {data?.last20orders?.map((item, index) => (
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
                                        data?.last20orders?.map((item) => ({
                                            name: item?.canteen?.name,
                                            value: item?.total_amount
                                        })) || [],
                                    innerRadius: 90,
                                    arcLabel: (params) => params.label ?? "",
                                    arcLabelMinAngle: 20,
                                    valueFormatter: (value) => `${value} %`,
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
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "primary.main",
                            bgcolor: colors.grey[100],
                        }}>

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

            {/* <Stack spacing={2} direction={isSmallScreen ? "column" : "row"} alignItems="center" sx={{ marginTop: 2, overflowX: "auto" }}>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'] }]}
                        series={[{ data: [4, 3, 5, 7, 8] }, { data: [1, 6, 3, 6, 8] }]}
                        width={isSmallScreen ? 300 : 500}
                        height={isSmallScreen ? 200 : 300}
                    />
                    <LineChart
                        sx={{ bgcolor: colors.grey[100] }}
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                        width={isSmallScreen ? 300 : 700}
                        height={isSmallScreen ? 200 : 300}
                    />
                </Stack> */}

        </Box >
    );
};
