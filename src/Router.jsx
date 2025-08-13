import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css"
import Home from "./pages/Home";
import First from "./pages/First";

const router = createBrowserRouter([
    {
        path : "/",
        element: <First/>,
        children : [
            {
                index: true,
                element : <Home/>
            }

        ]
    }
]);


function Router() {
  return (
    <RouterProvider router={router}/>
  )
};

export default Router;