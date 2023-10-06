// import React from 'react';

import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {

    const {token} = useStateContext()

    if(token){
        return <Navigate to="/" />
    }
    return (
        <div>
            <div>For guest users only</div>
            <Outlet />
        </div>
    );
}

export default GuestLayout;
