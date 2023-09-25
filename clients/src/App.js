import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Homepage from "./pages/home/Homepage";
import Login from './pages/login/Login'
import AuthProvider from "./pages/login/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><Homepage /></AuthProvider>,
  },
  {
    path: "/signup",
    element: <Login create />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
