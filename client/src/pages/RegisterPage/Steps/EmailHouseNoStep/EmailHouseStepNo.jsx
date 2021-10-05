import { useEffect, useState } from "react";
import {sendOtp} from "../../../../http/index";
import { useGlobalContext } from "../../../../context/context";
import Styles from "./EmailHouseNoStep.module.css";
import { Loader } from "../../../../import";
const Step1 = ({onNext,onProgress}) => {
    const {setVerifyUserDetails}=useGlobalContext();
    const [loading,setLoading]=useState(false);
    const [step1Data, setStep1Data] = useState({
    email: "",
    societyCode: "",
    houseNo: "",
  });
  const [unMounted,setUnMounted]=useState(false);
  const [message,setMessage]=useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStep1Data((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  async function submit(e){
    e.preventDefault();
    const {email,societyCode,houseNo}=step1Data;
    if(email && societyCode && !isNaN(houseNo)){
        setMessage('');
        setLoading(true);
        try{
            const {data} = await sendOtp({data:step1Data});
            if(data.next === false){
                setMessage(data.message);
            }
            else{
               if(!unMounted){
                onProgress();
                setVerifyUserDetails(data);
                setLoading(false);
                onNext();
               }
            }
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }
    else{
        setMessage('please fill the valid Details.');
    }
    setLoading(false)
  }
  useEffect(()=>{
      return () =>{
         setUnMounted(true);
      }
  },[])
    return loading ? <Loader message='Otp sending..' type='true'/>:(
        <>
            <div className={Styles.step1} data-aos='zoom-in'>
                <form  className='box-shadow' onSubmit={submit}>
                    <div className={`${Styles.formWrapper}`}>
                        <p>{message}</p>
                    <label htmlFor="email">Email</label>
                    <div className={`${Styles.step1Input} ${Styles.idiv}`} autoFocus>
                       <i className="fas fa-envelope"></i>
                        <input type="email" name="email" 
                        value={step1Data.email} onChange={handleChange}
                        required autoFocus
                        placeholder='example@gmail.com'/>
                    </div>
                    <label>Society Security Code</label>
                    <div className={`${Styles.step1Input} ${Styles.idiv}`}>
                        <i className="fas fa-user"></i>
                        <input type="text" name="societyCode" 
                        value={step1Data.societyCode} onChange={handleChange}
                        required
                        placeholder='ya83gye9'/>
                    </div>
                    <label>House No</label>
                    <div className={`${Styles.step1Input} ${Styles.idiv}`}>
                        <i className="fas fa-home"></i>
                        <input type="text" name="houseNo" value={step1Data.houseNo}
                        required placeholder='ex: 54' onChange={handleChange}/>
                    </div>
                    <button type='submit' className={`btnStructure ${Styles.nextBtn}`}>
                       Next
                        <i className="fas fa-arrow-right"></i>
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Step1;
