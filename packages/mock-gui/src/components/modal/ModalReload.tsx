import { Modal, ModalBody, Progress } from "flowbite-react";
import { useEffect, useRef, useState, type FC } from "react";
import type { IProps } from "./modalReloadProps";

const ModalReload: FC<IProps> = ({
  openModal,
  setOpenModal,
  handleConfirm,
}) => {
  const refInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [percentNum, setPercentNum] = useState(0);

  useEffect(() => {
    if (openModal) {
      refInterval.current = setInterval(() => {
        setPercentNum((prev) => {
          if (prev >= 100) {
            if (refInterval.current) {
              clearInterval(refInterval.current);
            }

            return 100;
          }
          return prev + 1; // Increment by 5% every second
        });
      }, 30); // Update every second

      return () => {
        setPercentNum(0); // Reset percent when modal closes
        if (refInterval.current) {
          clearInterval(refInterval.current);
        } // Cleanup on unmount
      };
    }
  }, [openModal]);

  useEffect(() => {
    if (percentNum >= 100) {
      handleConfirm?.();
      window.location.reload(); // Reload the page when percent reaches 100
    }
  }, [percentNum, handleConfirm]);

  const onClose = () => {
    setPercentNum(0); // Reset percent when modal closes
    if (refInterval.current) {
      clearInterval(refInterval.current);
    } // Cleanup on unmount
    setOpenModal?.(false);
  };

  return (
    <Modal show={openModal} onClose={onClose} className="">
      <ModalBody className="bg-black fixed bottom-2 right-0 text-white animate-slideDownGo px-6 py-3">
        <div className="flex items-center gap-5">
          <div>※</div>
          <div>
            <p>설정 변경이 감지되어 페이지를 새로고침합니다.</p>
            <p className="mt-2 cursor-pointer" onClick={onClose}>
              취소하려면 여기를 클릭해주세요.
            </p>
          </div>
          <div
            className="bg-transparent text-2xl cursor-pointer p-3"
            onClick={onClose}
          >
            X
          </div>
        </div>
        <div className="mt-3">
          <Progress progress={percentNum} size="md" color="blue" />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalReload;
