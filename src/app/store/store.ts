import {configureStore} from '@reduxjs/toolkit';
import {useSelector,TypedUseSelectorHook, useDispatch } from 'react-redux';
 

const store=configureStore({
    reducer:{
        
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>;
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default store;