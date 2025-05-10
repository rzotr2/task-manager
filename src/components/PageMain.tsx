import TaskInput from "./TaskInput.tsx";
import TaskCreateButton from "./TaskCreateButton.tsx";
import TaskListTodo from "./TaskListTodo.tsx";
import TaskListCompleted from "./TaskListCompleted.tsx";
import TaskListProcess from "./TaskListProcess.tsx";

export default function PageMain() {

    return (
        <>
            <div className="h-full grow-1 px-10 py-5">
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-700 text-[1.2rem] font-medium">My tasks</span>
                        <TaskCreateButton />
                    </div>
                    <div>
                        <TaskInput />
                    </div>
                </div>
                <div className="flex w-full gap-3 md:flex-nowrap flex-wrap">
                    <TaskListTodo />
                    <TaskListProcess />
                    <TaskListCompleted />
                </div>
            </div>
        </>
    )
}
