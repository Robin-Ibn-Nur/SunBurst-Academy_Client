import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

export default function Classes({ item }) {
    const { className, classImage, status, enrolledStudents, feedback } = item;
    return (

        <Card isFooterBlurred className="w-full h-auto">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <h4 className="text-white/90 font-medium text-xl">{feedback ? feedback : "Waiting for feedback"}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={classImage}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                        <p className="text-tiny text-white/60">Course Name: {className}</p>
                        <p className="text-tiny text-white/60">Status: {status}</p>
                        <p className="text-tiny text-white/60">Total enrolled Students: {enrolledStudents ? enrolledStudents : 0}</p>
                    </div>
                </div>
                <Button radius="full" size="sm">Update</Button>
            </CardFooter>
        </Card>

    );
}
