import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaUserAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import parrot from "../../../parrot.json";


const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
      logOut()
        .then(() => {})
        .catch((error) => console.log(error));
    };
    return (
        <div>
            <div className="navbar  py-2 pr-16">
                <div className="navbar-start">
                    
                    <div className="w-32 h-32 -ml-2">
                <Lottie animationData={parrot} loop={true} />
            </div>
                    <h2 className=" text-2xl font-bold text-teal-50">
                        Noble<span className="text-rose-600">C</span>licks</h2>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-base font-bold text-white">
                    <Link to="/"><li><a>Home</a></li></Link>
                            <Link to="/myClicks"><li><a>My Clicks</a></li></Link>
                            <Link to="/about"><li><a>About Me</a></li></Link>
                            {
                              user?(<Link to="/dashboard/manage"><li><a>Dashboard</a></li></Link>):''
                            }
                    </ul>
                </div>
                <div className="navbar-end">
             
          {user ? (
            <div className="nav-item flex items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={`${user.displayName}'s Profile`}
                  className="btn btn-ghost btn-circle avatar"
                />
              ) : (
                <FaUserAlt className="btn btn-ghost btn-circle avatar" />
              )}
              {/* <span className="nav-link mx-2 text-white">
                Welcome, {user.displayName?.split(" ")[0]}!
              </span> */}
              <button
                className="btn bg-teal-600 hover:bg-teal-900 hover:text-slate-200 mx-2 hidden lg:block"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-item flex items-center">
              <Link
                to="/login"
                className="btn bg-teal-600 hover:bg-teal-900 hover:text-slate-200 ml-2"
              >
                Login
              </Link>
            </div>
          )}
             <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
  </div>
  <ul tabIndex={0} className="mt-3 z-[1] shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
    <Link to="/"><li><a>Home</a></li></Link>
    <Link to="/myClicks"><li><a>My Clicks</a></li></Link>
    <Link to="/about"><li><a>About Me</a></li></Link>
    <Link to="/dashboard/manage"><li><a>Dashboard</a></li></Link>
    {user ? (
      <li>
        <a onClick={handleLogOut}> Logout</a>
      </li>
    ) : (
      <Link to="/login">
        <li><a>Login</a></li>
      </Link>
    )}
  </ul>
</div>

        </div>
            </div>

        </div>
    );
};

export default Navbar;