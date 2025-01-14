
import { Box, colors, Grid, Paper, Stack, styled, Typography } from "@mui/material"
import { BarChart, LineChart, PieChart, ScatterChart } from "@mui/x-charts";


const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[3],
    backgroundColor: colors.grey[100],
}));
export const Dashboard = () => {
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

    const data = [
        {
            id: 'data-0',
            x1: 329.39,
            x2: 391.29,
            y1: 443.28,
            y2: 153.9,
        },
        {
            id: 'data-1',
            x1: 96.94,
            x2: 139.6,
            y1: 110.5,
            y2: 217.8,
        },
        {
            id: 'data-2',
            x1: 336.35,
            x2: 282.34,
            y1: 175.23,
            y2: 286.32,
        },
        {
            id: 'data-3',
            x1: 159.44,
            x2: 384.85,
            y1: 195.97,
            y2: 325.12,
        },
        {
            id: 'data-4',
            x1: 188.86,
            x2: 182.27,
            y1: 351.77,
            y2: 144.58,
        },
        {
            id: 'data-5',
            x1: 143.86,
            x2: 360.22,
            y1: 43.253,
            y2: 146.51,
        },
        {
            id: 'data-6',
            x1: 202.02,
            x2: 209.5,
            y1: 376.34,
            y2: 309.69,
        },
        {
            id: 'data-7',
            x1: 384.41,
            x2: 258.93,
            y1: 31.514,
            y2: 236.38,
        },
        {
            id: 'data-8',
            x1: 256.76,
            x2: 70.571,
            y1: 231.31,
            y2: 440.72,
        },
        {
            id: 'data-9',
            x1: 143.79,
            x2: 419.02,
            y1: 108.04,
            y2: 20.29,
        },
        {
            id: 'data-10',
            x1: 103.48,
            x2: 15.886,
            y1: 321.77,
            y2: 484.17,
        },
        {
            id: 'data-11',
            x1: 272.39,
            x2: 189.03,
            y1: 120.18,
            y2: 54.962,
        },
        {
            id: 'data-12',
            x1: 23.57,
            x2: 456.4,
            y1: 366.2,
            y2: 418.5,
        },
        {
            id: 'data-13',
            x1: 219.73,
            x2: 235.96,
            y1: 451.45,
            y2: 181.32,
        },
        {
            id: 'data-14',
            x1: 54.99,
            x2: 434.5,
            y1: 294.8,
            y2: 440.9,
        },
        {
            id: 'data-15',
            x1: 134.13,
            x2: 383.8,
            y1: 121.83,
            y2: 273.52,
        },
        {
            id: 'data-16',
            x1: 12.7,
            x2: 270.8,
            y1: 287.7,
            y2: 346.7,
        },
        {
            id: 'data-17',
            x1: 176.51,
            x2: 119.17,
            y1: 134.06,
            y2: 74.528,
        },
        {
            id: 'data-18',
            x1: 65.05,
            x2: 78.93,
            y1: 104.5,
            y2: 150.9,
        },
        {
            id: 'data-19',
            x1: 162.25,
            x2: 63.707,
            y1: 413.07,
            y2: 26.483,
        },
    ]

    // const { canteen, token } = useSelector((state: RootState) => state.LoginCanteenUser)

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
                                Value: {level.value}
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
                            {
                                label: 'Series A',
                                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                            },
                            {
                                label: 'Series B',
                                data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                            },
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
