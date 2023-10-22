import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Login from "../SharedPages/Login";
import SignUp from "../SharedPages/SignUp/SignUp";
import AuthForm from "../SharedPages/GoogleButton/GoogleButton";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/", element: <Home /> },
            { path: "instructors", element: <Instructors /> },
            { path: "classes", element: <Classes /> },
            { path: "login", element: <Login /> },
            { path: "signUp", element: <SignUp /> },
            { path: "authForm", element: <AuthForm /> },
        ]
    }
])