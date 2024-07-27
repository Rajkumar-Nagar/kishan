import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface BidSliceState {
    basePrice: number;
    status: "idle" | "loading" | "failed";
    currentBid: number;
    highestBidder: string;
    highestBid: number;
    bidders: any[];
    paused: boolean;
    default_waiting: number;
    timestamps: {
        created_at: number;
        updated_at: number;
    };
}

const initialState: BidSliceState = {
    basePrice: 0,
    status: "idle",
    currentBid: 0,
    highestBidder: "",
    highestBid: 0,
    bidders: [],
    paused: false,
    default_waiting: 30,
    timestamps: {
        created_at: 0,
        updated_at: 0,
    }
};

const bidSlice = createSlice({
    name: "bidRoom",
    initialState,
    reducers: {
        setInitialValues: (state, action: PayloadAction<BidSliceState>) => {
            state.basePrice = action.payload.basePrice;
            state.currentBid = action.payload?.currentBid ?? 0;
            state.highestBidder = action.payload?.highestBidder ?? "";
            state.highestBid = action.payload?.highestBid ?? "";
            state.paused = !!action.payload?.paused;
            state.timestamps.created_at = action.payload?.timestamps?.created_at ?? 0;
            state.timestamps.updated_at = action.payload?.timestamps?.updated_at ?? 0;
        },
        setBasePrice: (state, action: PayloadAction<number>) => {
            state.basePrice = action.payload;
        },
        setHighestBid: (state, action: PayloadAction<number>) => {
            state.highestBid = action.payload;
        },
        setHighestBidder: (state, action: PayloadAction<string>) => {
            state.highestBidder = action.payload;
        },
        setCurrentBid: (state, action: PayloadAction<number>) => {
            state.currentBid = action.payload;
            state.paused = true;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "failed">) => {
            state.status = action.payload;
        },
        setBidders: (state, action: PayloadAction<any[]>) => {
            state.bidders = action.payload;
        },
        setCanMakeBid: (state, action: PayloadAction<boolean>) => {
            state.paused = !action.payload;
        },
        createBidTimeStamp: (state, action: PayloadAction<number>) => {
            state.timestamps.created_at = action.payload;
        },
        updateBidTimeStamp: (state, action: PayloadAction<number>) => {
            state.paused = true;
            state.timestamps.updated_at = action.payload;
        },
    },
    selectors: {

    },
});

export const bidActions = bidSlice.actions;
export const bidReducer = bidSlice.reducer

