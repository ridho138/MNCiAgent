export const MODAL_MENU = "MODAL_MENU";
export const setModalMenu = isOpen => {
  return {
    type: MODAL_MENU,
    payload: isOpen
  };
};
