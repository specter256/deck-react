import {
  combineReducers,
} from 'redux';

import { notes } from 'store/reducers/notes';

export const rootReducer = combineReducers({
  notes,
});

export type AppState = ReturnType<typeof rootReducer>
