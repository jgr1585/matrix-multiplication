
import { MatrixControllerApi } from "./api";
import { useState } from "react";
import Box from "./component/Box";

function executeAsync(func: () => void){
    setTimeout(func, 0);
}

function App() {
    const api = new MatrixControllerApi();
    const [sizeM, setSizeM] = useState<number>(0);
    const [dataM, setDataM] = useState<number[]>([]);
    const [sizeA, setSizeA] = useState<number>(0);
    const [dataA, setDataA] = useState<number[]>([]);
    const [scaleFactorM, setScaleFactorM] = useState<number>(0.00001);
    const [scaleFactorA, setScaleFactorA] = useState<number>(0.00003);


    return (
        <div className="flex flex-row content-center space-x-3 w-full">
            <Box
                title="Matrix Multiplication"
                size={sizeM}
                setSize={setSizeM}
                onclick={() => {
                    let array: (number | null)[] = [...dataM, ...Array(sizeM + 1 - dataM.length).fill(null)];
                    executeAsync(async () => {
                        for (let i = dataM.length; i <= sizeM; i++) {
                            const request = await api.multiplyMatrix(i);
                            array[i] = (request.data.timeNs / 1000000);
                            setDataM([...array.filter((value) => value !== null)] as number[]);
                        }
                    });
                }}
                data={dataM}
                setData={setDataM}
                scaleFactor={scaleFactorM}
                setScaleFactor={setScaleFactorM}
                calcExpectedGraph={(index: number, scaleFactor: number) => Math.pow(index, 3) * scaleFactor}
            />
            <Box
                title="Matrix Addition"
                size={sizeA}
                setSize={setSizeA}
                onclick={() => {
                    let array: (number | null)[] = [...dataA, ...Array(sizeA + 1 - dataA.length).fill(null)];
                    executeAsync(async () => {
                        for (let i = dataA.length; i <= sizeA; i++) {
                            const request = await api.addMatrix(i)
                            array[i] = (request.data.timeNs / 1000000);
                            setDataA([...array.filter((value) => value !== null)] as number[]);
                        }
                    });
                }}
                data={dataA}
                setData={setDataA}
                scaleFactor={scaleFactorA}
                setScaleFactor={setScaleFactorA}
                calcExpectedGraph={(index: number, scaleFactor: number) => Math.pow(index, 2) * scaleFactor}
            />
        </div>
    );
}

export default App;
