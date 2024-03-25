
type ButtonProps = {
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void ;
    children: React.ReactNode;
    className?: string;
}


export default function Button({onclick, children, className}: Readonly<ButtonProps>) {
    return (
        <button
        className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" + className}
        onClick={onclick}>
            {children}
        </button>
    );
}