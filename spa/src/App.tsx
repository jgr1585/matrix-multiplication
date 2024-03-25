import { LineChart } from "@mui/x-charts";
import { MatrixControllerApi } from "./api";
import { useState } from "react";
import Button from "./component/Button";
import NumberInput from "./component/NumberInput";

function App() {
    const api = new MatrixControllerApi();
    const [sizeM, setSizeM] = useState<number>(0);
    const [dataM, setDataM] = useState<number[]>([]);
    const [sizeA, setSizeA] = useState<number>(0);
    const [dataA, setDataA] = useState<number[]>([]);

    return (
        <div className="flex flex-row content-center space-x-3 w-full">
            <div className="flex-1 text-gray-900 dark:text-white border-2 border-sky-500 rounded-md">
                <h1>Matrix Multiplication</h1>
                    <div className="flex flex-row space-x-3">
                        <NumberInput
                            name="size"
                            onChange={(number) => setSizeM(number)}
                            value={sizeM}
                        />
                        <Button
                            onclick={() => {
                                let array: (number | null)[] = Array(sizeM + 1).fill(null);
                                for (let i = 0; i <= sizeM; i++) {
                                    api.multiplyMatrix(i).then(result => {
                                        array[i] = (result.data.timeNs / 1000000);
                                        setDataM([...array.filter((value) => value !== null)] as number[]);
                                    });
                                }

                            }}
                        >Generate</Button>
                    </div>
                <LineChart
                    series={[
                        {
                            data: dataM,
                        },
                    ]}
                    height={600}
                />
                <p>Total: {dataM.reduce((a, b) => a + b, 0)}ms</p>
            </div>

            <div className="flex-1 text-gray-900 dark:text-white border-2 border-sky-500 rounded-md">
                <h1>Matrix Addition</h1>
                <div className="flex flex-row space-x-3">
                    <NumberInput
                        className="flex-auto"
                        name="size" 
                        value={sizeA} 
                        onChange={(number) => setSizeA(number)} />
                    <Button
                    className="flex-auto"
                        onclick={() => {
                            let array: (number | null)[] = Array(sizeA + 1).fill(null);
                            for (let i = 0; i <= sizeA; i++) {
                                api.addMatrix(i).then(result => {
                                    array[i] = (result.data.timeNs / 1000000);
                                    setDataA([...array.filter((value) => value !== null)] as number[]);
                                });
                            }
                        }}
                    >Generate</Button>
                </div>

                <LineChart
                    series={[
                        {
                            data: dataA,
                        },
                    ]}
                    height={600}
                    className="text-gray-900 dark:text-white"
                />
                <p>Total: {dataA.reduce((a, b) => a + b, 0)}ms</p>
            </div>
        </div>
    );
}

export default App;
