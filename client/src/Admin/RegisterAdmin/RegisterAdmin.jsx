import { useEffect, useState } from 'react';
import Styles from './RegisterAdmin.module.css';
import EmailStep from './Steps/EmailStep/EmailStep';
import AdminDetail from './Steps/AdminDetail/AdminDetail';
import { useGlobalContext } from '../../context/context';
import { useHistory } from 'react-router';

const steps={
  1:EmailStep,
  2:AdminDetail
}
const RegisterAdmin = () => {
  const [step,setStep]=useState(1);
  const {isAuth}= useGlobalContext();
  const history = useHistory();
  if(isAuth) history.push('/profile');
  const CurrentStep = steps[step];
  function onNext(){
      setStep(step + 1);
  }
   useEffect(()=>{
     document.title='Register Admin - Digital Society'
   },[])
    return (
        <> 
            <div className={`container container-margin-top ${Styles.registerAdmin}`}>
               <h1 className='secondary-heading'>Register Admin</h1>
                   <CurrentStep onNext={onNext}/>
            </div>
        </>
    )
}

export default RegisterAdmin
