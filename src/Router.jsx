import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Home from "./pages/Home";
import First from "./pages/First";
import Single from "./pages/Single";
import Movie from "./pages/Movie";
import TV from "./pages/TV";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./slices/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,

      },
      {
        path:"/movies",
        element: <Movie/>
      },
      {
        path: "/tv",
        element: <TV/>,
      },
      {
        path:"/login",
        element:<Login/>
        
      },
      {
        path:"/register",
        element:<Register/>
      }
      ,
      {
        path: "/movie/:id",
        element: (
          <ProtectedRoute>
            <Single/>
           </ProtectedRoute>
        ),
      },
      {
        path: "/tv/:id",
        element: (
          <ProtectedRoute>
            <Single/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function Router() {
  return  (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>);
}

export default Router;