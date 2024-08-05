import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    email: "",
    avatar: "",
    pseudo: "",
    city: "",
    radius: 50,
    filtres: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.pseudo = action.payload.pseudo;
      state.value.city = action.payload.city;
    },
    addToken: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const { login, addToken } = userSlice.actions;
export default userSlice.reducer;
