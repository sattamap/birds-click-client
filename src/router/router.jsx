import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyClicks from "../pages/MyClicks/MyClicks";
import Main from "../layout/Main";
import Dashboard from "../layout/Dashboard";
import AddBirds from "../pages/DashBoard/Admin/AddBirds/AddBirds";



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
            // {
            //   path: 'editTask/:id',
            //   element:<EditTask></EditTask>,
            //   loader: ({params})=> fetch(`https://tmp-server-teal.vercel.app/tasks/${params.id}`)
      
            // }
        
      ]
    }
  ]);