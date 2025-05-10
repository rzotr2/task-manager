import { MdOutlineAddTask } from "react-icons/md";

export default function TaskCreateButton() {

    return (
        <>
            <div className="flex items-center bg-[#238636] hover:brightness-125 text-[#fff] rounded-sm">
                <button className="cursor-pointer py-1 px-2 flex items-center gap-3">
                    <MdOutlineAddTask className="scale-150" />
                    <span>New</span>
                </button>
            </div>
        </>
    )
}
