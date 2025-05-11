import { create } from 'zustand';
import type { TaskItemModel } from "../models/task.ts";

type TasksState = {
    tasks: TaskItemModel[];
    updateTasks: (newTasks: TaskItemModel[]) => void;
    addTask: (newTask: TaskItemModel) => void;
    editTaskLocally: (editedTask: TaskItemModel) => void;
    changeStatusLocally: (taskToChange: TaskItemModel) => void;
    removeTask: (id: string) => void;
}

const filterArr = (id: string, arr: TaskItemModel[]) => {
    return arr.filter((task: TaskItemModel) => task.id !== id);
}

export const useTasksStore = create<TasksState>()((set) => ({
    tasks: [],
    updateTasks: (newTasks: TaskItemModel[]) => set({ tasks: newTasks}),
    addTask: (newTask: TaskItemModel) => set((state) => ({ tasks: [...state.tasks, newTask] })),
    editTaskLocally: (editedTask: TaskItemModel) => set((state) => ({
        tasks: state.tasks.map(task => task.id === editedTask.id ? editedTask : task)
    })),
    changeStatusLocally: (taskToChange: TaskItemModel) => {
        set(state => (
            {tasks: state.tasks.map(task => task.id === taskToChange.id ? taskToChange : task)}))
    },
    removeTask: (id: string) => set((state) => ({ tasks: filterArr(id, state.tasks)})),
}));
