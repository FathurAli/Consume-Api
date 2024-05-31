import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Stuff from "./pages/stuff";
import StuffTrash from "./pages/stufftrash";
import User from "./pages/users";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login />  }, 
    { path: '/profile', element: <Profile />},
    { path: '/stuffs', element: <Stuff />},
    { path: '/stuffs/trash', element: <StuffTrash/>},
    { path: '/users', element: <User />}
    
])