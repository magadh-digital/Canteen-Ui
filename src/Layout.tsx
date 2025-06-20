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
import { Button, Collapse, colors, Stack, } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { PagesTypes } from './AllTypes';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';
// import { useSelector } from 'react-redux';
// import { RootState } from './Store';
import imgMenu from '../src/assets/logoBlack.jpeg'
import sellRportIcon from '../src/assets/sellReportIcon.png'
import purchaseReportIcon from '../src/assets/purchaseReportIcon.webp'
import moment from 'moment';



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
  backgroundColor: colors.grey[200],

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
  const canteen_id = localStorage.getItem('canteen_user_id')
  // const { canteenData } = useSelector((state: RootState) => state.canteenData)
  const [currentDate, setCurrentDate] = React.useState<string>(moment().format("DD-MM-YYYY hh:mm:ss"));
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(moment().format("DD-MM-YYYY hh:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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

  // const newDate = new Date();



  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      // overflow: 'hidden',
      width: '100vw',

    }}

    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: colors.grey[100],
          border: "none",
          boxShadow: "0px 2px 2px #bebebe, 0px 0px 1px #ffffff",
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
              <img src={`${imgMenu}`}
                alt='"no img'
                width={"20px"} height={"20px"}
                style={{ borderRadius: "30%", marginRight: "10px" }} />
          }
          <Stack width={"100%"} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
                Magadh Canteen
              </Typography>
              <Typography sx={{ color: colors.grey[900] }}>
                ({currentDate})
              </Typography>
            </Stack>

            <div style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 5
            }}>
              <div
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                  borderRadius: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: "#fff",
                  width: 90,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
                onClick={() => navigate("/sell-reports")}
              >
                <img
                  src={sellRportIcon}
                  alt="Sell"
                  style={{ width: 32, height: 28, marginBottom: 1 }}
                />
                <p style={{ color: "#333", margin: 0, fontWeight: 500, fontSize: 11 }}>Sell</p>
              </div>

              {/* Purchase Box */}
              <div
                style={{
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                  borderRadius: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: "#fff",
                  width: 90,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
                onClick={() => navigate("/purchase-reports")}
              >
                <img
                  src={purchaseReportIcon}
                  alt="Purchase"
                  style={{ width: 32, height: 28, marginBottom: 1 }}
                />
                <p style={{ color: "#333", margin: 0, fontWeight: 500, fontSize: 11 }}>Purchase</p>
              </div>
              <Button
                onClick={() => navigate(`/pos?canteen_id=${canteen_id}`)}
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
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'linear-gradient(135deg, #1e1e2f, #252542)',
            color: '#e0e0e0',
            borderRight: '1px solid #333',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <DrawerHeader sx={{ position: 'relative' }}>
          <img
            src={`${imgMenu}`}
            alt="no img"
            width={180}
            height={60}
            style={{
              alignContent: "center",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '-10px',
              transform: 'translateY(-50%)',
              color: 'green',
              // backgroundColor: 'rgba(255, 255, 255, 0.7)',   
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
            }}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {NAVIGATION.map((item: PagesTypes, index) => (
            <React.Fragment key={index}>
              <ListItem
                disablePadding
                sx={{
                  display: 'block',
                  margin: '5px 0',
                  borderRadius: '8px',
                  backgroundColor: expandedSegment === item.path ? '#303050' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#404060',
                  },
                  transition: 'background-color 0.3s',
                }}
              >
                <ListItemButton
                  onClick={() => {
                    if (item.children) toggleExpand(item.path || '');
                  }}
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    px: 1.5,
                    color: '#e0e0e0',
                  }}
                  component={!item.children ? (Link as React.ElementType) : 'div'}
                  to={!item.children ? `/${item.path}` : undefined}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: open ? 1.5 : 'auto',
                      color: '#e0e0e0',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      fontSize: '0.875rem',
                      color: '#e0e0e0',
                    }}
                  />
                  {item.children &&
                    (expandedSegment === item.path ? (
                      <ExpandLess sx={{ color: '#e0e0e0' }} />
                    ) : (
                      <ExpandMore sx={{ color: '#e0e0e0' }} />
                    ))}
                </ListItemButton>
              </ListItem>
              {item.children && (
                <Collapse in={expandedSegment === item.path} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItemButton
                        key={childIndex}
                        sx={{
                          pl: open ? 3 : 2,
                          py: 0.5,
                          backgroundColor: '#2e2e3e',
                          borderRadius: '5px',
                          margin: '3px 0',
                          '&:hover': {
                            backgroundColor: '#3e3e50',
                          },
                        }}
                        component={Link as React.ElementType}
                        to={`/${child.path}`}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            justifyContent: 'center',
                            mr: open ? 1.5 : 'auto',
                            color: '#c0c0c0',
                          }}
                        >
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.title}
                          sx={{
                            opacity: open ? 1 : 0,
                            fontSize: '0.8125rem',
                            color: '#c0c0c0',
                          }}
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
          paddingTop: 0,
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          width: "100%",
          height: "100%"
        }}
      >
        {isPOSPage ? children : <Outlet />}
      </Box>
    </Box>
  );
}
