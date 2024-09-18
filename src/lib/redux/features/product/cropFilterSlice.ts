import { crops } from "@/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterOptions {
    priceRange: { min: number; max: number; };
    quantityRange: { min: number; max: number; };
    harvestDate: { from: string; to: string; };
    listedDate: { from: string; to: string; };
    additionalServices: { liveStreaming: boolean; sampleRequest: boolean; };
    grading: boolean;
    cropVariety: { [crop: string]: string[]; };
}

const initialState: IFilterOptions = {
    priceRange: { min: 0, max: 2000 },
    quantityRange: { min: 0, max: 1000 },
    harvestDate: { from: "", to: "" },
    listedDate: { from: "", to: "" },
    additionalServices: { liveStreaming: false, sampleRequest: false },
    grading: false,
    cropVariety: Object.keys(crops).reduce((acc, crop) => {
        acc[crop] = [];
        return acc;
    }, {} as { [crop: string]: string[]; }),
};

const cropFilterSlice = createSlice({
    name: "cropFilters",
    initialState,
    reducers: {
        setPriceRange: (state, action: PayloadAction<IFilterOptions["priceRange"]>) => {
            state.priceRange = action.payload;
        },
        setQuantityRange: (state, action: PayloadAction<IFilterOptions["quantityRange"]>) => {
            state.quantityRange = action.payload;
        },
        setHarvestDate: (state, action: PayloadAction<IFilterOptions["harvestDate"]>) => {
            state.harvestDate = action.payload;
        },
        setListedDate: (state, action: PayloadAction<IFilterOptions["listedDate"]>) => {
            state.listedDate = action.payload;
        },
        setAdditionalServices: (state, action: PayloadAction<keyof IFilterOptions["additionalServices"]>) => {
            state.additionalServices[action.payload] = !state.additionalServices[action.payload];
        },
        setGrading: (state, action: PayloadAction<boolean>) => {
            state.grading = action.payload;
        },
        setCropVariety: (state, action: PayloadAction<keyof typeof crops>) => {
            const crop = action.payload;
            if (state.cropVariety[crop].length === crops[crop].length) {
                state.cropVariety[crop] = [];
            } else {
                state.cropVariety[crop] = crops[crop];
            }
        },
        updateCropVariety: (state, action: PayloadAction<{ crop: string; variety: string }>) => {
            const { crop, variety } = action.payload;
            const index = state.cropVariety[crop].indexOf(variety);
            if (index === -1) {
                state.cropVariety[crop].push(variety);
            } else {
                state.cropVariety[crop].splice(index, 1);
            }
        },
    }
});

export const cropFilterActions = cropFilterSlice.actions;
export const cropFilterReducer = cropFilterSlice.reducer;