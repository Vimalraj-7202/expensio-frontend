import {configureStore} from '@reduxjs/toolkit';
import {useSelector,TypedUseSelectorHook, useDispatch } from 'react-redux';
import authReducer from '@/app/store/auth/auth.slice';
import expenseReducer from '@/app/store/expense/expense.slice';
import budgetReducer from '@/app/store/budget/budget.slice';
import categoryReducer from '@/app/store/category/category.slice'; 
import reportReducer from '@/app/store/reports/report.slice';
import totalReducer from '@/app/store/categoryTotal/total.slice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        expense:expenseReducer,
        budget:budgetReducer,
        category:categoryReducer,
        report:reportReducer,
        total:totalReducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>;
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export default store;