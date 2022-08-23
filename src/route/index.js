import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"

import NotFound from "../pages/NotFound";
import Login from '../pages/Login'
import Post from '../pages/Post'
import Boarding from '../pages/Boarding'
import Request from '../pages/Request'
import { store } from "../store";
import { Box, Toolbar } from "@mui/material";
import SidePanel from "../components/SidePanel";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import Users from "../pages/Users";
import Verification from "../pages/Verification";
import MyBoarding from "../pages/MyBoarding";
import { drawerActions } from "../store/drawerSlice";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ roles = [], children, }) => {
    const auth = store.getState().auth
    const location = useLocation()
    const path = location.pathname.split('/').filter(x => x)
    const dispatch = useDispatch()

    if (!auth.status) return <Navigate to={'/'} replace />;

    if (!roles.includes(auth.role)) {
        if (location.pathname.split('/').filter(x => x).length === 1)
            return <Navigate to={'/'} replace />;
        path.pop()
        return <Navigate to={`/${path.join('/')}`} replace />;
    }

    return children ? children : (
        <Box p={1} >
            <Header />
            <Toolbar />
            <Box display="flex">
                <SidePanel />
                <Box display="inherit" width="100%" onClick={() => dispatch(drawerActions.hide())}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
};


function Views() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="hosteler" element={<ProtectedRoute roles={['hosteler']} />}>
                {/* header tabs */}
                <Route path="home" element={<Post />} />
                <Route path="mypost" element={<Post />} />
                <Route path="mypost/:postID/request" element={<Request />} />
                <Route path="boarding" element={<Boarding />} />
                {/* left drawer tabs */}
                <Route path="profile" element={<Profile />} />
                <Route path="request" element={<Request />} />
                <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="manager" element={<ProtectedRoute roles={['manager']} />}>
                {/* header tabs */}
                <Route path="home" element={<Post />} />
                {/* left drawer tabs */}
                <Route path="profile" element={<Profile />} />
                <Route path="myboarding" element={<MyBoarding />} />
            </Route>
            <Route path="admin" element={<ProtectedRoute roles={['admin']} />}>
                {/* header tabs */}
                <Route path="home" element={<Post />} />
                <Route path="boarding" element={<Boarding />} />
                {/* left drawer tabs */}
                <Route path="profile" element={<Profile />} />
                <Route path="users" element={<Users />} />
                <Route path="verification" element={<Verification />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Views