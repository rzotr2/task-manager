import type { TaskItemModel } from "../models/task.ts";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever, MdOutlineDragHandle } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { changeStatus, deleteTask } from "../hooks/service.ts";
import { useTasksStore } from "../hooks/store.ts";
import TaskEditDialog from "./TaskEditDialog.tsx";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";

type TaskItemProps = {
    task: TaskItemModel,
    searchInput: string
} & React.HTMLAttributes<HTMLLIElement>;

export default function TaskItem({task, className, searchInput, ...rest}: TaskItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: `${task.id}`,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const removeTask = useTasksStore(state => state.removeTask);
    const changeStatusLocally = useTasksStore(state => state.changeStatusLocally);
    const handleDelete = () => {
        deleteTask(task.id as string).then(() => removeTask(task.id as string));
    };

    const handleStatusChange = () => {
        const changedTask: TaskItemModel = {...task};

        switch (task.status) {
            case "todo": {
                changedTask.status = "process";
                break;
            } case "process": {
                changedTask.status = "completed";
                break;
            }
        }

        changeStatus(task.id as string, changedTask).then((data) => changeStatusLocally(data.data));
    };

    let computedClass = "";

    switch (task.status) {
        case "todo": {
            computedClass = "bg-gray-100 hover:bg-gray-200 rounded-lg hover:shadow-md ";
            break;
        } case "process": {
            computedClass = "bg-blue-200 hover:bg-blue-300 rounded-lg hover:shadow-md ";
            break;
        } case "completed": {
            computedClass = "bg-green-200 hover:bg-green-300 line-through rounded-lg hover:shadow-md ";
            break;
        }
    }

    return (
        <>
            <li {...rest} className={computedClass + (className || "")}
                ref={setNodeRef} style={style}
            >
                <div>
                    <div className="flex justify-center -mt-2 w-full cursor-grab" {...listeners} {...attributes}>
                        <MdOutlineDragHandle className="text-gray-400" />
                    </div>
                    <div className="flex justify-between pb-2">
                        <div>
                            {task.title.split("").map((char, i) => (
                                searchInput.includes(char.toLowerCase())
                                    ? char !== " " ?
                                        <span className="bg-yellow-200 text-yellow-900" key={i}>{char}</span> : " "
                                    : char
                            ))}
                        </div>
                        <div className="flex gap-1">
                            <a href="#">
                                <TaskEditDialog task={task}>
                                    <BiSolidEdit className="text-2xl text-blue-500 hover:text-blue-700
                                hover:scale-110 hover:bg-gray-200 rounded"/>
                                </TaskEditDialog>
                            </a>
                            <a href="#">
                                <MdDeleteForever onClick={handleDelete}
                                                 className="text-2xl text-red-500 hover:text-red-700
                                hover:scale-110 hover:bg-gray-200 rounded"/>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        {task.description ? (
                            <div>
                                {task.description.split("").map((char: string, i: number) => (
                                    searchInput.includes(char.toLowerCase())
                                        ? char !== " " ?
                                            <span className="bg-yellow-200 text-yellow-900" key={i}>{char}</span> : " "
                                        : char
                                ))}
                            </div>
                        ) : <span className="italic text-sm">No description added yet.</span>}
                        <button className="cursor-pointer" onClick={handleStatusChange}>
                            {task.status === "todo" && (
                                <span className="border-1 text-green-500 rounded-sm flex items-center
                                            text-[14px] px-1 gap-0.5 hover:bg-green-400 hover:text-white">
                                Start
                                <BsFillRocketTakeoffFill className="text-md"/>
                            </span>
                            )}
                            {task.status === "process" && <FaRegSquare className="text-2xl"/>}
                            {task.status === "completed" && <FaRegSquareCheck className="text-2xl text-green-700"/>}
                        </button>
                    </div>
                </div>
            </li>
        </>
    )
}
