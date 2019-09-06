import { Tag } from 'interfaces/interfaces';

export const SET_FOLDER = 'SET_FOLDER';
export const TOGGLE_VIEW_EDIT = 'TOGGLE_VIEW_EDIT';
export const SEARCH_BY_TAG = 'SEARCH_BY_TAG';
export const SEARCH_BY_TEXT = 'SEARCH_BY_TEXT';

export const setFolder = (folder: string) => (dispatch: any) => {
  dispatch({ type: 'SET_FOLDER', folder });
};

export const toggleViewEdit = (isEdit?: boolean) => (dispatch: any) => {
  dispatch({ type: 'TOGGLE_VIEW_EDIT', isEdit });
};

export const searchByTag = (tag: Tag) => (dispatch: any) => {
  dispatch({ type: 'SEARCH_BY_TAG', tag });
};

export const searchByText = (text: string) => (dispatch: any) => {
  dispatch({ type: 'SEARCH_BY_TEXT', text });
};
