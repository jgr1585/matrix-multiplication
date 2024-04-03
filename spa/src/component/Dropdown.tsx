type DropdownProps = {
    id: string;
    label: string;
    options: DropdownOption[];
    selected: DropdownOption;
    setSelected: (value: DropdownOption) => void;
}

export type DropdownOption = {
    value: string;
    label: string;
    algo: (index: number) => number;
}


export default function Dropdown({ id, label, options, selected, setSelected }: Readonly<DropdownProps>) {
    return (
        <div id={id} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={label}>
                {options.map((option) => (
                    <li key={option.value}>
                        <button
                            className={
                                "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" +
                                (selected === option ? " bg-blue-50" : "")
                            }
                            onClick={() => setSelected(option)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}