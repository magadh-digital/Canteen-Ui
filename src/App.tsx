import { useEffect, } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import Layout from './Layout';
import { Dashboard } from './Dashboard/dashboard';
import CanteenList from './Canteen.tsx/CanteenList';
import PosList from './POSPages/PosList';
import AllModalList from './AllModalList';
import LoginCanteenPage from './LoginCanteenPage';
import { OrderList } from './Orders/OrderList';
import { baseUrl } from './ApiEndPoint';
import { useDispatch } from 'react-redux';
import { setLoginCanteenUser, setLoginCanteenUserToken } from './AllStoreSlice/LoginCanteenUserSlice';
import axios from 'axios';
import ProductList from './ProductList/ProductList';
import SelectCanteen from './SelectCanteen';
import UserPosList from './UserPosPage.tsx/UserPosList';
import Qrcode from './Qrcode';
import { setCanteenDataSlice } from './AllStoreSlice/CanteenIdSlice';
import Supplier from './Supplier/supplier';
import Purchases from './Purchase/Purchases';
import { MobileViewItemDetails } from './UserPosPage.tsx/MobileViewItemDetails';
import MyOrderList from './UserPosPage.tsx/MyOrderList';
import UserLayout from './UserPosPage.tsx/UserLayout';
import CanteenLayout from './POSPages/CanteenLayout';
import { MobilePosViewItemList } from './POSPages/MobilePosViewList';
import StocksList from './Stocks/StocksList';
import CreatePurchase from './Purchase/CreatePurchase';
import OrderReports from './Report/OrderReports';
import { createTheme, ThemeProvider } from '@mui/material';
import AllUserList from './Users/AllUserList';


function PrivateRoute({ redirectTo }: any) {
    const token = localStorage.getItem("canteen_token");
    return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

// PublicRoute Component
function PublicRoute({ redirectTo }: any) {
    const userToken = localStorage.getItem("canteen_token");
    return userToken ? <Navigate to={redirectTo} /> : <Outlet />;
}

axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("canteen_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["Device"] = "web".toString()
            config.params = {
                ...config.params,
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

function App() {
    const dispatch = useDispatch();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnMount: true,
                refetchOnReconnect: true,
                refetchInterval: 1000 * 60,
            },
        },
    });
    const theme = createTheme()

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Router>
                    <AppContent dispatch={dispatch} />
                </Router>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

function AppContent({ dispatch }: { dispatch: any }) {
    const token = localStorage.getItem("canteen_token");
    const canteen_user_id = localStorage.getItem("canteen_user_id");
    const canteen_data = localStorage.getItem("canteen_name");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios
                .get(`${baseUrl}/user/token/verify`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res: any) => {
                    if (canteen_user_id === null) {
                        navigate("/selectCanteen");
                    }
                    dispatch(setLoginCanteenUser(res.data.user));
                    dispatch(setLoginCanteenUserToken(res.data.token));
                    dispatch(setCanteenDataSlice(JSON.parse(canteen_data as string)));
                })
                .catch((error: any) => {
                    toast.error(error?.response?.data?.error);
                    localStorage.clear();
                    navigate("/login");
                });
        }
    }, []);

    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoute redirectTo="/dashboard" />}>
                    <Route path="/login" element={<LoginCanteenPage />} />
                </Route>

                {/* Private Routes */}
                <Route element={<PrivateRoute redirectTo="/login" />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<OrderList />} />
                        <Route path="/canteen" element={<CanteenList />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/selectCanteen" element={<SelectCanteen />} />
                        <Route path="/products-items" element={<ProductList />} />
                        <Route path="/supplier" element={<Supplier />} />
                        <Route path="/purchase" element={<Purchases />} />
                        <Route path='/stocks' element={<StocksList />} />
                        <Route path='/add-purchase' element={<CreatePurchase />} />
                        <Route path='/order-reports' element={<OrderReports />} />
                        <Route path='/users' element={<AllUserList />} />
                    </Route>
                </Route>

                <Route path="/user" element={<UserLayout />}>
                    <Route index element={<UserPosListWrapper />} />
                    <Route path="/user/view_item" element={<MobileViewItemDetails />} />
                    <Route path="/user/order/view" element={<MyOrderList />} />
                </Route>


                {/* <Route element={<PrivateRoute redirectTo="/login" />}> */}
                <Route path="/qrcode" element={<Qrcode />} />
                <Route path='/pos' element={<CanteenLayout />}>
                    <Route path="/pos" element={<PosList />} />
                    <Route path='/pos/view_item' element={<MobilePosViewItemList />} />
                </Route>
                {/* </Route> */}
            </Routes>

            <AllModalList />
            <ToastContainer />
        </>
    );
}


export default App;

function UserPosListWrapper() {
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const canteenId = queryParams.get("canteen_id");
    useEffect(() => {
        if (!canteenId) {
            toast.error("Canteen ID is missing!");
            // navigate("/selectCanteen");
        }
    }, [canteenId, navigate]);

    return <UserPosList canteenId={canteenId || ""} />;

}

