import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
      ],
    },
  ]);