export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

export const toggleEditMode = () => (dispatch: any) => {
  dispatch({ type: 'TOGGLE_EDIT_MODE' });
};
