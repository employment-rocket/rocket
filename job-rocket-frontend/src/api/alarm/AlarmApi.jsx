import api from "../api";

export const getAlarms = async ()=>{

    try{
      const response = await api.get(`/user/alarm`);
      return response.data;
    }catch(error){
      console.error("Alarm getting error:", error);
    }
  
  };
  