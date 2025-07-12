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
import { Button, ButtonGroup, Collapse, colors, Stack, } from '@mui/material';
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@emotion/react';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // clock icon


const moveArrow = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0.5;
  }
  50% {
    transform: translateX(6px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0.5;
  }
`;
const AnimatedButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  height: "30px",


  position: "relative",
  overflow: "hidden",
  "& .arrow": {
    marginLeft: theme.spacing(1),
    animation: `${moveArrow} 1s infinite ease-in-out`,
  },
}));


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
  // const canteen_id = localStorage.getItem('canteen_user_id')
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
          backgroundColor: "white",
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

            <Stack direction="row" alignItems="center" >



              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "#1F2937", // Tailwind's gray-800
                }}
              >
                Magadh Canteen
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  backgroundColor: "#F3F4F6", // soft gray background
                  color: "#4B5563", // dark gray text
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                {currentDate}
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1.5}>
            </Stack>

            <div style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 5
            }}>

              <ButtonGroup variant="outlined" aria-label="outlined button group">


                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/sell-reports")}
                  startIcon={<img src={sellRportIcon} alt="POS" style={{ width: 20, height: 20 }} />}
                >


                  SELL
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/purchase-reports")}
                  startIcon={<img src={purchaseReportIcon} alt="POS" style={{ width: 20, height: 20 }} />}
                >


                  PURCHASE
                </Button>

                <AnimatedButton size='small' variant="contained" color="primary" onClick={() => navigate("/pos")}>
                  Go to POS
                  <ArrowForwardIcon className="arrow" />
                </AnimatedButton>

              </ButtonGroup>

              {/*              
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
              </Button> */}
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
        {/* <List >
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
        </List> */}

        <List sx={{ p: 1 }}>
  {NAVIGATION.map((item: PagesTypes, index) => (
    <React.Fragment key={index}>
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          marginY: 0.5,
          borderRadius: 2,
          backgroundColor: expandedSegment === item.path ? '#1f1f2e' : 'transparent',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#2a2a3c',
          },
        }}
      >
        <ListItemButton
          onClick={() => item.children && toggleExpand(item.path || '')}
          sx={{
            justifyContent: open ? 'initial' : 'center',
            px: 2,
            py: 1.2,
            color: '#f5f5f5',
            borderRadius: 2,
            transition: 'all 0.3s ease',
          }}
          component={!item.children ? (Link as React.ElementType) : 'div'}
          to={!item.children ? `/${item.path}` : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: 'center',
              mr: open ? 2 : 'auto',
              color: '#f5f5f5',
              transition: 'color 0.3s',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
            sx={{
              opacity: open ? 1 : 0,
              color: '#f5f5f5',
              transition: 'opacity 0.3s',
            }}
          />
          {item.children &&
            (expandedSegment === item.path ? (
              <ExpandLess sx={{ color: '#f5f5f5' }} />
            ) : (
              <ExpandMore sx={{ color: '#f5f5f5' }} />
            ))}
        </ListItemButton>
      </ListItem>

      {/* Children Collapse */}
      {item.children && (
        <Collapse in={expandedSegment === item.path} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, childIndex) => (
              <ListItemButton
                key={childIndex}
                sx={{
                  pl: open ? 5 : 3,
                  py: 0.9,
                  my: 0.4,
                  mx: 1,
                  backgroundColor: '#252537',
                  borderRadius: 1.5,
                  '&:hover': {
                    backgroundColor: '#33334d',
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
                    color: '#b0b0b0',
                  }}
                >
                  {child.icon}
                </ListItemIcon>
                <ListItemText
                  primary={child.title}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                  }}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: '#d0d0d0',
                    transition: 'opacity 0.3s',
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
         width: '100%',
        height: '100%',
          flexGrow: 1,
          bgcolor:"rgb(238, 238, 238)",
          padding: 2,
          paddingTop: 10,
          
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {isPOSPage ? children : <Outlet />}
      </Box>
    </Box>
  );
}
