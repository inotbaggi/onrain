import React from 'react';
import {Button, ConfigProvider, Input, theme} from "antd";
import Header from "./components/Header";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import General from "./pages/General";
import { App } from 'antd';
import Footer from "./components/Footer";
import Server from "./pages/Server";

export const defaultIcon = "data:image/jpeg;base64,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"

function AppClass() {
    const routers = createBrowserRouter([
        {
            path: "/",
            element: <General/>,
            errorElement: <div>Error 404</div>
        },
        {
            path: "/server/:id",
            element: <Server/>,
            errorElement: <div>Error 404</div>
        },
    ]);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <App>
                <div className="flex flex-col min-h-screen bg-black text-white">
                    <Header/>
                    <main className="flex-1">
                        <RouterProvider router={routers}/>
                    </main>
                    <Footer/>
                </div>
            </App>
        </ConfigProvider>
    );
}

export default AppClass;
