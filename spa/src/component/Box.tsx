import { LineChart } from "@mui/x-charts";
import Button from "./Button";
import NumberInput from "./NumberInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type BoxProps = {
    title: string;
    size: number;
    onclick: () => void;
    setSize: (size: number) => void;
    data: number[];
    setData: (data: number[]) => void;
}


const themeLight = createTheme({
    palette: {
        background: {
            default: "#e4f0e2"
        }
    }
});

const themeDark = createTheme({
    palette: {
        background: {
            default: "#222222"
        },
        text: {
            primary: "#ffffff"
        }
    }
});
export default function Box({ title, onclick, size, setSize, data, setData }: Readonly<BoxProps>) {

    const isDark = document.documentElement.classList.contains("dark");

    return (
        <div className="flex-1 text-gray-900 dark:text-white border-2 border-sky-500 rounded-md">
            <h1>{title}</h1>
            <div className="flex flex-row space-x-3">
                <NumberInput
                    name="size"
                    onChange={(number) => setSize(number)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onclick();
                        }
                    }}
                    value={size}
                />
                <Button
                    onclick={onclick}
                >Generate</Button>
            </div>
            <ThemeProvider theme={isDark ? themeLight : themeDark}>
                <LineChart
                    xAxis={[{
                        label: "Size",
                        data: Array.from({ length: data.length }, (_, i) => i)
                    }]}
                    yAxis={[{
                        label: "Time (ms)",
                        data: Array.from({ length: data.length }, (_, i) => i)
                    }]}
                    series={[
                        {
                            data: data,
                            color: "#3f51b5"
                        }
                    ]}
                    height={600}
                />
            </ThemeProvider>
            <p>Total: {data.reduce((a, b) => a + b, 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}ms</p>

            <div>
                <Button
                    onclick={() => {
                        const element = document.createElement("a");
                        element.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
                        element.download = `${title}.json`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                    }}
                >Download</Button>
                <Button
                    onclick={() => {
                        const element = document.createElement("input");
                        element.type = "file";
                        element.accept = ".json";
                        element.onchange = () => {
                            const file = element.files?.item(0);
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    const result = JSON.parse(reader.result as string);
                                    setData(result);
                                }
                                reader.readAsText(file);
                            }
                        }
                        element.click();
                    }}
                >Upload</Button>
            </div>
        </div>
    );
}