import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Login from "../SharedPages/Login";
import SignUp from "../SharedPages/SignUp/SignUp";
import AuthForm from "../SharedPages/GoogleButton/GoogleButton";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashbord from "../Layout/Dashbord/Dashbord";
import StudentPage from "../DashBordPages/StudentPage/StudentPage";
import Instructor from "../DashBordPages/StudentPage/Instructor/Instructor";
import Admin from "../DashBordPages/AdminPage/Admin";
import AllClasses from "../DashBordPages/AdminPage/allClasses";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "instructors", element: <Instructors /> },
            { path: "classes", element: <Classes /> },
            { path: "login", element: <Login /> },
            { path: "signUp", element: <SignUp /> },
            { path: "authForm", element: <AuthForm /> },
            { path: "student", element: <StudentPage /> },
            { path: "admin", element: <Admin /> },
            { path: "allClasses", element: <AllClasses /> },
        ]
    },
    {
        path: "dashbord",
        element: <Dashbord />,
        children: [
            // payment route
            // {
            //     path: "payment/:id",
            //     loader: async ({ params }) => await fetch(`https://server-liard-one.vercel.app/dashbord/payment/${params.id}`),
            //     element: <Payment></Payment>
            // },
            // student dashbord
            // {
            //     path: "student",
            //     element: <StudentPage />
            // },
            // {
            //     path: "myEnrolledClass",
            //     element: <StudentRoute><MyEnrolledClasses></MyEnrolledClasses></StudentRoute>
            // },
            // {
            //     path: "payMentHistory",
            //     element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
            // },
            // instructor dashbord
            { path: "instructor", element: <Instructor /> },
            // {
            //     path: "addClass",
            //     element: <InstructorRoute><AddClasses></AddClasses></InstructorRoute>
            // },
            // {
            //     path: "myClasses",
            //     element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            // },

            // admin dashbord
            // {
            //     path: "manageClasses",
            //     element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            // },
            // {
            //     path: "manageUsers",
            //     element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            // }
        ]
    }
])