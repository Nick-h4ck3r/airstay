import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="py-4 md:px-28 px-6 flex flex-col min-h-screen">
            <Header />
            <Outlet/>
        </div>
    )
}