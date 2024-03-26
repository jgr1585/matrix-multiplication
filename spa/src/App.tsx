
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


    return (
        <div className="flex flex-row content-center space-x-3 w-full">
            <Box
                title="Matrix Multiplication"
                size={sizeM}
                setSize={setSizeM}
                onclick={() => {
                    let array: (number | null)[] = Array(sizeM + 1).fill(null);
                    executeAsync(async () => {
                        for (let i = 0; i <= sizeM; i++) {
                            const request = await api.multiplyMatrix(i);
                            array[i] = (request.data.timeNs / 1000000);
                            setDataM([...array.filter((value) => value !== null)] as number[]);
                        }
                    });
                }}
                data={dataM}
                setData={setDataM}
            />
            <Box
                title="Matrix Addition"
                size={sizeA}
                setSize={setSizeA}
                onclick={() => {
                    let array: (number | null)[] = Array(sizeA + 1).fill(null);
                    executeAsync(async () => {
                        for (let i = 0; i <= sizeA; i++) {
                            const request = await api.addMatrix(i)
                            array[i] = (request.data.timeNs / 1000000);
                            setDataA([...array.filter((value) => value !== null)] as number[]);
                        }
                    });
                }}
                data={dataA}
                setData={setDataA}
            />
        </div>
    );
}

export default App;
