export const MODAL_MENU = "MODAL_MENU";
export const setModalMenu = isOpen => {
  return {
    type: MODAL_MENU,
    payload: isOpen
  };
};

export const NEWS_ANNOUNCEMENT_LIST = "NEWS_ANNOUNCEMENT_LIST";
export const seNewsAnnouncementList = data => {
  return {
    type: NEWS_ANNOUNCEMENT_LIST,
    payload: data
  };
};

