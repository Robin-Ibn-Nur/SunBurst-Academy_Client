import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";


export default function App() {

    return (
        <div>
            <NavLink
                className={({ isActive, isPending }) =>
                    isActive ? "text-orange-500 " : isPending && "p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 backdrop-sepia-0 bg-white/30 max-w-[300px] overflow-visible shadow-small rounded-medium"
                }
                to="/dashboard/student"
            >
                Student
            </NavLink>
        </div>
    );
}
