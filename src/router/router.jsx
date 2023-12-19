import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyClicks from "../pages/MyClicks/MyClicks";
import Main from "../layout/Main";



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
  ]);