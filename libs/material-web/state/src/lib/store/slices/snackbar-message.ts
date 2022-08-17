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
    setSnackbarMessage: (
      state: SnackbarMessageState,
      action: PayloadAction<SetMessagePayload>,
    ) => {
      const { message, severity } = action.payload;
      state.message = message;
      state.severity = severity;
      state.show = true;
    },
    closeSnackbar: (state: SnackbarMessageState) => {
      state.show = false;
    },
  },
});

export const { setSnackbarMessage, closeSnackbar } =
  SnackbarMessageSlice.actions;

export default SnackbarMessageSlice.reducer;

interface SetMessagePayload {
  message: string | null;
  severity: AlertColor;
}

interface SnackbarMessageState extends SetMessagePayload {
  show: boolean;
}
