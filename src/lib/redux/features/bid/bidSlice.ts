import { productOptions } from "@/actions/include.options";
import { Bids, Prisma, Product } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Bidder {
    id: string;
    name: string;
    room: string;
    userId: string;
}
export type Bidproduct = Prisma.ProductGetPayload<{
    include: {
        additionalServices: true,
        harvestStorage: true,
        qualityMetrics: true,
        media: true,
        locationInfo: true,
        pesonalInfo: {
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                email: true,
                address: true,
                licence: true,
                additional_number: true,
                avatar: true,
            }
        },
        ProductInfo: true,
        biddingDetails: {
            include: {
                bids: true
            }
        }
    }
}>
export interface BidSliceState {
    product: Bidproduct | null,
    bidders: Bidder[],
    highestBidder: string | null,
    bidHistory: Bids[],
    countDown: number,
    viewers: Bidder[],
    latestBid: Bids | null,
    highestBid: number

}

const initialState: BidSliceState = {
    product: null,
    bidders: [],
    highestBidder: null,
    bidHistory: [],
    countDown: 30,
    viewers: [],
    highestBid: 0,
    latestBid: null
};


const bidSlice = createSlice({
    name: "bidRoom",
    initialState,
    reducers: {
        initBid: (state, action: PayloadAction<Bidproduct>) => {
            const product = action.payload
            state.product = product
            state.bidHistory = product.biddingDetails[0].bids
            const latestBid = product.biddingDetails[0].bids.at(-1)
            if (latestBid) {
                state.highestBid = latestBid?.price!
                state.highestBidder = latestBid?.bidderId!
                state.latestBid = latestBid;
            }
        },
        setProduct: (state, action: PayloadAction<Bidproduct>) => {
            state.product = action.payload;
        },
        removeBidder: (state, action: PayloadAction<Bidder>) => {
            state.bidders.pop();
        },
        setBidders: (state, action: PayloadAction<Bidder[]>) => {
            state.bidders = action.payload
        },
        addBidder: (state, action: PayloadAction<Bidder>) => {
            state.bidders.push(action.payload);
        },
        removeViewer: (state, action: PayloadAction<Bidder>) => {
            state.bidders.pop();
        },
        addViewer: (state, action: PayloadAction<Bidder>) => {
            state.bidders.push(action.payload);
        },
        addBid: (state, action: PayloadAction<Bids>) => {
            state.bidHistory = [...state.bidHistory, action.payload];
            state.latestBid = action.payload;
            state.highestBidder = action.payload.bidderId
            state.highestBid = action.payload.price
        },
        setCountDown: (state, action: PayloadAction<number>) => {
            state.countDown = action.payload
        }
    },
    selectors: {

    },
});


export const bidActions = bidSlice.actions;
export const bidReducer = bidSlice.reducer

