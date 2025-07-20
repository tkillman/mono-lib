import { useEffect, useState, type FC } from "react";
import { Button, ToggleSwitch, TextInput } from "flowbite-react";

import ModalReload from "../modal/ModalReload";
import {
  useMockGuiStore,
  useMockApiStore,
  useMockApiOnOffStore,
} from "../../zustand";
import WorkerManager from "../../utils/WorkerManager";
import { passthrough, RequestHandler } from "msw";
import { cloneHandlerWithResolver } from "../../utils/innerUtils";
import { useModalReload } from "../../zustand/useModalReload";
import MockTable from "../table/MockTable";

const MockGui: FC = () => {
  const [isWide, setIsWide] = useState<boolean>(false);

  // 전체 on/off 관리
  const mockGuiStore = useMockGuiStore((state) => state);

  // 목 api 목록 상태관리
  const { apiData, clear: clearApiData } = useMockApiStore();

  // 목 on/off 상태관리
  const mockApiOnOffStore = useMockApiOnOffStore();

  const setOpenModal = useModalReload((state) => state.setOpenModal);

  const onClickReLoadModal = () => {
    const handleConfirm = () => {
      mockGuiStore.clear();
      clearApiData();
      mockApiOnOffStore.clear();
    };

    setOpenModal({
      handleConfirm: handleConfirm,
    });
  };

  /** 설정 전체 ON 시키기 */
  useEffect(() => {
    const manager = WorkerManager.getInstance();
    if (mockGuiStore.isAllOn) {
      manager.start();
      //mockApiOnOffStore.setApiAllOnOff(true);
    } else {
      manager.stop();
      //mockApiOnOffStore.setApiAllOnOff(false);
    }
  }, [mockGuiStore.isAllOn, mockApiOnOffStore]);

  useEffect(() => {
    const manager = WorkerManager.getInstance();
    const worker = manager.getWorker();
    const originHandlers = manager.getOriginalHandlers();

    if (worker) {
      // API ON/OFF 에 따라 무력화
      if (Object.keys(mockApiOnOffStore.apiOnOff).length > 0) {
        const handlers = originHandlers.map((handler) => {
          if (
            handler instanceof RequestHandler &&
            "method" in handler.info &&
            "path" in handler.info
          ) {
            const isOn = Boolean(
              mockApiOnOffStore.apiOnOff[
                `${handler.info.method}_${handler.info.path}`
              ]
            );

            if (isOn && mockGuiStore.isAllOn) {
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

        worker.resetHandlers(...handlers);
      }
    }
  }, [mockApiOnOffStore, mockGuiStore.isAllOn]);

  return (
    <div className="fixed bottom-0 right-0">
      {/** isShowMode ON */}
      <div
        className={isWide ? "hidden" : ""}
        onClick={() => {
          setIsWide(true);
        }}
      >
        <div className="bg-orange-500 rounded-full py-6 px-3 flex items-center mb-[40px] opacity-80 text-white text-[20px] cursor-pointer translate-x-1/2 hover:translate-x-0 transition-transform duration-300 hover:opacity-100 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95 active:bg-orange-700 active:shadow-none active:shadow-orange-500/50">
          MSW
        </div>
      </div>
      {/** isShowMode ON */}
      <div className={isWide ? "bg-gray-700 shadow-md text-white" : "hidden"}>
        <div className="border-2 border-yellow-600 rounded-lg flex flex-col p-4 gap-4">
          <div className="flex justify-between gap-4">
            <span>KIM-GIU</span>
            <div>
              <span>API 목록</span>
            </div>
            <Button
              type="button"
              onClick={() => {
                setIsWide(false);
              }}
            >
              닫기
            </Button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="flex gap-4 items-center sticky top-0 z-10 bg-gray-700 py-6">
              <TextInput placeholder="API 목록검색 (예시 : GET /api/v1/users)"></TextInput>
              <Button type="button" onClick={onClickReLoadModal}>
                설정 초기화
              </Button>
              <ToggleSwitch
                checked={mockGuiStore.isAllOn}
                onChange={(checked) => {
                  setOpenModal({
                    handleConfirm: () => {
                      mockGuiStore.setIsAllOn(checked);
                    },
                  });
                }}
              />
            </div>
            <MockTable
              isAllOn={mockGuiStore.isAllOn}
              apiData={apiData}
              apiOnOff={mockApiOnOffStore.apiOnOff}
              onChangeApiOnOff={(apiKey) => (checked) => {
                setOpenModal({
                  handleConfirm: () => {
                    mockApiOnOffStore.setApiOnOff(apiKey, checked);
                  },
                });
              }}
            ></MockTable>
          </div>
        </div>
      </div>

      <ModalReload />
    </div>
  );
};

export default MockGui;
