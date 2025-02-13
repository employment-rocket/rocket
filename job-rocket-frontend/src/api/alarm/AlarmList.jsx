import api from "../api";

export const alarmList = async() =>{

    try{       
    const response =  await api.get("/alarm/list")
    return response.data;
   }
   catch(error){
    console.error(error);
   } 
};