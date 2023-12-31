import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";



const Main = () => {
    return (
        <div className="bg-[#8ea96e]">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;