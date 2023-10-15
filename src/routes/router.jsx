import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AddCoffee from "../pages/AddCoffee";
import UpdateCoffee from "../pages/UpdateCoffee";
import DisplayCoffee from "../pages/DisplayCoffee";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addCoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "/updateCoffee/:id",
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/coffee/${params.id}`
          ),
        element: <UpdateCoffee></UpdateCoffee>,
      },
      {
        path: "/displayCoffee",
        element: <DisplayCoffee></DisplayCoffee>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <Users></Users>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
