import { crops } from "@/data";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface FilterVaritys {
    [crop: string]: string[];
}

interface FilterCrops {
    prize_Range: { start: string; End: string };
    varity_Select: FilterVaritys;
    quantity_range: { start: string; End: string };
    harvest_date: { to: string; from: string };
    listed_date: { to: string; from: string };
    additional_service: { liveStreaming: boolean; sampleRequest: boolean };
    grading: boolean;
}

export interface productSliceState {
    saved_item: any[];
    FilterVaritys: FilterVaritys,
    FilterCrops: FilterCrops
}


const initialState: productSliceState = {
    saved_item: [],
    FilterVaritys: Object.keys(crops).reduce((acc, crop) => {
        acc[crop] = [];
        return acc;
    }, {} as FilterVaritys),

    FilterCrops: {
        prize_Range: { start: "0", End: "2000" },
        varity_Select: {},
        quantity_range: { start: "0", End: "1000" },
        harvest_date: { to: "", from: "" },
        listed_date: { to: "", from: "" },
        additional_service: { liveStreaming: false, sampleRequest: false },
        grading: false
    }
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

        addvarityFilter: (state, action: PayloadAction<any>) => {
            const { crop, varity } = action.payload;
            if (state.FilterVaritys[crop].includes(varity)) {
                state.FilterVaritys[crop] = state.FilterVaritys[crop].filter(item => item !== varity);
            } else {
                state.FilterVaritys[crop].push(varity);
            }
        },
        handelCrop: (state, action: PayloadAction<any>) => {
            const { selectedCrop, crop } = action.payload
            if (selectedCrop) {
                console.log(selectedCrop, crop)
                //@ts-ignore
                state.FilterVaritys[crop] = crops[crop]
            }
            else {
                state.FilterVaritys[crop] = []
            }
        },

        handleRange: (state, action: PayloadAction<{ type: string, val: number[] }>) => {
            switch (action.payload.type) {
                case "prize":
                    state.FilterCrops.prize_Range.End = `${action.payload.val[0]}`;
                    break;
                case "quantity":
                    state.FilterCrops.quantity_range.End = `${action.payload.val[0]}`;
                    break;
                default:
                    break;
            }
        },

        hadelVarity: (state, action: PayloadAction<any>) => {
            const varity = action.payload
            state.FilterCrops.varity_Select = varity
        },

        handelHarvestDate: (state, action: PayloadAction<any>) => {
            const { Start, End } = action.payload
            state.FilterCrops.harvest_date.to = Start
            state.FilterCrops.harvest_date.from = End
        },
        handelListedDate: (state, action: PayloadAction<any>) => {
            const { Start, End } = action.payload
            state.FilterCrops.listed_date.to = Start
            state.FilterCrops.listed_date.from = End
        },
        hanelAdditionalServices: (state, action: PayloadAction<any>) => {
            const service = action.payload

            if (service == "liveStreaming") {
                state.FilterCrops.additional_service.liveStreaming = !state.FilterCrops.additional_service.liveStreaming
            }
            else {
                state.FilterCrops.additional_service.sampleRequest = !state.FilterCrops.additional_service.sampleRequest
            }
        }
    },
});

export const productActions = producSlice.actions;
export const productReducer = producSlice.reducer;
