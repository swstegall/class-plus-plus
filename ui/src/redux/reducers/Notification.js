import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Open: false,
  Message: "",
  Severity: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    open: (state, action) => {
      state.Open = true;
      state.Message = action.payload.Message;
      state.Severity = action.payload.Severity;
    },
    setOpen: (state, action) => {
      state.Open = action.payload;
    },
  },
});

const { open, setOpen } = notificationSlice.actions;

export const NotificationActions = {
  Open: open,
  SetOpen: setOpen,
};

export default notificationSlice.reducer;
