import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { PagesTypes } from './AllTypes';
import { FoodBank, Person } from '@mui/icons-material';
// import { PagesTypes } from './AllTypes';
import CategoryIcon from '@mui/icons-material/Category';
import { colors } from '@mui/material';
import imgSupp from '../src/assets/supplier (1).png'
import imgStock from '../src/assets/5166961.png'
import imgPurchase from '../src/assets/payment-method.png'

export const NAVIGATION: PagesTypes[] = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon sx={{ color: colors.grey[200] }} />,
  },
  {
    segment: 'orders',
    title: 'Invoice',
    icon: <ShoppingCartIcon sx={{ color: colors.grey[200] }} />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <Person sx={{ color: colors.grey[200] }} />
  },
  {
    segment: 'Canteen',
    title: 'Canteen',
    icon: <FoodBank sx={{ color: colors.grey[200] }} />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <CategoryIcon sx={{ color: colors.grey[200] }} />,
    children: [
      {
        segment: 'products-items',
        title: 'Products items',
        icon: <ShoppingCartIcon sx={{ color: colors.grey[200] }} />
      }
    ]
  },

  {
    segment: 'supplier',
    title: 'Supplier',
    icon: <img src={`${imgSupp}`} style={{ width: "25px", height: "30px" }} />,
  },
  {
    segment: "stocks",
    title: "Stocks",
    icon: <img src={`${imgStock}`} style={{ color: '#9FD675', width: "25px", height: "30px" }} />,
  },
  {
    segment: 'purchase',
    title: 'Purchase',
    icon: <img src={`${imgPurchase}`} style={{ width: "25px", height: "30px" }} />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon sx={{ color: colors.grey[200] }} />,
    children: [
      {
        segment: 'order-reports',
        title: 'Order Reports',
        icon: <DescriptionIcon sx={{ color: colors.grey[200] }} />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon sx={{ color: colors.grey[200] }} />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon sx={{ color: colors.grey[200] }} />,
  },
];