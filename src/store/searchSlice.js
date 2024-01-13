import { createSlice } from "@reduxjs/toolkit";


const searchSlice=createSlice({
    name:'search',
    initialState:{
        searcgTerm:""
    },
    reducers:{
        setSearchTerm(state,action){
            console.log(action,"action---")
            state.searcgTerm=action.payload;
        }
    }
    
})

export const {setSearchTerm}=searchSlice.actions
export default searchSlice.reducer
