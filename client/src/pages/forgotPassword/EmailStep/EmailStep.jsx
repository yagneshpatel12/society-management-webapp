import { useState,useEffect } from 'react';
import { forgotPassword } from '../../../http';
import { useGlobalContext } from '../../../context/context';
import Styles from './EmailStep.module.css';
import { Loader } from '../../../import';
const EmailStep = ({onNext}) => {
    const [email,setEmail]=useState('');
    const {setChangePassUSerData}=useGlobalContext();
    const [message,setMessage] = useState('');
    const [loading,setLoading]=useState(false);
    const [unMounted,setUnMounted]=useState(false);
    async function submit(e){
       e.preventDefault();
       setLoading(true);
      const {data}= await forgotPassword({email});
      if(data.next){
          if(!unMounted){
          setChangePassUSerData(data);
          setMessage('');
          onNext();
          }
      }
      else{
          setMessage(data.message);
      }
setLoading(false);
    }
    useEffect(()=>{
 return ()=>{
          setUnMounted(true);
      }
  },[])
    return loading ? <Loader message='Verifying...' type='true'/>: (
        <>
            <div className={` box-shadow ${Styles.emailStep}`}>
                <h3><i className="fas fa-envelope"></i>
                    Enter your register <br /> email </h3>
                     <p style={{color:'red',margin:'10px 0px'}}>{message}</p>
                <form onSubmit={submit}>
                    <input type="email"
                     onChange={(e)=>{setEmail(e.target.value)}}
                     value={email} autoFocus
                     placeholder='example@gmail.com'
                     required />
                    <button type='submit' className={`btnStructure ${Styles.nextBtn}`}>
                        <span>Next</span>
                        <img src="./images/icons/arrow.svg" alt="" />
                    </button>
                </form>
            </div>
        </>
    )
}

export default EmailStep;
