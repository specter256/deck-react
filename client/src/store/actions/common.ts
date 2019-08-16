import { Tag } from 'interfaces/interfaces';

export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
export const SELECT_TAG = 'SELECT_TAG';

export const toggleEditMode = () => (dispatch: any) => {
  dispatch({ type: 'TOGGLE_EDIT_MODE' });
};

export const selectTag = (tag: Tag) => (dispatch: any) => {
  dispatch({ type: 'SELECT_TAG', tag });
};
