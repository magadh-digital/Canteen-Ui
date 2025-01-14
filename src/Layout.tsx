import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NAVIGATION } from './SidebarPages';
import { Button, Collapse, colors, Stack } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { PagesTypes } from './AllTypes';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginCanteenUser, setLoginCanteenUserToken } from './AllStoreSlice/LoginCanteenUserSlice';
import ProfilePage from './ProfilePage';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    backgroundColor: "#9FD675"
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));


export default function Layout({ children }: { children?: React.ReactNode }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [expandedSegment, setExpandedSegment] = React.useState<string | null>(null);
    const navigate = useNavigate()
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleExpand = (segment: string) => {
        setExpandedSegment(expandedSegment === segment ? null : segment);
    };
    const isPOSPage = location.pathname === '/pos';

    const newDate = new Date();
    const formattedDate = newDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });


    return (
        <Box sx={{
            display: 'flex',
        }}

        >
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    bgcolor: "#9FD675",
                    border: "none",
                    boxShadow: "none",
                    borderBottom: "0.1px solid #E0E0E0",
                }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, color: 'black', ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        open ? null :
                            <img src='public/2795550.png' alt='"no img' width={"48px"} height={"48px"} style={{ borderRadius: "30%", marginRight: "10px" }} />
                    }
                    <Stack width={"100%"} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
                                Magadh Canteen
                            </Typography>
                            <Typography sx={{ color: colors.grey[900] }}>
                                ({formattedDate})
                            </Typography>
                        </Stack>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 5
                        }}>
                            <Button
                                onClick={() => navigate("/pos")}
                                variant="contained"
                                size="small"
                                style={{
                                    backgroundColor: colors.orange[500],
                                    color: "black",
                                    borderColor: "none",
                                    border: "none"
                                }}>
                                POS
                            </Button>
                            <ProfilePage />

                        </div>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#090301',
                        color: 'white',

                    },
                }}>
                <DrawerHeader>
                    <img src='public/2795550.png' alt='"no img' width={"48px"} height={"48px"} style={{ borderRadius: "30%", marginRight: "50px" }} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {NAVIGATION.map((item: PagesTypes, index) => (
                        <React.Fragment key={index}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => {
                                        if (item.children) toggleExpand(item.segment || '');
                                    }}
                                    sx={{
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white',
                                    }}
                                    component={!item.children ? (Link as React.ElementType) : 'div'} 
                                    to={!item.children ? `/${item.segment}` : undefined} 
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            mr: open ? 3 : 'auto',
                                            color: 'white',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        sx={{ opacity: open ? 1 : 0, color: 'white' }}
                                    />
                                    {item.children &&
                                        (expandedSegment === item.segment ? (
                                            <ExpandLess sx={{ color: 'white' }} />
                                        ) : (
                                            <ExpandMore sx={{ color: 'white' }} />
                                        ))}
                                </ListItemButton>
                            </ListItem>
                            {item.children && (
                                <Collapse in={expandedSegment === item.segment} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.children.map((child, childIndex) => (
                                            <ListItemButton
                                                key={childIndex}
                                                sx={{ pl: open ? 4 : 2 }}
                                                component={Link as React.ElementType} 
                                                to={`/${child.segment}`} 
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        justifyContent: 'center',
                                                        mr: open ? 3 : 'auto',
                                                        color: 'white',
                                                    }}
                                                >
                                                    {child.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={child.title}
                                                    sx={{ opacity: open ? 1 : 0, color: 'white' }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>



            </Drawer>
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: open ? 0 : 0,
                    transition: 'margin 0.3s',
                    height: 'calc(100vh - 64px)',
                    paddingTop: 3,
                    paddingBottom: 3,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {isPOSPage ? children : <Outlet />}
            </Box>
        </Box>
    );
}
