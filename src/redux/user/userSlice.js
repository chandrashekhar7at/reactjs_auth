import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentUser:null,
    loading : false,
    error : false,
    fullnameerror : '',
    phoneerror : '',
    emailerror : '',
    passworderror:'',
    repeatPassworderror:'',
    playbtnstart:false,
    amount:0,
}
const userSlice = createSlice({
    name:'spinuser',
    initialState,
    reducers:{
        formfillingStart:(state,action)=>{
            state.loading = true
            state.error = false
        },
        formfillingError:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        formfillingSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false
        },
        fullnameError:(state,action)=>{
            state.fullnameerror = action.payload
        },
        phoneError:(state,action)=>{
            state.phoneerror = action.payload
        },
        emailError:(state,action)=>{
            state.emailerror = action.payload
        },
        passwordError:(state,action)=>{
            state.passworderror = action.payload  
        },
        repeatpasswordError:(state,action)=>{
            state.repeatPassworderror = action.payload 
        },
        playButtonStart:(state,action)=>{
            state.playbtnstart=action.payload
        },
        setAmount:(state,action)=>{
            state.amount = action.payload
        }
    }
})

export const {setAmount,playButtonStart,formfillingStart,formfillingError,formfillingSuccess,fullnameError,phoneError,emailError,passwordError,repeatpasswordError} = userSlice.actions
export default userSlice.reducer