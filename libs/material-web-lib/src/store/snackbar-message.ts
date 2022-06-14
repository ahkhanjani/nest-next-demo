import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AlertColor } from '@mui/material';

const initialState: SnackbarMessageState = {
  message: null,
  severity: 'info',
  show: false,
};

export const SnackbarMessageSlice = createSlice({
  name: 'snackbarMessage',
  initialState,
  reducers: {
    setSnackbarMessage: (state, action: PayloadAction<SetMessagePayload>) => {
      const { message, severity } = action.payload;
      state.message = message;
      state.severity = severity;
      state.show = true;
    },
    closeSnackbar: (state) => {
      state.show = false;
    },
  },
});

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export const { setSnackbarMessage, closeSnackbar } =
  SnackbarMessageSlice.actions;

export default SnackbarMessageSlice.reducer;

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

interface SetMessagePayload {
  message: string;
  severity: AlertColor;
}

interface SnackbarMessageState extends SetMessagePayload {
  show: boolean;
}
