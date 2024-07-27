import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bidSlice from './features/bid/bidSlice';
import producSlice from './features/product/productslice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'product',
    storage,
}

const persistedReducer = persistReducer(persistConfig, producSlice)

const rootReducer = combineReducers({
    bid: bidSlice,
    product: persistedReducer,
});



export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore["dispatch"];
