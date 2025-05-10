import type { TaskItem } from "../models/task.ts";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

type TaskItemProps = TaskItem & React.HTMLAttributes<HTMLLIElement>;

export default function TaskItem({status, className, ...rest}: TaskItemProps) {
    let computedClass = "";

    switch (status) {
        case "todo": {
            computedClass = "bg-gray-200 hover:bg-gray-300 md:rounded-lg ";
            break;
        } case "process": {
            computedClass = "bg-blue-200 hover:bg-blue-300 md:rounded-lg ";
            break;
        }
        case "completed": {
            computedClass = "bg-green-200 hover:bg-green-300 line-through md:rounded-lg ";
            break;
        }
    }

    return (
        <>
            <li {...rest} className={computedClass + className}>
                <div className="flex justify-between">
                    <span className="block font-semibold text-md">Title</span>
                    <div className="flex">
                        <a href="#">
                            <BiSolidEdit className="text-2xl text-blue-500 hover:text-blue-700 hover:scale-125" />
                        </a>
                        <a href="#">
                            <MdDeleteForever className="text-2xl text-red-500 hover:text-red-700 hover:scale-125" />
                        </a>
                    </div>
                </div>
                {/*if !description - "Add your description"*/}
                <span>Iure iusto minus mollitia neque nostrum optio perferendis, suscipit totam velit!</span>
            </li>
        </>
    )
}
