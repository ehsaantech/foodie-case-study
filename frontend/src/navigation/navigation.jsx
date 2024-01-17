import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../protectedRoutes/protectedRoutes";
//containers
import Dashboard from '../containers/dashboard/dashboard';
import LoginContainer from '../containers/login/login';
import SignupContainer from '../containers/signup/signup';
//components
import NotFound from "../components/notfound/notfound";
import BaseComponent from '../components/baseLayout/baseLayout';

const Navigation = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <Routes>
            <Route path="/food" element={<BaseComponent />}>
                <Route index path="home" element={<ProtectedRoute isLoggedIn={user}> <Dashboard /></ProtectedRoute>} />
            </Route>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<SignupContainer />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/food/home" />} />
            <Route path="/food" element={<Navigate to="/food/home" />} />
        </Routes>
    )
}

export default Navigation;