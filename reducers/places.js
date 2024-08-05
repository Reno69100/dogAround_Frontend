import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const placesSlice = createSlice({
    name: 'places',

    initialState,
    reducers: {
        addPlace: (state, action) => {
            state.value.push(action.payload);
        },
    },
});

export const { addPlace } = placesSlice.actions;
export default placesSlice.reducer;