import { create } from "zustand";

type HandleConfirm = () => void;

const defaultHandleConfirm: HandleConfirm = () => {
  console.warn("No handleConfirm function provided");
};

type ModalReloadStore = {
  isOpen: boolean;
  handleConfirm: HandleConfirm;
};

const defaultModalReoladProps: ModalReloadStore = {
  isOpen: false,
  handleConfirm: defaultHandleConfirm,
};

export interface IModalReload {
  setOpenModal: (params: { handleConfirm: HandleConfirm }) => void;
  clear: () => void;
}

export const useModalReload = create<ModalReloadStore & IModalReload>(
  (set) => ({
    isOpen: defaultModalReoladProps.isOpen,
    handleConfirm: defaultModalReoladProps.handleConfirm,
    setOpenModal: ({ handleConfirm }) =>
      set(() => ({
        isOpen: true,
        handleConfirm: handleConfirm,
      })),
    clear: () => {
      set(() => ({
        isOpen: false,
        handleConfirm: defaultHandleConfirm,
      }));
    },
  })
);
