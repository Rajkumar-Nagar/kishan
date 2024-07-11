import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface BidSliceState {
    startingPrice: number;
    status: "idle" | "loading" | "failed";
    currentBid: number;
    highestBidder: string;
    highestBid: number;
    bidders: any[];
}

const initialState: BidSliceState = {
    startingPrice: 0,
    status: "idle",
    currentBid: 0,
    highestBidder: "",
    highestBid: 0,
    bidders: [],
};

export const bidSlice = createSlice({
    name: "bidRoom",
    initialState,
    reducers: {
        setStartingPrice: (state, action: PayloadAction<number>) => {
            state.startingPrice = action.payload;
        },
        setHighestBid: (state, action: PayloadAction<number>) => {
            state.highestBid = action.payload;
        },
        setHighestBidder: (state, action: PayloadAction<string>) => {
            state.highestBidder = action.payload;
        },
        setCurrentBid: (state, action: PayloadAction<number>) => {
            state.currentBid = action.payload;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "failed">) => {
            state.status = action.payload;
        },
        setBidders: (state, action: PayloadAction<any[]>) => {
            state.bidders = action.payload;
        },
    },
    selectors: {

    },
});

export const {
    setStartingPrice,
    setHighestBid,
    setHighestBidder,
    setCurrentBid,
    setStatus,
    setBidders,
} = bidSlice.actions;
