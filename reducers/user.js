import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    email: "",
    avatar: "../assets/avatars/chien_1.png",
    pseudo: "",
    city: "",
    radius: 20000,
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
    storeFilters: (state, action) => {
      state.value.filtres = [];
      for (const element of action.payload) {
        state.value.filtres.push(element);
      }
    },
    storeCity: (state, action) => {
      state.value.city = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.pseudo = null;
    },
  },
});

export const { login, addToken, storeFilters, storeCity, logout } = userSlice.actions;
export default userSlice.reducer;
