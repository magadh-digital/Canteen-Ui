import React, { useEffect, useState } from 'react';
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
import { setLoginCanteenData, setLoginCanteenUser } from './AllStoreSlice/LoginCanteenUserSlice';
import axios from 'axios';
import ProductList from './ProductList/ProductList';
import SelectCanteen from './SelectCanteen';
import UserPosList from './UserPosPage.tsx/UserPosList';
import Qrcode from './Qrcode';
import { setCanteenDataSlice } from './AllStoreSlice/CanteenIdSlice';
import Supplier from './Supplier/supplier';
import Purchases from './Purchase/Purchases';
import ItemQuantityDetails from './POSPages/ItemQuantityDetails';
import { MobileViewItemDetails } from './UserPosPage.tsx/MobileViewItemDetails';


function PrivateRoute({ redirectTo }: any) {
    const token = localStorage.getItem("canteen_token");
    return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

// PublicRoute Component
function PublicRoute({ redirectTo }: any) {
    const userToken = localStorage.getItem("canteen_token");
    return userToken ? <Navigate to={redirectTo} /> : <Outlet />;
}

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

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AppContent dispatch={dispatch} />
                <Routes>
                    <Route path="/user" element={<UserPosListWrapper />} />
                    <Route path='/view_item' element={<MobileViewItemDetails />} />
                </Routes>
            </Router>
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
            axios.get(`${baseUrl}/user/token/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res: any) => {
                if (canteen_user_id === null) {
                    navigate("/selectCanteen");
                }
                dispatch(setLoginCanteenUser(res.data.user));
                dispatch(setCanteenDataSlice(JSON.parse(canteen_data as string)));
            }).catch((error: any) => {
                toast.error(error?.response?.data?.error);
                localStorage.removeItem("canteen_token");
                localStorage.removeItem("canteen_user_id");
                localStorage.removeItem("canteen_data");
                navigate("/login");
            });
        }
    }, []);

    return (
        <>
            <Routes>
                <Route element={<PublicRoute redirectTo="/dashboard" />}>
                    <Route path='/login' element={<LoginCanteenPage />} />
                </Route>
                <Route element={<PrivateRoute redirectTo="/login" />}>
                    <Route element={<Layout />}>
                        <Route path='/' element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<OrderList />} />
                        <Route path="/canteen" element={<CanteenList />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/selectCanteen" element={<SelectCanteen />} />
                        <Route path='/products-items' element={<ProductList />} />
                        <Route path="/supplier" element={<Supplier />} />
                        <Route path="/purchase" element={<Purchases />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute redirectTo="/login" />}>
                    <Route path="/qrcode" element={<Qrcode />} />
                    <Route path="/pos" element={<PosList />} />
                </Route>

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

