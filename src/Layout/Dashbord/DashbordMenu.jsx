// import React from 'react';
// import useInstructor from '../../CustomHook/useInstructor';
// import useAdmin from '../../CustomHook/useAdmin';
// import useStudent from '../../CustomHook/useStudent';
// import { Link, NavLink } from 'react-router-dom';
// import { AiOutlineHome, AiOutlineSelect } from "react-icons/ai"

// const DashbordMenu = () => {
//     const [isInstructor] = useInstructor();
//     const [isAdmin] = useAdmin();
//     const [isStudent] = useStudent();
//     return (

//     );
// };

// export default DashbordMenu;
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { IconWrapper } from "./IconWrapper";
// import { ItemCounter } from "./ItemCounter";
// import { BugIcon } from "./BugIcon";
// import { PullRequestIcon } from "./PullRequestIcon";
// import { ChatIcon } from "./ChatIcon";
// import { PlayCircleIcon } from "./PlayCircleIcon";
// import { LayoutIcon } from "./LayoutIcon";
// import { TagIcon } from "./TagIcon";
// import { UsersIcon } from "./UsersIcon";
// import { WatchersIcon } from "./WatchersIcon";
// import { BookIcon } from "./BookIcon";
// import { ChevronRightIcon } from "./ChevronRightIcon";

export default function App() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["student"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );
    return (
        <Listbox
            aria-label="User Menu"
            // onAction={(key) => alert(key)}
            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 backdrop-sepia-0 bg-white/30  max-w-[300px] overflow-visible shadow-small rounded-medium"
            itemClasses={{
                base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
            }}
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <ListboxItem
                key="Student"
                textValue="Student"
                className="flex items-center justify-center"

            // endContent={<ItemCounter number={13} />}
            // startContent={
            //     <IconWrapper className="bg-success/10 text-success">
            //         <BugIcon className="text-lg " />
            //     </IconWrapper>
            // }
            >
                <NavLink className={({ isActive, isPending }) => isActive ? "text-orange-500 " : isPending && ""} to="/dashbord/student">Student</NavLink>
            </ListboxItem>
        </Listbox>
    );
}
