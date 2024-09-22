import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {server} from '../../constants/config';

const adminLogin=createAsyncThunk("admin/login",async (secretKey)=>{
    try{
        const config={
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
        }
        const {data}=await axios.post(`${server}/api/v1/admin/verify`,{
            secretKey
        },config)
    
        return data.message
    }
    catch(err){
        throw new Error(err?.response?.data?.message || "Something Went Wrong")
    }
})

const getAdmin=createAsyncThunk("admin/getAdmin",async ()=>{
    try{
       
        const {data}=await axios.get(`${server}/api/v1/admin/`,{
            withCredentials:true
        })
       
    
        return data.admin
    }
    catch(err){
        throw new Error(err?.response?.data?.message || "Something Went Wrong")
    }
})

const adminLogout=createAsyncThunk("admin/adminLogout",async ()=>{
    try{
       
        const {data}=await axios.get(`${server}/api/v1/admin/logout`,{
            withCredentials:true
        })
       
    
        return data.message
    }
    catch(err){
        throw new Error(err?.response?.data?.message || "Something Went Wrong")
    }
})
export {adminLogin,getAdmin,adminLogout}