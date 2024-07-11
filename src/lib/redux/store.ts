import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { bidSlice } from './features/bid/bidSlice';

const rootReducer = combineSlices(bidSlice)

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore["dispatch"];