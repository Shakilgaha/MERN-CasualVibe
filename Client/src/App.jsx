import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { Home } from "./pages/Home"
import { Contact } from "./pages/Contact"
import { About } from "./pages/About"
import { Products } from "./pages/Products"
import { Cart } from "./pages/Cart"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Error } from "./components/UI/Error"
import { AdminD } from "./components/layout/AdminD"
import { Profile } from "./pages/Profile"
import { Logout } from "./pages/Logout"
import { AdminProducts } from "./components/admin/Admin-Products"
import { AdminUsers } from "./components/admin/Admin-Users"
import { AdminContactMessage } from "./components/admin/Admin-Contact-Message"
import { AdminOrders } from "./components/admin/Admin-Orders"
import { SingleProductPage } from "./components/UI/SingleProductPage"
import { OrderPage } from "./components/UI/OrderPage"
import { OrderConfirmed } from "./components/UI/OrderConfirm"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/product",
          element: <Products />,
        },
        {
          path: "/product/view/:id",
          element: <SingleProductPage />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/order",
          element: <OrderPage />,
        },
        {
          path : "/orderConfirm" ,
          element : <OrderConfirmed/>
        },
        {
          path: "/contact",
          element: <Contact />
        },

        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/logout",
          element: <Logout />
        },
        {
          path: "/admin",
          element: <AdminD />,
          children: [
            {
              path: "",
              element: <AdminProducts />
            },
            {
              path: "users",
              element: <AdminUsers />
            },
            {
              path: "message",
              element: <AdminContactMessage />
            },
            {
              path: "orders",
              element: <AdminOrders />
            },

          ]
        },
        {
          path: "*",
          element: <Error />
        },

      ]
    }
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
