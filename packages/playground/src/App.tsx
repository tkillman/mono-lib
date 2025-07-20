import "../../mock-gui/dist/mock-gui.css";
import { MockGui, WorkerManager } from "mock-gui";
import { setupWorker } from "msw/browser";
import axios, { type AxiosResponse } from "axios";
import { useState } from "react";
import { BOARD_LIST_URL } from "./mock/apiUrl";
import { handlers } from "./mock/handlers";

const App = () => {
  const worker = setupWorker();
  worker.use(...handlers);
  WorkerManager.getInstance().initializeWorker(worker);

  const [data, setData] = useState<AxiosResponse<any> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onClickApi = async () => {
    setIsLoading(true);
    //get 호출
    try {
      const response = await axios.get(BOARD_LIST_URL);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("GET API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        setData(error?.response?.data);
      }
    }
    setIsLoading(false);
  };

  const onClickApi2 = async () => {
    setIsLoading(true);
    // post 호출
    try {
      const response = await axios.post(BOARD_LIST_URL);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("POST API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        setData(error?.response?.data);
      }
    }
    setIsLoading(false);
  };

  const onClickApi3 = async () => {
    setIsLoading(true);
    // put 호출
    try {
      const response = await axios.put(`${BOARD_LIST_URL}/1`);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("PUT API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        setData(error?.response?.data);
      }
    }
    setIsLoading(false);
  };

  const onClickApi4 = async () => {
    setIsLoading(true);
    // post 호출
    try {
      const response = await axios.delete(`${BOARD_LIST_URL}/1`);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("DELETE API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        setData(error?.response?.data);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Playground</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={onClickApi}
          style={{ width: "130px", backgroundColor: "red" }}
        >
          get api 호출
        </button>
        <button
          type="button"
          onClick={onClickApi2}
          style={{ width: "130px", backgroundColor: "orange" }}
        >
          post api 호출
        </button>
        <button
          type="button"
          onClick={onClickApi3}
          style={{ width: "130px", backgroundColor: "yellow" }}
        >
          put api 호출
        </button>
        <button
          type="button"
          onClick={onClickApi4}
          style={{ width: "130px", backgroundColor: "green" }}
        >
          delete api 호출
        </button>
      </div>
      <div>{isLoading && "로딩중"}</div>
      <div>
        <div>{JSON.stringify(data)}</div>
      </div>
      <MockGui />
    </div>
  );
};

export default App;
