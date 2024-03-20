import { LineChart } from "@mui/x-charts";
import { MatrixControllerApi } from "./api";
import { useState } from "react";

function App() {
    const api = new MatrixControllerApi();
    const [size, setSize] = useState<number>(0);
    const [data, setData] = useState<number[]>([]);

    return (
        <div className="flex flex-auto content-center">
            <div className="content-center self-center ml-32">
                <div>
                    <input type="number" name="size" onChange={(event) => setSize(Number(event.target.value))}/>
                    <button 
                        onClick={() => {
                            const promises: Promise<any>[] = []
                            for (let i = 0; i <= size; i++) {
                                promises.push(api.multiplyMatrix(i));
                            }

                            Promise.all(promises).then(
                                (results) => setData(results.map(result => result.data.timeNs))
                            
                            );

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
        </div>
    );
}

export default App;
