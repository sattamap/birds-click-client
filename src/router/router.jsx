import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyClicks from "../pages/MyClicks/MyClicks";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    //   children: [
    //     {
    //       path: "/",
    //       element: <Home></Home>,
    //     },
    //   ],
    },
    {
      path: "/myCLicks",
      element: <MyClicks></MyClicks>,
 
    },
  ]);