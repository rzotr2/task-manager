import axios from 'axios'
import type {TaskItemModel} from "../models/task.ts";

const URL = "https://681f04bec1c291fa6635bbfc.mockapi.io/task";

export const getAllTasks = async () => {
    return await axios.get(URL).then(tasks => tasks);
};

export const sendTask = async (task: TaskItemModel) => {
    return await axios.post(URL, task).then(task => task);
};

export const editTask = async (id: string, task: TaskItemModel) => {
    const idURL = `${URL}/${id}`
    return await axios.put(idURL, task).then(task => task);
};

export const changeStatus = async (id: string, task: TaskItemModel) => {
    const idURL = `${URL}/${id}`
    return await axios.put(idURL, task).then(task => task);
};

export const deleteTask = async (id: string) => {
    const idURL = `${URL}/${id}`
    return await axios.delete(idURL).then(task => task);
};
