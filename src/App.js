import Layout from './components/Layout/Layout.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from './pages/Admin';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/index.js';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "admin",
          element: <Admin />,
        },
        {
          path: "dashboard",
          element: <Dashboard />
        }
      ],
    },
  ]);
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}
export default App;
