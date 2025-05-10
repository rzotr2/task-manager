export type TaskItem = {
    id: string,
    title: string,
    description?: string,
    status: "todo" | "process" | "completed"
}
