import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import OtpStep from './Steps/OtpStep/OtpStep';
import UserDetailsStep from './Steps/UserDetailsStep/UserDetailsStep';
import EmailHouseNoStep from './Steps/EmailHouseNoStep/EmailHouseStepNo';
import Styles from './Register.module.css';

const steps={
    1:EmailHouseNoStep,
    2:OtpStep,
    3:UserDetailsStep, 
}
const Register = ({step}) => {
    const[stepNumber,setStepNumber] = useState(step);
    const[progress,setProgress]=useState(stepNumber)
    const {isAuth} = useGlobalContext();
    let CurrentStep = steps[stepNumber];
    if(isAuth){
        CurrentStep =steps[3];
    }
  useEffect(()=>{
 if(isAuth){
        let r = document.querySelector(':root');
         r.style.setProperty('--width-first','100%')
         r.style.setProperty('--width-second','100%')
         let dot = document.getElementsByClassName('dot');
       let text = document.getElementsByClassName('text');
       for(let i=1;i<3;i++){
           dot[i].style.background='var(--main-color)';
       dot[i].style.color='var(--white)';
           text[i].style.color='var(--main-color)';
       }
   }
  },[isAuth])
   function onProgress(){
       setProgress(progress + 1);
       let dot = document.getElementsByClassName('dot')[progress > 2 ? 1 : progress];
       let text = document.getElementsByClassName('text')[progress > 2 ? 1 : progress];
       text.style.color='var(--main-color)';
       dot.style.background='var(--main-color)';
       dot.style.color='var(--white)';
       let r = document.querySelector(':root');
       if(progress===1){
          r.style.setProperty('--width-first','100%')
       }
       if(progress===2){
         r.style.setProperty('--width-second','100%')
       }
   }
    function onNext() {
       setStepNumber(stepNumber + 1);
    }
    useEffect(()=>{
       document.title='Register - Digital Society'
    },[])
    return (
        <>
            <div className={` ${Styles.registerWrapper} container container-margin-top`}>
               <h1 className='secondary-heading'>Register Your Family</h1>
               <div className={`${Styles.progress}`}>
                   <p className={`${Styles.dot} dot`}> 1</p>
                   <p className={`${Styles.line} line1 `}> </p>
                   <p className={`${Styles.dot} dot`}>2 </p>
                    <p className={`${Styles.line} line2`}> </p>
                   <p className={`${Styles.dot} dot`}> 3</p>
               </div>
               <div className={`${Styles.text}`}>
                 <p className='text'>Account setup</p>
                 <p className='text'>Verify</p>
                 <p className='text'>Personal Details</p>
               </div>
             <CurrentStep onNext={onNext} onProgress={onProgress} />
            </div>
        </>
    )
}

export default Register
