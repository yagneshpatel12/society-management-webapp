import { useEffect, useRef, useState } from "react";
import { verifyOtp,sendOtp } from "../../../../http/index";
import { useGlobalContext } from "../../../../context/context";
import Styles from "./OtpStep.module.css";
import { Loader } from "../../../../import";
const Step2 = ({onProgress}) => {
    const {verifyUser,Auth,setVerifyUserDetails}=useGlobalContext();
  const[otp,setOtp]=useState(new Array(4).fill(""));
  const [loading,setLoading]=useState(false);
  let countdown=180;
  const[domTime,setDomTime]=useState(countdown);
  const countdownRef = useRef();
  const[message,setMessage]=useState('');
  const [loadingMessage,setLoadingMessage]=useState('')
      const [unMounted, setUnMounted] = useState(false);
  const handleChange=(element,index)=>{
            if(element.value >9) return false;
            setOtp([...otp.map((d,idx)=>(idx===index ? element.value : d))])
            if(element.nextSibling && element.value){
            element.nextSibling.focus();
            }    
  }
 async function submit(e){
       e.preventDefault();
       const otpString = otp.join('');
       const {email,hash,houseNo}=verifyUser;
       if(otpString.length===4 && email && hash && houseNo){
           setLoading(true);
           setLoadingMessage('verifying..')
           const {data} = await verifyOtp({otp: otpString , email , hash , houseNo});
           if(data.next===false){
               setMessage(data.message);
               setOtp(new Array(4).fill(""));
               Auth(false);
               if(!unMounted){
                   document.getElementsByClassName('idiv')[0].focus();
               }

            }else{
                if(!unMounted){
                    onProgress();
                    Auth(true);
                    setMessage('');
                }
            }
       }
       else{
           setMessage('enter Valid Otp !');
           setOtp(new Array(4).fill(""));
        }
        setLoading(false);
        setLoadingMessage('')
       
  }
  async function resendOtp(){
      try{
          setLoading(true);
          setLoadingMessage('otp resending');
          const {email,houseNo,societyCode}=verifyUser;
        const {data} = await sendOtp({data:{email,houseNo,societyCode}});
        if(data.next === false){
            setMessage(data.message);
        }
        else{
            if(!unMounted){
                setVerifyUserDetails(data);
                countdown=180;
                setDomTime(countdown);
                setCountdown();
            }
        }
        setLoading(false);
        setLoadingMessage('')
      }catch(err){
          console.log(err)
      }
            
  }
  function setCountdown(){
 let countdownInterval=setInterval(()=>{
     if(!unMounted){
         countdown--;
         setDomTime(countdown);
         if(countdown === 0){
             clearInterval(countdownInterval);
        }
     }
      },1000);
  }
  countdownRef.current=setCountdown;
  useEffect(()=>{
    countdownRef.current()
   document.getElementsByClassName('idiv')[0].focus();
      return ()=>{
        setUnMounted(true);
      }
  },[])
    return loading ? <Loader message={loadingMessage} type='true' />:(
        <>
            <div className="container">
                  <div className={`${Styles.step2Wrapper} box-shadow`} data-aos='fade-right'>
                    <h3>
                      <i className="fas fa-lock"></i>
                        <span>Enter the code we just <br/>email you</span>
                    </h3>
                        <p style={{color:'red' ,marginTop:'10px',fontWeight:'500'}}>{message}</p>
                    <form onSubmit={submit}>
                   {
                       otp.map((data,index)=>{
                           return(
                               <input
                               className={`${Styles.inputOtp} idiv `}
                               type="number"
                               name="otp"
                               maxLength="1"
                               key={index}
                               value={data}
                               onChange={e=>handleChange(e.target,index)}
                               onFocus={e=>e.target.select()}
                               />
                           )
                       })
                   } 
                   {
                      domTime === 0 ? <p onClick={resendOtp}>didn't receive ? <span> Tap to resend</span></p>: <p className={Styles.otp}>{domTime}s</p>
                   }
                   <p className={Styles.notice}>There might be some delay in receiving <br /> the OTP.</p>
                    <button  type='submit' className={`btnStructure ${Styles.nextBtn}`}>
                      verify & proceed
                        <i className="fas fa-arrow-right"></i>
                    </button>
                    </form>
                  </div>
            </div>
        </>
    )
}

export default Step2;


