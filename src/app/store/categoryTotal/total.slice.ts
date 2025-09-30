import { createSlice } from "@reduxjs/toolkit";
import { getCategoryTotal} from "./total.thunk";


interface TotalState{
    loading:boolean,
    error:string|null,
    data:any;
}

const initialState:TotalState={
    loading:false,
    error:null,
    data:[]
}

const totalSlice=createSlice({
    name:'total',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        //getCategoryTotal
        .addCase(getCategoryTotal.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getCategoryTotal.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        })
        .addCase(getCategoryTotal.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string
        })

}})        
export default totalSlice.reducer;