import {useState,useEffect } from "react";
import {activate} from "../../../../http/index";
import { useGlobalContext } from "../../../../context/context";
import {defaultImg} from "../../../../defaultImg.js"
import {Loader} from "../../../../import";
import Styles from "./UserDetailsStep.module.css";

const Step3 = () => {
    const {Auth,Activate}=useGlobalContext();
    const [profileImg,setProfileImg]=useState(defaultImg);
    const [message,setMessage] = useState('');
    const [loading,setLoading]=useState(false);
    const [show,setShow]=useState(false);
    const [unMounted, setUnMounted] = useState(false);
    const [userData,setUserData]=useState({
        familyName:'',
        phoneNo:'',
        totalMembers:'',
        proffession:'',
        proffessionDiscription:'',
        password:'',
    })
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
    function handleChange(e){
          const { name, value } = e.target;
    setUserData((prevData) => {
      return { ...prevData, [name]: value };
    });
    }
    function captureImg(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
            setProfileImg(reader.result);
        };
    }
  
       async function submit(e){
        e.preventDefault();
        if(isNaN(userData.phoneNo)) return setMessage('Please enter Valid Phone no');
        if(isNaN(userData.totalMembers) && userData.totalMembers > 15)
        return setMessage('Please enter Valid total members');
        setLoading(true);
        const {data}= await activate({userData,profileImg});
        if(data.next === false){
            setMessage(data.message);
            setLoading(false);
        }
        else{
             if (!unMounted) {
            setMessage('');
            Auth(true);
            Activate(true);
            setLoading(false);
            }
        }
    }
        useEffect(() => {
        return () => {
            setUnMounted(true);
        };
    }, []);
   return loading ? (
        <Loader message="Activation in Progress.." type='true'/>
    ): (
        <>
                <div className={`${Styles.step3}`} data-aos='fade-right'>
                    <form onSubmit={submit}>
                        <div className={`${Styles.personalDetails} box-shadow`}>
                            <p style={{color:'red',fontWeight:'500',textAlign:'center',marginBottom:'20px'}}>{message}</p>
                            <div className={`${Styles.profileImg}`}>
                               <p>How's that ?</p>
                               <div className={`${Styles.imgDiv}`}>
                               <img src={profileImg} alt="" />
                               </div>
                               <label htmlFor="profileimg">choose a different photo</label>
                               <input type="file" id='profileimg'  accept="image/png, image/jpg, image/jpeg" onChange={captureImg}/>
                            </div>
                            <div>
                                <label>Family name</label>
                                <input type="text" 
                                name="familyName"
                                value={userData.familyName}
                                onChange={handleChange}
                                  placeholder="tony stark's family"
                                required/>
                            </div>
                            <div className={`${Styles.setWidth}`}>
                                <div>
                                <label>Phone NO</label>
                                <input type="text" 
                                name='phoneNo'
                                value={userData.phoneNo}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                placeholder='9546783982'
                                required
                              />
                                </div>
                                <div>
                                <label>Total members</label>
                                <input type="text" 
                                name='totalMembers'
                                value={userData.totalMembers}
                                onChange={handleChange}
                                placeholder='ex: 4'
                                required/>
                                </div>
                            </div>
                            <div>
                                <label>Proffession</label>
                                <input type="text" 
                                name="proffession"
                                value={userData.proffession}
                                onChange={handleChange}
                                required
                                placeholder='business men'/>
                            </div>
                            <div>
                                <label>Describe Your Proffession</label>
                                <textarea rows="5"
                                name="proffessionDiscription"
                                value={userData.proffessionDiscription}
                                onChange={handleChange}
                                required
                                placeholder='some of the details of your proffession'/>
                            </div>
                        </div>
                        <div className={`${Styles.securityDetails} box-shadow`}>
                            <p>Security Details</p>
                                <label>Set Password</label>
                                <div style={{marginTop:'10px'}}>
                                
                                <input type="password" 
                                name='password'
                                value={userData.password}
                                onChange={handleChange}
                                autoComplete="off"
                                id="password"
                                required />
                                <span>
                              
                                 { show ?  <i className="fas fa-eye" onClick={showPassword}></i> :<i className="fas fa-eye-slash"  onClick={showPassword}></i>
                            }
                                  
                                </span>
                                </div>
                        </div>
                    <button type='submit'  className={`btnStructure ${Styles.registerBtn}`}>Register</button>
                    </form>
                </div>
        </>
    )
}

export default Step3;
