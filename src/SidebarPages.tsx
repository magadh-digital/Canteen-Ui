import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { PagesTypes } from './AllTypes';
import { FoodBank } from '@mui/icons-material';
// import { PagesTypes } from './AllTypes';
import CategoryIcon from '@mui/icons-material/Category';
export const NAVIGATION: PagesTypes[] = [

  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon sx={{ color: "#9FD675" }} />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon sx={{ color: "#9FD675" }} />,
  },
  {
    segment: 'Canteen',
    title: 'Canteen',
    icon: <FoodBank sx={{ color: "#9FD675" }} />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <CategoryIcon sx={{ color: "#9FD675" }} />,
    children: [
      {
        segment: 'products-items',
        title: 'Products items',
        icon: <ShoppingCartIcon sx={{ color: "#9FD675" }} />
      }
    ]
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon sx={{ color: "#9FD675" }} />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon sx={{ color: "#9FD675" }} />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon sx={{ color: "#9FD675" }} />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon sx={{ color: "#9FD675" }} />,
  },
];