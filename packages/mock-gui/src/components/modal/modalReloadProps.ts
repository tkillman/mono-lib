export interface IProps {
  openModal: boolean;
  setOpenModal?: (open: boolean) => void;
  handleConfirm?: () => void;
}

export const defaultModalReoladProps: IProps = {
  openModal: false,
  setOpenModal: () => {},
  handleConfirm: undefined,
};
