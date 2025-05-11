import TaskInput from "./TaskInput.tsx";
import CreateTaskDialog from "./CreateTaskDialog.tsx";
import TaskListTodo from "./TaskListTodo.tsx";
import TaskListCompleted from "./TaskListCompleted.tsx";
import TaskListProcess from "./TaskListProcess.tsx";
import { useState } from "react";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import TaskItem from "./TaskItem.tsx";
import { useTasksStore } from "../hooks/store.ts";
import type { TaskItemModel } from "../models/task.ts";
import { editTask } from "../hooks/service.ts";
import { arrayMove } from "@dnd-kit/sortable";


type StatusString = TaskItemModel["status"];

export default function PageMain() {
    const [inputValue, setInputValue] = useState("");
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const tasks = useTasksStore(state => state.tasks);
    const updateTasks = useTasksStore(state => state.updateTasks);
    const editTaskLocally = useTasksStore(state => state.editTaskLocally);
    const activeTask = tasks.find(task => task.id === activeTaskId);

    const todoTasks = tasks.filter(task => task.status === "todo");
    const processTasks = tasks.filter(task => task.status === "process");
    const completedTasks = tasks.filter(task => task.status === "completed");

    return (
        <>
            <div className="h-full grow-1 px-10 py-5">
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-700 text-[1.2rem] font-medium">My tasks</span>
                        <CreateTaskDialog />
                    </div>
                    <div>
                        <TaskInput onChange={setInputValue} value={inputValue} />
                    </div>
                </div>
                <DndContext
                    onDragStart={event => {
                        setActiveTaskId(event.active.id as string);
                    }}
                    onDragEnd={event => {
                        const { active, over } = event;
                        setActiveTaskId(null);
                        if (!over) return;

                        const isOverColumn = over.id.toString().startsWith("droppable-");
                        const newStatus: StatusString = isOverColumn
                            ? over.id.toString().replace("droppable-", "") as StatusString
                            : tasks.find(t => t.id === over.id)?.status || "todo";

                        const activeTask = tasks.find(t => t.id === active.id);
                        if (!activeTask) return;
                        const oldStatus = activeTask.status;

                        const newColumnTasks = tasks
                            .filter(t => t.status === newStatus && t.id !== active.id);

                        // Визначаємо індекс вставки
                        let globalNewIndex: number;
                        if (isOverColumn) {
                            if (newColumnTasks.length === 0) {
                                globalNewIndex = tasks.length;
                            } else {
                                const lastTaskId = newColumnTasks[newColumnTasks.length - 1].id;
                                globalNewIndex = tasks.findIndex(t => t.id === lastTaskId) + 1;
                            }
                        } else {
                            const targetId = over.id as string;
                            globalNewIndex = tasks.findIndex(t => t.id === targetId);
                        }

                        const globalOldIndex = tasks.findIndex(t => t.id === active.id);

                        if (oldStatus === newStatus) {
                            const newTasks = arrayMove(tasks, globalOldIndex, globalNewIndex);
                            updateTasks(newTasks);
                        } else {
                            const changedTask: TaskItemModel = { ...activeTask, status: newStatus };
                            editTaskLocally(changedTask);
                            editTask(activeTask.id as string, changedTask).then(data => data)

                            const newTasks = tasks.filter(t => t.id !== active.id);
                            newTasks.splice(globalNewIndex, 0, changedTask);
                            updateTasks(newTasks);
                        }
                    }}
                >
                    <div className="flex w-full gap-3 md:flex-nowrap flex-wrap items-start">
                        <TaskListTodo
                            tasks={todoTasks}
                            search={inputValue}
                            activeTaskId={activeTaskId as string}
                        />
                        <TaskListProcess
                            tasks={processTasks}
                            search={inputValue}
                            activeTaskId={activeTaskId as string}
                        />
                        <TaskListCompleted
                            tasks={completedTasks}
                            search={inputValue}
                            activeTaskId={activeTaskId as string}
                        />
                    </div>
                    <DragOverlay>
                        {activeTask ? (
                            <TaskItem
                                className="shadow-2xl opacity-90 pointer-events-none px-3 py-3 transition overflow-hidden"
                                task={activeTask}
                                searchInput={inputValue}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </>
    )
}
