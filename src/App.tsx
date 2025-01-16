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
import { useEffect } from 'react';
import { baseUrl } from './ApiEndPoint';
import { useDispatch } from 'react-redux';
import { setLoginCanteenUser } from './AllStoreSlice/LoginCanteenUserSlice';
import axios from 'axios';
import ProductList from './ProductList/ProductList';

// PrivateRoute Component
function PrivateRoute({ redirectTo }: any) {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

// PublicRoute Component
function PublicRoute({ redirectTo }: any) {
    const userToken = localStorage.getItem("token");
    return userToken ? <Navigate to={redirectTo} /> : <Outlet />;
}

// Main App Component
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

// App Content Component
function AppContent({ dispatch }: { dispatch: any }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${baseUrl}/canteen/token/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res: any) => {
                    dispatch(setLoginCanteenUser(res.data.canteen));
                })
                .catch((error: any) => {
                    toast.error(error?.response?.data?.error);
                    localStorage.removeItem("token");
                    navigate("/");
                });
        }
    }, [dispatch, navigate]);

    return (
        <>
            <Routes>
                {/* <Route element={<PublicRoute redirectTo="/dashboard" />}> */}
                <Route path="/login" element={<LoginCanteenPage />} />
                {/* </Route> */}

                {/* <Route element={<PrivateRoute redirectTo="/login" />}> */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/canteen" element={<CanteenList />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path='/products-items' element={<ProductList />} />
                </Route>
                {/* </Route> */}

                {/* <Route element={<PrivateRoute redirectTo="/login" />}> */}
                <Route path="/pos" element={<PosList />} />
                
              
                {/* </Route> */}
            </Routes>

            <AllModalList />
            <ToastContainer />
        </>
    );
}

export default App;
