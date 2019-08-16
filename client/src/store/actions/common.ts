import { Tag } from 'interfaces/interfaces';

export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
export const SEARCH_BY_TAG = 'SEARCH_BY_TAG';
export const SEARCH_BY_TEXT = 'SEARCH_BY_TEXT';

export const toggleEditMode = () => (dispatch: any) => {
  dispatch({ type: 'TOGGLE_EDIT_MODE' });
};

export const searchByTag = (tag: Tag) => (dispatch: any) => {
  dispatch({ type: 'SEARCH_BY_TAG', tag });
};

export const searchByText = (text: string) => (dispatch: any) => {
  dispatch({ type: 'SEARCH_BY_TEXT', text });
};
