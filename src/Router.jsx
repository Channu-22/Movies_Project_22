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
import ContactForm from "./pages/Contact";
import SearchResults from "./pages/SearchResults";

/**
 * <Route path="/search" element={<SearchResults />} />
 * 
 */

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

        path:"/contact",
        element:<ContactForm/>

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
        path:"/search",
        element:<SearchResults />

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