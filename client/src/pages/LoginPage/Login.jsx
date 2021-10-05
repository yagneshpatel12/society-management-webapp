import { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {login} from '../../http/index';
import { useGlobalContext } from '../../context/context';
import { Loader } from '../../import';
import Styles from './Login.module.css';

const Login = () => {
    const {Auth,Activate,setAdmin}=useGlobalContext();
    const [show,setShow]=useState(false);
    const[message,setmessage]=useState('');
    const [loading,setLoading]=useState(false);
    const history = useHistory();
    const [unMounted, setUnMounted] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  }); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
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
  async function submit(e){
      e.preventDefault();
      setLoading(true);
      const {email , password}=loginFormData;
if(email && password){
     const {data} = await login({data:loginFormData});
     if(data.next === false){
         setmessage(data.message);
         setLoading(false)
        }
        else{
            if(!unMounted){
                if(data.isAdmin){
                   setAdmin(true);
                   history.push(data.path);
                }else{
            Auth(data.auth);
            Activate(data.activate);
            setmessage('');
            setLoading(false);
            history.push('/profile');}
        }
     }
}
else{
    setmessage('please fill the valid details !')
}
  }
  useEffect(()=>{
      document.title='Login - Digital Society'
 return ()=>{
          setUnMounted(true);
      }
  },[])
     return loading ? (
        <Loader message="Logging.." />
    ) : (
        <>
            <div className={`container container-margin-top`}>
                <div className={`${Styles.loginWrapper} box-shadow loginPointer`}>
                    <h1 className={`${Styles.loginHeading}`}>
                        <img src="./images/icons/hand.png" alt="" />
                        <span className=' secondary-heading'>Welcome Back</span>
                    </h1>
                    <p className={`${Styles.message}`}>{message}</p>
                    <form onSubmit={submit} data-aos="zoom-in" >
                        <label htmlFor="email">Email</label>
                        <div className={`${Styles.loginInput}`}>
                          <i className="far fa-user"></i>
                            <input type="email" 
                            required autoFocus
                            name="email" value={loginFormData.email} onChange={handleChange}/>
                        </div>
                        <label htmlFor="password">password</label>
                        <div  className={`${Styles.loginInput}`}>
                           <i className="fas fa-key"></i>
                            <input type="password" autoComplete="false" required name="password" id='password' value={loginFormData.password} onChange={handleChange} />
                            
                            { show ?  <i className="fas fa-eye" onClick={showPassword}></i> :<i className="fas fa-eye-slash"  onClick={showPassword}></i>
                            }
                        </div>
                        <p className={`${Styles.forgotPassword}`} onClick={()=>history.push('/forgotpassword')}>Forgot Password?</p>
                        <button type='submit' className={`btnStructure ${Styles.loginBtn}`}>Login</button>
                        <p className={`${Styles.registerLink}`}>New family ? <Link to='/register'> &nbsp;Register Here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
