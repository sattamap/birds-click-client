import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyClicks from "../pages/MyClicks/MyClicks";
import Main from "../layout/Main";
import Dashboard from "../layout/Dashboard";
import AddBirds from "../pages/DashBoard/Admin/AddBirds/AddBirds";
import Login from "../pages/Login/Login";
import ManageItems from "../pages/DashBoard/Admin/ManageItems/ManageItems";
import UpdateItems from "../pages/DashBoard/Admin/UpdateItems/UpdateItems";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "myCLicks",
          element: <MyClicks></MyClicks>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
   
      ],
    },
    {
      path: "dashboard",
      element:<Dashboard></Dashboard> ,
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
              loader: ({params})=> fetch(`http://localhost:5000/bird/${params.id}`)
      
            }
        
      ]
    }
  ]);