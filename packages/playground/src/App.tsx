import "../../mock-gui/dist/mock-gui.css";
import { MockGui, WorkerManager } from "mock-gui";
import { setupWorker } from "msw/browser";
import axios from "axios";
import { useState } from "react";
import { BOARD_LIST_URL } from "./mock/apiUrl";
import { handlers } from "./mock/handlers";

type Board = {
  id: number;
  title: string;
};

const App = () => {
  const worker = setupWorker();
  worker.use(...handlers);
  WorkerManager.getInstance().initializeWorker(worker);

  const [list, setList] = useState<Board[]>([]);

  const onClickApi = async () => {
    //jsonplaceholder
    try {
      const response = await axios.get(BOARD_LIST_URL);
      const data = response.data as Board[];
      setList(data);
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <h1>Playground</h1>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={onClickApi}
          className="bg-amber-300 p-1 rounded"
        >
          api 호출
        </button>
      </div>
      <div>
        <div>
          <strong>api 결과</strong>
        </div>
        {list.map((r) => {
          return <div key={r.id}>{r.title}</div>;
        })}
      </div>
      <MockGui />
    </div>
  );
};

export default App;
