import { LineChart } from "@mui/x-charts";
import Button from "./Button";
import NumberInput from "./NumberInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRef } from "react";

type BoxProps = {
    title: string;
    size: number;
    onclick: () => void;
    setSize: (size: number) => void;
    data: number[];
    setData: (data: number[]) => void;
    scaleFactor: number;
    setScaleFactor: (scaleFactor: number) => void;
    calcExpectedGraph: (index: number, scaleFactor: number) => number;
}


const themeLight = createTheme({
    palette: {
        mode: "light"
    }
});

const themeDark = createTheme({
    palette: {
        mode: "dark"
    }
});

const strokeColor = ["#3f51b5", "#f44336"];


export default function Box({ title, onclick, size, setSize, data, setData, scaleFactor, setScaleFactor, calcExpectedGraph }: Readonly<BoxProps>) {

    const isDark = document.documentElement.classList.contains("dark");
    const chartRef = useRef<HTMLElement>(null);

    function calcAverageGraph(data: number[], scaleFactor: number): number[] {
        return data.map((_, index) => calcExpectedGraph(index, scaleFactor))
    }

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
            <div className="flex flex-row space-x-2 mt-1 mr-1">
                <p className="">Scale Factor:</p>
                <NumberInput
                    name="scaleFactor"
                    onChange={(number) => setScaleFactor(number)}
                    value={scaleFactor}
                    step={0.000001}
                    allowNegative={true}
                    onKeyDown={(e) => {}}                />
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
                            color: "#3f51b5",
                            showMark: false
                        }, {
                            data: calcAverageGraph(data, scaleFactor),
                            color: "#f44336",
                            showMark: false
                        }
                    ]}
                    height={600}
                    ref={chartRef}
                />
            </ThemeProvider>
            <div>
                <p>Total: {data.reduce((a, b) => a + b, 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}ms</p>
            </div>


            <div>
                <Button
                    onclick={() => downloadSVG(chartRef.current as HTMLElement, title)}
                >Get SVG</Button>
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

function downloadSVG(svg: HTMLElement, title: string) {
    console.log(svg);
    if (svg) {
        const copySvg = svg.cloneNode(true) as HTMLElement;
        Array.from(copySvg.getElementsByClassName("MuiLineElement-root")).forEach((element, index) => {
            const style = (element as HTMLElement).style;

            style.strokeWidth = "2";
            style.strokeLinejoin = "round";
            style.fill = "none";
            style.stroke = strokeColor[index % strokeColor.length];
            style.webkitTransition = "opacity 0.2s ease-in,stroke 0.2s ease-in";
            style.transition = "opacity 0.2s ease-in,stroke 0.2s ease-in";
            style.opacity = "1";
        });

        Array.from(copySvg.getElementsByClassName("MuiChartsAxis-line")).forEach((element) => {
            const style = (element as HTMLElement).style;

            style.stroke = "#fff";
            style.shapeRendering = "crispEdges";
            style.strokeWidth = "1";
        });

        const element = document.createElement("a");
        element.href = URL.createObjectURL(new Blob([copySvg.outerHTML], { type: "image/svg+xml" }));
        element.download = `${title}.svg`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}