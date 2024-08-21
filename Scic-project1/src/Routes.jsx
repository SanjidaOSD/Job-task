import { createBrowserRouter } from "react-router-dom";
import Main from "./Route/Main";
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
            element: <Products/>
        },
        {
            path:'/login',
            element: <Login></Login>,
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
      ]
    },
  ]);
  export default router;