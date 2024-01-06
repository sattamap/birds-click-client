import { NavLink, Outlet } from "react-router-dom";

import { MdLibraryAddCheck } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineCollections } from "react-icons/md";
import ciji from "../assets/ciji.png";


const Dashboard = () => {

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#38a9a1]">
                <div className="flex flex-col items-center justify-center p-4 gap-4">
                    <img src={ciji} alt="Profile" className="w-20 h-20 rounded-full mr-2" />
                    <span className="text-white">Noble Ciji</span>
                </div>
                <ul className="menu p-4">
                    <li><NavLink to="/dashboard/addBirds">
                       <MdLibraryAddCheck></MdLibraryAddCheck> Add Birds
                    </NavLink>
                    </li>
                    <li><NavLink to="/dashboard/manage">
                       <MdEditNote></MdEditNote> Manage Items
                    </NavLink>
                    </li>

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                          <FaHome></FaHome>  Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myClicks">
                          <MdOutlineCollections></MdOutlineCollections>  My Clicks
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;