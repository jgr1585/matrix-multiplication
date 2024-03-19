import { LineChart } from "@mui/x-charts";
import { MatrixControllerApi } from "./api";
import { useState } from "react";

function App() {
    const api = new MatrixControllerApi();
    const [size, setSize] = useState<number>(0);
    const [data, setData] = useState<number[]>([]);

    return (
        <div>
            <div>
                <input type="number" name="size" onChange={(event) => setSize(Number(event.target.value))}/>
                <button 
                    onClick={() => {
                        const array: number[] = []
                        for (let i = 0; i <= size; i++) {
                            api.multiplyMatrix(i).then((response) => {
                                //Add the response to the data state
                                array[i] = response.data.timeNs
                            })
                        }

                        setData(array);

                    }}
                    >Generate</button>
            </div>
            <LineChart
                series={[
                    {
                    data: data,
                    },
                ]}
                width={1000}
                height={600}
            />
        </div>

    );
}

export default App;
