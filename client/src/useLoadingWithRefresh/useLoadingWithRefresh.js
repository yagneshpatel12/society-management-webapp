import { refresh } from "../http";
import {  useEffect, useState,useRef } from "react";
import { useGlobalContext } from "../context/context";

export function useLoadingWithRefresh(){
    const [loading,setLoading] = useState(true);
    const {Auth, Activate,setUserData,setAdmin}=useGlobalContext();
    const tempRefresh = useRef();
      async function refreshAndStore(){
            try{
               const  {data} = await refresh();
               setUserData(data.user);
               Auth(data.auth);
               Activate(data.activate);
               setAdmin(data.isAdmin);
               setLoading(false);
               
            }catch(err){
                console.log(err);
                Auth(false)
                Activate(false)
                setUserData(null);
                setLoading(false)
                setAdmin(false);
             }
       }
       tempRefresh.current = refreshAndStore;
       useEffect(()=>{
           tempRefresh.current();
       },[])
       
    return {loading};
}
export const updating = useLoadingWithRefresh;