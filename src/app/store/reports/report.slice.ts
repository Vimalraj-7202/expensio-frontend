import { createSlice } from "@reduxjs/toolkit";
import { getAllOverview} from "./report.thunk";

interface ReportState{
    loading:boolean,
    error:string|null,
    data:any;
}

const initialState:ReportState={
    loading:false,
    error:null,
    data:[]
}

const reportSlice=createSlice({
    name:'report',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //getAllOverView
        .addCase(getAllOverview.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllOverview.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        })
        .addCase(getAllOverview.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string
        })



    }
})

export default reportSlice.reducer;