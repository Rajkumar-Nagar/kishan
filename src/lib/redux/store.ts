import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { bidReducer, cropFilterReducer, productReducer } from './features';
//@ts-ignore
import { persistStore, persistReducer } from 'redux-persist'
//@ts-ignore
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['bidRoom', 'cropFilters'],
}

const rootReducer = combineReducers({
    bidRoom: bidReducer,
    product: productReducer,
    cropFilters: cropFilterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore["dispatch"];
