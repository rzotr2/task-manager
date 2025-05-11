import TaskItem from "./TaskItem.tsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { TaskItemModel } from "../models/task.ts";

type TaskListCompletedProps = {
    tasks: TaskItemModel[];
    search: string,
    activeTaskId: string
}

export default function TaskListCompleted({tasks, search, activeTaskId}: TaskListCompletedProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable-completed',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    const [isOpened, setIsOpened] = useState(false);
    const toggleClass = () => {
        setIsOpened(!isOpened);
    };

    const completedTasks = tasks.filter(task =>
        task.status === "completed" &&
        (
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description?.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <>
            <div className="min-w-30% w-full rounded-xl hover:shadow-lg transition cursor-pointer md:cursor-default"
                 ref={setNodeRef} style={style}
            >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <span onClick={toggleClass} className="bg-transparent px-3 py-1 flex justify-between items-center text-lg">
                        Completed
                        {isOpened ? (
                            <FaChevronUp className="md:hidden" />
                        ) : <FaChevronDown className="md:hidden" />}
                    </span>
                    {completedTasks.length ? (
                        <SortableContext items={completedTasks.map(task => task.id as string)}>
                            <ul className={isOpened ?
                                "max-h-96 md:max-h-full px-2 overflow-scroll md:overflow-visible transition-all duration-500 md:p-1 flex flex-col gap-2 last:mb-1"
                                : "max-h-0 md:max-h-full overflow-hidden md:overflow-visible transition-all duration-300 md:p-1 flex flex-col gap-2"}>
                                {completedTasks.map(task =>
                                    (activeTaskId === task.id) ? null : (
                                        <TaskItem className="px-3 py-3 transition"
                                                  task={task}
                                                  key={task.id}
                                                  searchInput={search}
                                        />
                                    ))
                                }
                            </ul>
                        </SortableContext>
                    ): (
                        <p className="p-4 text-center">There are no completed tasks</p>
                    )}
                </div>
            </div>
        </>
    )
}