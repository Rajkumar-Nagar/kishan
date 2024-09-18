import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface productSliceState {
    saved_item: any[];
}

const initialState: productSliceState = {
    saved_item: []
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
                state.saved_item.splice(index, 1);
            }
        },
    },
});

export const productActions = producSlice.actions;
export const productReducer = producSlice.reducer;
