import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,account)=>{
            state.status=true;
            state.userData=account.payload;
        },

        logout:(state,action)=>{
            state.status=false;
            state.userData=null;

        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;