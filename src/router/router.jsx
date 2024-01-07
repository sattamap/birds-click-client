import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyClicks from "../pages/MyClicks/MyClicks";
import Main from "../layout/Main";
import Dashboard from "../layout/Dashboard";
import AddBirds from "../pages/DashBoard/Admin/AddBirds/AddBirds";
import Login from "../pages/Login/Login";
import ManageItems from "../pages/DashBoard/Admin/ManageItems/ManageItems";
import UpdateItems from "../pages/DashBoard/Admin/UpdateItems/UpdateItems";
import PrivateRoutes from "./PrivateRoutes";
import Details from "../pages/Deatils/Details";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "myCLicks",
          element: <MyClicks></MyClicks>,
        },
        {
          path: "details/:id",
          element: <Details></Details>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "contact",
          element: <Contact></Contact>,
        },
   
      ],
    },
    {
      path: "dashboard",
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes> ,
      children: [
          {
              path: "addBirds",
              element:<AddBirds></AddBirds>,
            },
          {
              path: "manage",
              element:<ManageItems></ManageItems>,
            },
            {
              path: 'updateItem/:id',
              element:<UpdateItems></UpdateItems>,
              loader: ({params})=> fetch(`https://birds-click-server.vercel.app/birds/${params.id}`)
      
            }
        
      ]
    }
  ]);