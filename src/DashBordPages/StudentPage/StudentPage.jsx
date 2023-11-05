import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EyeIcon } from "./Icons/EyeIcon";
import { columns } from "./data";
import useSelectedClass from "../../CustomHook/useSelectedClass";
import Swal from "sweetalert2";
import { MdPayment } from 'react-icons/md'

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function StudentPage() {
    const { user, selectedClasses, refetch, axiosSecure, isLoading, isError } = useSelectedClass();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/selectedClasses/${id}`);
                    console.log("data ki gese: ", res.data);
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Your Selected Course has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.log("error message: ", error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: `<a href="">${error.message}</a>`
                    })
                }
            }
        });
    }
    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "course name":
                return (
                    <User
                        avatarProps={{
                            radius: "lg", src: item?.classImage
                        }}
                        description={item?.className}
                        name={cellValue}
                    >
                        {item?.className}
                    </User>
                );
            case "instructor name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{item?.instructorName}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[item?.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Pay">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <MdPayment color="gray" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete item">
                            <span onClick={() => handleDelete(item?._id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table className="container mx-auto h-100 my-5" aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={selectedClasses}>
                {selectedClasses.map((item) => (
                    <TableRow key={item?._id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
