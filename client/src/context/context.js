import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const[isAuth,setIsAuth]=useState(false)
    const[isActivate,setIsActivate]=useState(false)
    const [user,setUser]=useState(null);
    const [registerSteps,setRegisterSteps]=useState(1);
    const [isUpdate,setIsUpdate]=useState(true);
    const [isAdmin,setIsAdmin]=useState(false);
    const [tempAdmin,setTempAdmin]=useState(null);
    const setAdmin =(data)=> setIsAdmin(data);

    const [changepassUser,setChangePassUSer]=useState({
      hash:'',
      email:'',
    })
    const [verifyUser,setVerifyUser]=useState({
      email:'',
      houseNo:'',
      societyCode:'',
      hash:''
    })
    const tempAdminData=(data)=>{
      setTempAdmin(data);
    }
    const setChangePassUSerData=({hash,email})=>{
      setChangePassUSer({hash,email});
    }
    const setVerifyUserDetails = ({email,houseNo,hash,societyCode})=>{
        setVerifyUser({email:email,houseNo:houseNo,hash:hash,societyCode:societyCode});
    }
    const Auth = (value) => {
       setIsAuth(value)
    };
    const Activate = (value) => {
        setIsActivate(value)
    };
    const setUserData = (data) => {
        setUser(data);
    };
    const RegisterStepsNext=(number)=>{
        setRegisterSteps(number);
    }

  
  return (
    <AppContext.Provider
      value={{
        isAuth,
        isActivate,
        user,
        registerSteps,
        verifyUser,
        isAdmin,
        setAdmin,
        tempAdminData,
        tempAdmin,
        isUpdate,
        setChangePassUSerData,
        changepassUser,
        setIsUpdate,
        Auth,
        Activate,
        setUserData,
        RegisterStepsNext,
        setVerifyUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
