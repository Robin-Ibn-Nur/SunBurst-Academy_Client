import React, { useState } from 'react';
import useAllClasses from '../../CustomHook/useAllClasses';
import { BsChatRightDots } from 'react-icons/bs'
import { FcApprove, FcDisapprove } from 'react-icons/fc'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

const columns = [
    { name: "COURSE", uid: "course" },
    { name: "INSTRUCTOR", uid: "instructor" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];


import { useForm } from 'react-hook-form'
import useAuth from '../../CustomHook/useAuth';

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};


const AllClasses = () => {
    const { user } = useAuth();
    const { allClass, axiosSecure, refetch } = useAllClasses();
    const [selectedClass, setSelectedClass] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleApprove = async (item) => {
        try {
            setIsLoading(true);


            const response = await axiosSecure.patch(`/classes/approve/${item?._id}`, { status: 'approved' });
            refetch()
            // console.log(`Approving class with ID: ${item?._id}`);
            // console.log('Response:', response.data);

            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeny = async (item) => {
        try {
            setIsLoading(true);


            const response = await axiosSecure.patch(`/classes/denied/${item?._id}`, { status: 'denied' });
            refetch()
            // console.log(`Denying class with ID: ${item?._id}`);
            // console.log('Response:', response.data);

            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onSubmit = async (data) => {

        try {
            setIsLoading(true);


            const response = await axiosSecure.post(`/classes/feedback/${selectedClass._id}`, {
                feedback: data.feedback,
            });
            if (response.data.updateResult.acknowledged === "true") {
                console.log("yes update successfull");
            }
            console.log('Sending feedback:', data.feedback);


            setIsLoading(false);
            reset();
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onClose = () => {
        setSelectedClass(null);
    };


    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "course":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: item?.classImage }}
                        description={item?.className}
                        name={cellValue}
                    >
                        {/* {item?.instructorName} */}
                    </User>
                );
            case "instructor":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{item?.instructorName}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[item.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Approve">
                            <Button onClick={() => handleApprove(item)} isIconOnly size="sm" variant="light" >
                                <FcApprove color="default" size={16} />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Deny">
                            <Button onClick={() => handleDeny(item)} isIconOnly size="sm" variant="light" >
                                <FcDisapprove color="default" size={16} />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Feedback">
                            <Button onPress={onOpen} isIconOnly size="sm" variant="light" >
                                <BsChatRightDots color="green" size={16} />
                            </Button>
                        </Tooltip>

                    </div>

                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table className='container mx-auto py-5' aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={allClass}>
                    {allClass.map((item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    // endContent={
                                    //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <Input
                                    // endContent={
                                    //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                />
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link color="primary" href="#" size="sm">
                                        Forgot password?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

        // <div className="">
        //     <h3 className="text-2xl text-center mb-5 uppercase font-bold">{user?.displayName}</h3>
        //     <div>
        //         <h1 className="text-center text-2xl font-semibold font-serif my-10 underline">{allClass.length === 0 ? "Opps! No Classes Added" : "Available Classes"}</h1>
        //     </div>
        //     {
        //         allClass.length > 0 && <table className="container mx-auto overflow-x-auto table-auto w-full border-collapse border border-gray-300 font-serif">
        //             <thead className="text-sm tracking-tighter">
        //                 <tr className="bg-gray-200">
        //                     {tableHeaders.map((header) => (
        //                         <th key={header.id}>{header.name}</th>
        //                     ))}
        //                 </tr>
        //             </thead>
        //             <tbody className="text-center tracking-tighter">
        //                 {allClass.map((classItem) => (
        //                     <tr key={classItem._id} >
        //                         <td>
        //                             <img src={classItem.classImage} alt="Class" className="w-10 h-10" />
        //                         </td>
        //                         <td>{classItem.className}</td>
        //                         <td>{classItem.instructorName}</td>
        //                         <td>{classItem.instructorEmail}</td>
        //                         <td>{classItem.availableSeats}</td>
        //                         <td>{classItem.price}</td>
        //                         <td>{classItem.status}</td>
        //                         <td className="flex space-x-2 space-y-2 items-center">
        //                             <button className={classItem.status === "approved" ? "btn btn-outline btn-xs" : "btn btn-outline hover:btn-success btn-xs"}
        //                                 onClick={() => handleApprove(classItem._id)}
        //                                 disabled={classItem.status !== "pending"}
        //                             >
        //                                 Approve
        //                             </button>
        //                             <button className={classItem.status === "denied" ? "btn btn-outline btn-xs btn-error" : "btn btn-outline hover:btn-error btn-xs"}
        //                                 onClick={() => handleDeny(classItem._id)}
        //                                 disabled={classItem.status !== "pending"}
        //                             >
        //                                 Deny
        //                             </button>
        //                             <button className="btn btn-outline hover:btn-warning btn-xs" onClick={() => setSelectedClass(classItem)}>Send Feedback</button>
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     }

        //     {selectedClass && (
        //         <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        //             <div className="bg-white p-4 rounded">
        //                 <h2>Send Feedback</h2>
        //                 <p>Class: {selectedClass.className}</p>
        //                 <form onSubmit={handleSubmit(onSubmit)}>
        //                     <textarea
        //                         {...register("feedback")}
        //                         placeholder="Enter your feedback"
        //                         className="w-full h-42"
        //                     ></textarea>
        //                     <div className="flex justify-between mt-4">
        //                         <button
        //                             type="submit"
        //                             className="bg-blue-500 text-white px-4 py-2 rounded"
        //                             disabled={isLoading}
        //                         >
        //                             {isLoading ? "Sending..." : "Send"}
        //                         </button>
        //                         <button
        //                             type="button"
        //                             onClick={onClose}
        //                             className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        //                             disabled={isLoading}
        //                         >
        //                             Cancel
        //                         </button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     )}
        // </div>


    );
}

export default AllClasses;