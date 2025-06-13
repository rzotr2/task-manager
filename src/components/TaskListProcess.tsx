import TaskItem from "./TaskItem.tsx";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import { useState } from "react";
import {useDroppable} from "@dnd-kit/core";
import {SortableContext} from "@dnd-kit/sortable";
import type {TaskItemModel} from "../models/task.ts";

type TaskListProcessProps = {
    tasks: TaskItemModel[];
    search: string,
    activeTaskId: string,
    isMobile: boolean
}

export default function TaskListProcess({tasks, search, activeTaskId, isMobile}: TaskListProcessProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable-process',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    const [isOpened, setIsOpened] = useState(false);
    const toggleClass = () => {
        setIsOpened(!isOpened);
    };

    const processTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="min-w-30% w-full rounded-xl hover:shadow-lg transition cursor-pointer md:cursor-default grow-0"
                 ref={setNodeRef} style={style}
            >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <span onClick={toggleClass} className="bg-transparent px-3 py-1 flex justify-between items-center text-lg">
                        In process
                        {isOpened ? (
                            <FaChevronUp className="md:hidden" />
                        ) : <FaChevronDown className="md:hidden" />}
                    </span>
                    {processTasks.length ? (
                        <SortableContext items={processTasks.map(task => task.id as string)}>
                            <ul className={isOpened ?
                                "max-h-96 md:max-h-[65vh] px-1 md:px-2 [scrollbar-width:thin] overflow-y-auto md:overflow-visible transition-all duration-500 md:p-1 flex flex-col gap-2 last:mb-1"
                                : "max-h-0 md:max-h-[65vh] md:px-2 [scrollbar-width:thin] overflow-hidden md:overflow-y-auto transition-all duration-300 md:p-1 flex flex-col gap-2"}>
                                {processTasks.map(task =>
                                    (activeTaskId === task.id) ? null : (
                                        <TaskItem className="px-3 py-3 transition"
                                                  task={task}
                                                  key={task.id}
                                                  searchInput={search}
                                                  isMobile={isMobile}
                                        />
                                    ))
                                }
                            </ul>
                        </SortableContext>
                    ): (
                        <p className="p-4 text-center">There are no tasks in process</p>
                    )}
                </div>
            </div>
        </>
    )
}
