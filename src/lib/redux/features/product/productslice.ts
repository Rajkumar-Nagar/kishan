import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface productSliceState {
    saved_item: any[],
    isSaved: boolean
}

const initialState: productSliceState = {
    saved_item: [],
    isSaved: false
};

const producSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addSavedItem: (state, action: PayloadAction<any>) => {
            const item = action.payload;
            const index = state.saved_item.findIndex((savedItem) => savedItem.id === item.id);
            if (index === -1) {
                state.saved_item.push(item);
            } else {
                state.saved_item = state.saved_item.filter((savedItem) => savedItem.id !== item.id);
            }
        },

    },
});

export const productActions = producSlice.actions;
export default producSlice.reducer;
