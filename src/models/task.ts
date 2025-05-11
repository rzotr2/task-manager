export type TaskItemModel = {
    id?: string,
    title: string,
    description?: string,
    status: "todo" | "process" | "completed"
}
