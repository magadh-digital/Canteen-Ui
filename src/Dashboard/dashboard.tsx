
import { Box, colors, Grid, Paper, Stack, styled, Typography } from "@mui/material"
import { BarChart, LineChart, PieChart, ScatterChart } from "@mui/x-charts";
import { GetReportOrderApi } from "../AllGetApi";


const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[3],
    backgroundColor: colors.grey[100],
}));
export const Dashboard = () => {
    const { data } = GetReportOrderApi()
    const Level = [{
        title: "Level 1",
        value: "1.0",
        date: "1/1/2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },
    {
        title: "Level 2",
        value: "1.0",
        date: "1/1/2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },
    {
        title: "Level 3",
        value: "1.0",
        date: "1/1/2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },
    {
        title: "Level 4",
        value: "1.0",
        date: "1/1/2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },
    {
        title: "Level 5",
        value: "1.0",
        date: "1/1/2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },
    {
        title: "Level 6",
        value: "1.0",
        date: "1/1/2022",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    }

    ]

    const backgroundColors = [
        colors.blue[100],
        colors.green[100],
        colors.orange[100],
        colors.purple[100],
        colors.red[100],
        colors.teal[100],
    ];


    return (
        <Box sx={{
            margin: 2
        }}>
            <Box>
                <Typography variant="h4">Dashboard</Typography>
            </Box>
            <Grid container spacing={2}>
                {Level?.map((level, index) => (
                    <Grid item xs={6} sm={2} md={2} key={index}>
                        <StyledPaper sx={{
                            backgroundColor: backgroundColors[index % backgroundColors.length],
                        }}>
                            <Typography variant="h6">{level.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Value: {data?.data.monthlyOrders}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Date: {level.date}
                            </Typography>
                            <Typography variant="body2">{level?.description}</Typography>
                        </StyledPaper>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ marginTop: 5, width: "100%", p: 2, bgcolor: colors.grey[500], }}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <PieChart
                        sx={{}}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                    <ScatterChart
                        width={600}
                        height={300}
                        sx={{ bgcolor: colors.grey[100] }}
                        series={[
                           
                        ]}
                    />
                </Stack>
                <Stack spacing={2} direction="row" alignItems="center">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D', 'group E'] }]}
                        series={[{ data: [4, 3, 5, 7, 8] }, { data: [1, 6, 3, 6, 8] },]}
                        width={500}
                        height={300}
                    />

                    <LineChart
                        sx={{ bgcolor: colors.grey[100], mt: 2, width: "100%" }}
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={700}
                        height={300}
                    />

                </Stack>
            </Box>
        </Box>
    )
}
