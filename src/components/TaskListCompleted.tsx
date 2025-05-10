import TaskItem from "./TaskItem.tsx";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useState} from "react";

export default function TaskListCompleted() {
    const [isOpened, setIsOpened] = useState(false);
    const toggleClass = () => {
        setIsOpened(!isOpened);
    }

    return (
        <>
            <div onClick={toggleClass} className="min-w-30% w-full">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <span className="bg-transparent px-3 py-1 flex justify-between items-center text-lg">
                        Completed
                        {isOpened ? (
                            <FaChevronUp className="md:hidden"/>
                        ) : <FaChevronDown className="md:hidden"/>}
                    </span>
                    <ul className={isOpened ? "max-h-96 transition-all duration-500 overflow-hidden md:p-1"
                        : "overflow-hidden max-h-0 md:max-h-full transition-all duration-300 md:p-1"}>
                        <TaskItem className="px-2 py-1 transition" status="completed" id={""} title={""}
                                  description={""}/>
                    </ul>
                </div>
            </div>
        </>
    )
}