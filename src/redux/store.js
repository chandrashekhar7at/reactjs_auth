import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import {persistReducer,persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({spinuser:userSlice})
const persistConfig = {
    key:'Gamingusers',
    version:1,
    storage
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor = persistStore(store)