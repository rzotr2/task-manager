import { MdOutlineAddTask } from "react-icons/md";
import { useTasksStore } from "../hooks/store.ts";
import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";
import React, {useState} from "react";
import type {TaskItemModel} from "../models/task.ts";
import {sendTask} from "../hooks/service.ts";

export default function CreateTaskDialog() {
    const addTask = useTasksStore(state => state.addTask);
    const [titleInputValue, setTitleInputValue] = useState("");
    const [descriptionInputValue, setDescriptionInputValue] = useState("");

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTask: TaskItemModel = {
            "title": titleInputValue,
            "description": descriptionInputValue,
            "status": "todo"
        };

        sendTask(newTask).then(data => addTask(data.data));
        setTitleInputValue("");
        setDescriptionInputValue("");
    }
    const handleTitleInputChange = (e: React.FormEvent<HTMLInputElement>) => setTitleInputValue(e.currentTarget.value);
    const handleDescriptionInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => setDescriptionInputValue(e.currentTarget.value);

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <div className="flex items-center bg-[#238636] hover:brightness-125 text-[#fff] rounded-sm">
                        <button className="cursor-pointer py-1 px-2 flex items-center gap-3">
                            <MdOutlineAddTask className="scale-150"/>
                            <span>New</span>
                        </button>
                    </div>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <form onSubmit={submitForm}>
                        <Dialog.Title>Add new task</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            Another task to your board.
                        </Dialog.Description>

                        <Flex direction="column" gap="3">
                            <label>
                                <span>Title</span>
                                <TextField.Root
                                    onChange={handleTitleInputChange}
                                    placeholder="Enter task name..."
                                />
                            </label>
                            <label>
                                <span>Description</span>
                                <TextArea
                                    onChange={handleDescriptionInputChange}
                                    placeholder="Enter task description..."
                                />
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type="submit">Add</Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>

        </>
    )
}
