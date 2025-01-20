import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
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
import { setLoginCanteenUser } from './AllStoreSlice/LoginCanteenUserSlice';
import axios from 'axios';
import ProductList from './ProductList/ProductList';
import SelectCanteen from './SelectCanteen';


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
            </Router>
        </QueryClientProvider>
    );
}

function AppContent({ dispatch }: { dispatch: any }) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("canteen_token");
        const canteen_user_id = localStorage.getItem("canteen_user_id");
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
            }).catch((error: any) => {
                toast.error(error?.response?.data?.error);
                localStorage.removeItem("token");
                navigate("/login");
            });
        }
    }, []);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginCanteenPage />} />
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/canteen" element={<CanteenList />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/products-items" element={<ProductList />} />
                </Route>
                <Route path="/pos" element={<PosList />} />
                <Route path="/selectCanteen" element={<SelectCanteen />} />
            </Routes>

            <AllModalList />
            <ToastContainer />
        </>
    );
}

export default App;
