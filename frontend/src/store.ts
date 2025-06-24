import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import bandReducer from './features/bands/bandSlice';
import rehearsalReducer from './features/rehearsals/rehearsalSlice';
import setlistReducer from './features/setlists/setlistSlice';
import songReducer from './features/songs/songSlice';
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandReducer,
    rehearsals: rehearsalReducer,
    setlists: setlistReducer,
    songs: songReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;