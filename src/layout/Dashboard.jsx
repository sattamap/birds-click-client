import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#38a9a1]">
                <div className="flex flex-col items-center justify-center p-4">
                    <img src={user?.photoURL} alt="Profile" className="w-20 h-20 rounded-full mr-2" />
                    <span className="text-white">{user?.displayName}</span>
                </div>
                <ul className="menu p-4">
                    <li><NavLink to="/dashboard/addBirds">
                        Add Birds
                    </NavLink>
                    </li>
                    <li><NavLink to="/dashboard/manage">
                        Manage Items
                    </NavLink>
                    </li>

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            Home
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