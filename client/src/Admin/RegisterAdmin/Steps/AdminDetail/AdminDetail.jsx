import { useState,useEffect } from "react";
import Styles from "../../RegisterAdmin.module.css"
import { defaultImg } from "../../../../defaultImg";
import {useGlobalContext} from '../../../../context/context';
import { useHistory } from "react-router";
import { registerAdmin } from "../../../../http";
import { Loader } from "../../../../import";
const AdminDetail = () => {
  const {setAdmin,tempAdmin}=useGlobalContext();
  const history = useHistory();
  const [message,setMessage]=useState('');
  const [loading,setLoading]=useState(false);
  const [unMounted, setUnMounted] = useState(false);
    const [formData,setFormData]=useState({
        otp:'',
        password:'',
        img:defaultImg,
    })
    const [show,setShow]=useState(false);
   async function submit(e){
      e.preventDefault();
      setLoading(true);
      const {data} = await registerAdmin({data:{...formData,...tempAdmin}});
      if(data.next === false){
        setMessage(data.message);
      }else{
        if (!unMounted) {
       setAdmin(true);
       history.push('/')}
      }
      setLoading(false);
    }
    function handleChange(e){
        const {name,value}=e.target;
       if(name==='otp' && (value.length > 4 || isNaN(value))) return;
        setFormData((prev)=>{
          return {...prev,[name]:value}
        })
    }
    function showPassword(){
      setShow(!show);
     let passInput = document.getElementById('password');
      if(!show){
      passInput.setAttribute('type','text');
      }
      else{
      passInput.setAttribute('type','password');
      }
  }
  function captureImg(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
             setFormData((prev)=>{
          return {...prev,img:reader.result}
        })
        };
    }
    useEffect(() => {
        return () => {
            setUnMounted(true);
        };
    }, []);
    return loading ? <Loader message='Registering...' type='true'/>: (
         <form onSubmit={submit} className='box-shadow'>
           <p className='invalid'>{message}</p>
                      <div>
                          <label htmlFor='email'>Otp</label>
                          <input 
                            type="text"
                            name='otp'
                            placeholder='1234'
                            value={formData.otp}
                            onChange={handleChange}
                            autoFocus
                            required />
                      </div>
                      <div>
                          <label htmlFor='password'>set Password</label>
                          <input 
                            type="password"
                            name='password'
                            placeholder='get code from your owner'
                            value={formData.password}
                            onChange={handleChange}
                            id='password'
                            autoComplete="off"
                            required />
                            <span>
                            { show ?  <i className="fas fa-eye" onClick={showPassword}></i> :<i className="fas fa-eye-slash"  onClick={showPassword}></i>}
                            </span>
                      </div>
                        <div className={`${Styles.profileImg}`}>
                               <div className={`${Styles.imgDiv}`}>
                               <img src={formData.img} alt="" />
                               </div>
                               <label htmlFor="profileimg" style={{textAlign:'center'}}>choose a different photo</label>
                               <input type="file" id='profileimg'  accept="image/png, image/jpg, image/jpeg" onChange={captureImg} />
                            </div>
                      <div style={{textAlign:'center'}}>

                       <button type='submit' className={`btnStructure ${Styles.nextBtn}`}>
                       Register
                        <i className="fas fa-arrow-right"></i>
                    </button>
                      </div>
                    </form>
    )
}

export default AdminDetail
