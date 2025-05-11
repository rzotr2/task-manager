import { LiaSearchSolid } from "react-icons/lia";

type TaskInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function TaskInput({value, onChange}: TaskInputProps) {
        return (
        <>
            <div className="bg-gray-200 rounded-md max-w-[400px] flex items-center ps-1">
                <input type="text" className="placeholder:italic w-full h-full px-2 py- outline-0"
                       placeholder="Find your tasks..."
                       onChange={(e) => onChange(e.currentTarget.value)}
                       value={value}
                />
                <button
                    className="cursor-pointer bg-gray-300 hover:bg-gray-400 transition-colors duration-300 px-2 rounded-e-md py-1">
                    <LiaSearchSolid className="text-2xl py-0.5"/>
                </button>
            </div>
        </>
    )
}
