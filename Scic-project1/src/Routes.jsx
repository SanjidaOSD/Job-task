import { createBrowserRouter } from "react-router-dom";
import Main from "./Route/Main";
import Home from "./Route/Home";
import Login from "./Route/Login";
import SignUp from "./SignUp";
import Products from "./Route/Products";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/login',
            element: <Login></Login>,
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
        {
          path:'/products',
          element: <Products/>
      }
      ]
    },
  ]);
  export default router;