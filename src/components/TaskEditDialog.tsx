import { useTasksStore } from "../hooks/store.ts";
import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";
import React, { type ReactNode, useState } from "react";
import type { TaskItemModel } from "../models/task.ts";
import { editTask } from "../hooks/service.ts";

type TaskEditDialogProps = {
    children: ReactNode,
    task: TaskItemModel
}

export default function TaskEditDialog({children, task}: TaskEditDialogProps) {
    const editTaskLocally = useTasksStore(state => state.editTaskLocally);
    const [titleInputValue, setTitleInputValue] = useState(task.title);
    const [descriptionInputValue, setDescriptionInputValue] = useState(task.description);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const editedTask: TaskItemModel = {
            "title": titleInputValue,
            "description": descriptionInputValue,
            "status": task.status
        };

        editTask(task.id as string, editedTask).then(data => editTaskLocally(data.data));
        setTitleInputValue("");
        setDescriptionInputValue("");
    }
    const handleTitleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTitleInputValue(e.currentTarget.value)
    };
    const handleDescriptionInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setDescriptionInputValue(e.currentTarget.value)
    };

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    {children}
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <form onSubmit={submitForm}>
                        <Dialog.Title>Edit task</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            Selected task edit
                        </Dialog.Description>

                        <Flex direction="column" gap="3">
                            <label>
                                <span>Title</span>
                                <TextField.Root
                                    onChange={handleTitleInputChange}
                                    defaultValue={task.title}
                                />
                            </label>
                            <label>
                                <span>Description</span>
                                <TextArea
                                    onChange={handleDescriptionInputChange}
                                    placeholder="Enter task description..."
                                    defaultValue={task.description}
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
                                <Button type="submit">Save</Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}
