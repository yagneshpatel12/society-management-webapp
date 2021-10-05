import { useState } from 'react';
import { useGlobalContext } from '../../../context/context';
import {changePassword} from '../../../http/index'
import Styles from './ChangePasswordStep.module.css';
import { Loader } from '../../../import';
const ChangePasswordStep = ({onNext}) => {
    const {changepassUser}= useGlobalContext();
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState({
        otp:'',
        newPassword:''
    })
    const [message,setMessage]=useState('');
   async function submit(e){
      e.preventDefault();
      setLoading(true);
      if(data.otp.length === 4){  
          const newData = {...data,...changepassUser};
          const {data:dataa} = await changePassword({data:newData});
          if(dataa.next){
              setMessage('')
              onNext();
          }else{
              setMessage(dataa.message)
          }
      }else{ 
      return setMessage('enter valid otp !')}
      setLoading(false);
   }
    const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='otp' && value.length>4) return;  
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
    return loading ? <Loader message='Updating...' type='true'/>:(
        <>
               <div className={`box-shadow ${Styles.changePassword}`}>
                   <h3><i className="fas fa-lock"></i>
                    Enter the code we just <br/>email you </h3>
                    <p style={{color:'red',margin:'10px 0px'}}>{message}</p>
                    <form onSubmit={submit}>
                        <label>OTP</label>
                    <input type="number"
                     onChange={handleChange}
                     value={data.otp}
                     name="otp"
                     required autoFocus
                       style={{marginBottom:'10px'}}/>
                        <p 
                    style={{fontSize:'13px',fontWeight:'500',marginTop:'-5px',marginBottom:'10px',color:'green' }}>otp valid for 3 minutes.</p>
                    <label >new Password</label>
                    <input type="password"
                    autoComplete="off"
                    name="newPassword"
                     onChange={handleChange}
                     value={data.newPassword}
                     required
                    />
                   
                    <button type='submit' className={`btnStructure ${Styles.nextBtn}`}>
                        <span>update password</span>

                    </button>
                </form>
               </div>
        </>
    )
}

export default ChangePasswordStep;
