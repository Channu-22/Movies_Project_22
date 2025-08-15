import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Home from "./pages/Home";
import First from "./pages/First";
import Single from "./pages/Single";
import Movie from "./pages/Movie";
import TV from "./pages/TV";

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
        path: "/movie/:id",
        element: <Single />,
      },
      {
        path: "/tv/:id",
        element: <Single />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;