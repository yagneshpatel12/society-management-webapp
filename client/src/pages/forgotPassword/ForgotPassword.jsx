import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useGlobalContext } from '../../context/context'
import EmailStep from './EmailStep/EmailStep'
import ChangePasswordStep from './ChangePasswordStep/ChangePasswordStep'
import Succesfull from './Successful/Successful';

const forgotSteps ={
    1:EmailStep,
    2:ChangePasswordStep,
    3:Succesfull
}
const ForgotPassword = () => {
    const {isActivate,isAuth}=useGlobalContext();
    const [step,setStep]=useState(1);
    const history = useHistory()
    const CurrentStep = forgotSteps[step];
     if(isAuth && isActivate){
      history.push('/');
  }
    function onNext(){
       setStep(step + 1);
    }
    useEffect(()=>{
      document.title='Change password - Digital Society'
    },[])
    return (
        <>
           <div className="container container-margin-top">
               <h1 className='secondary-heading'>Change password</h1>
               <CurrentStep onNext={onNext}/>
           </div>
        </>
    )
}

export default ForgotPassword
