import { useEffect, useState, type FC } from "react";
import { Button, ToggleSwitch, TextInput, Select } from "flowbite-react";

import ModalReload from "../modal/ModalReload";
import {
  useMockGuiStore,
  useMockApiStore,
  useMockApiOnOffStore,
} from "../../zustand";
import WorkerManager from "../../utils/WorkerManager";
import { passthrough, RequestHandler } from "msw";
import { cloneHandlerWithResolver } from "../../utils/innerUtils";
import { defaultModalReoladProps } from "../modal/modalReloadProps";

interface MockGuiProps {}

const MockGui: FC<MockGuiProps> = () => {
  // 전체 on/off 관리
  const mockGuiStore = useMockGuiStore((state) => state);

  // 목 api 목록 상태관리
  const apiData = useMockApiStore((state) => state.apiData);
  // 목 on/off 상태관리
  const mockApiOnOffStore = useMockApiOnOffStore();

  const [{ openModal: isOpenReloadModal }, setIsOpenReloadModal] = useState(
    defaultModalReoladProps
  );

  const onClickReLoadModal = () => {
    setIsOpenReloadModal((prev) => ({
      ...prev,
      openModal: true,
      handleConfirm: () => {
        alert("hi");
      },
    }));
  };

  useEffect(() => {
    const manager = WorkerManager.getInstance();
    if (mockGuiStore.isAllOn) {
      manager.start();
    } else {
      manager.stop();
    }
  }, [mockGuiStore]);

  useEffect(() => {
    const manager = WorkerManager.getInstance();
    const worker = manager.getWorker();
    const originHandlers = manager.getOriginalHandlers();

    if (worker) {
      // API ON/OFF 에 따라 무력화
      if (Object.keys(mockApiOnOffStore.apiOnOff).length > 0) {
        const handlers = originHandlers.map((handler) => {
          if (handler instanceof RequestHandler) {
            const isOn = Boolean(
              mockApiOnOffStore.apiOnOff[handler.info.header]
            );

            if (isOn) {
              return handler;
            } else {
              const convertHandler: RequestHandler = cloneHandlerWithResolver(
                handler,
                () => passthrough()
              );

              return convertHandler;
            }
          }

          return handler;
        });

        console.log("handler 재등록", handlers);
        worker.resetHandlers(...handlers);
      }
    }
  }, [mockApiOnOffStore]);

  return (
    <div className="fixed bottom-0 right-0 bg-gray-700 shadow-md text-white">
      <div className="border-2 border-yellow-600 rounded-lg flex flex-col p-4 gap-4">
        <div className="flex justify-between gap-4">
          <span>KIM-GIU</span>
          <div>
            <span>API 목록</span>
          </div>
          <Button type="button">닫기</Button>
        </div>
        <div className="flex gap-4 items-center">
          <TextInput placeholder="API 목록검색 (예시 : GET /api/v1/users)"></TextInput>
          <Button type="button" onClick={onClickReLoadModal}>
            설정 초기화
          </Button>
          <ToggleSwitch
            checked={mockGuiStore.isAllOn}
            onChange={(checked) => {
              mockGuiStore.setIsAllOn(checked);
            }}
          />
        </div>
        <div>
          {Object.entries(apiData).map(([apiKey, apiInfo]) => {
            return (
              <div key={apiKey}>
                <div className="flex items-center gap-2">
                  <div>
                    <p>{apiInfo.apiTitle}</p>
                    <p>{apiInfo.url}</p>
                  </div>
                  <ToggleSwitch
                    checked={Boolean(
                      mockApiOnOffStore.apiOnOff[apiInfo.apiKey]
                    )}
                    onChange={(checked) => {
                      mockApiOnOffStore.setApiOnOff(apiInfo.apiKey, checked);
                    }}
                  />
                  <Select>
                    {apiInfo.mockCase.map((mockCase, index) => (
                      <option key={index} value={mockCase.label}>
                        {mockCase.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
        <ModalReload
          openModal={isOpenReloadModal}
          setOpenModal={(val) => {
            setIsOpenReloadModal((prev) => ({
              ...prev,
              openModal: val,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default MockGui;
