import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { PagesTypes } from './AllTypes';
import { BarChart, FoodBank, Person, Report } from '@mui/icons-material';
// import { PagesTypes } from './AllTypes';
import CategoryIcon from '@mui/icons-material/Category';
import { colors } from '@mui/material';
import imgSupp from '../src/assets/supplier (1).png'
import imgStock from '../src/assets/5166961.png'
import imgPurchase from '../src/assets/payment-method.png'

export const NAVIGATION: PagesTypes[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon sx={{ color: colors.grey[200] }} />,
  },
  {
    path: 'orders',
    title: 'Invoice',
    icon: <ShoppingCartIcon sx={{ color: colors.grey[200] }} />,
  },
  {
    path: 'users',
    title: 'Users',
    icon: <Person sx={{ color: colors.grey[200] }} />
  },
  {
    path: 'Canteen',
    title: 'Canteen',
    icon: <FoodBank sx={{ color: colors.grey[200] }} />,
  },
  {
    path: 'products',
    title: 'Products',
    icon: <CategoryIcon sx={{ color: colors.grey[200] }} />,
    children: [
      {
        path: 'products-items',
        title: 'Products items',
        icon: <ShoppingCartIcon sx={{ color: colors.grey[200] }} />
      }
    ]
  },

  {
    path: 'supplier',
    title: 'Supplier',
    icon: <img src={`${imgSupp}`} style={{ width: "25px", height: "30px" }} />,
  },
  {
    path: "stocks",
    title: "Stocks",
    icon: <img src={`${imgStock}`} style={{ color: '#9FD675', width: "25px", height: "30px" }} />,
  },
  {
    path: 'purchase',
    title: 'Purchase',
    icon: <img src={`${imgPurchase}`} style={{ width: "25px", height: "30px" }} />,
  },
  {
    path: 'reports',
    title: 'Reports',
    icon: <BarChart sx={{ color: colors.grey[200] }} />,
    children: [
      {
        path: 'sell-reports',
        title: 'Sell Report',
        icon: <Report sx={{ color: colors.grey[200] }} />,
      },
      {
        path: 'purchase-reports',
        title: 'Purchase Report',
        icon: <Report sx={{ color: colors.grey[200] }} />,
      },
    ],
  },
];