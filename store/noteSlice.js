// notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    userNotes: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.userNotes.push(action.payload);
    },
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
