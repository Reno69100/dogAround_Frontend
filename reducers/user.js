import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        token: '',
        avatar: '',
        pseudo: '',
        city: '',
        radius: 50,
        filtres: [],
    },
};

export const userSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        addToken: (state, action) => {
            state.value.token = action.payload;
        },
    },
});

export const { addToken } = userSlice.actions;
export default userSlice.reducer;