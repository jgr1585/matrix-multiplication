type NumberInputProps = {
    name: string;
    onChange: (value: number) => void;
    value: number;
    className?: string;
}

export default function NumberInput({name, onChange, value, className}: NumberInputProps) {
    return (
        <input 
            type="number"
            name={name}
            onChange={(event) => onChange(Number(event.target.value))} 
            value={value}
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + className} 
        />
    );
}