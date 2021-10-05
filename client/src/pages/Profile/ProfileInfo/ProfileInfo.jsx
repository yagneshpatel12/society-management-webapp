import { useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import { updateUser } from '../../../http';
import { defaultImg } from '../../../defaultImg';
import {Loader} from '../../../import';
import styles from './ProfileInfo.module.css';
import Styles from '../../RegisterPage/Steps/UserDetailsStep/UserDetailsStep.module.css'

 const ProfileInfo = ({user}) => {
     //states
    const [isOpen,setIsOpen]=useState(false);
    const [isChange,setIsChange]=useState(false);
    const [message,setMessage] = useState('');
    const history = useHistory();
    const [userData,setUserData]=useState({});
    const [loading,setLoading]=useState(false);
    const [unMounted,setUnMounted]=useState(false);

    //functions
    function handleChange(e){
        setIsChange(true);
        const { name, value } = e.target;
        setUserData((prevData) => {
           return { ...prevData, [name]: value };
        });
    }
    function captureImg(e){
        setIsChange(true)
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
            setUserData((prevData) => {
              return { ...prevData, profileImg: reader.result };
            });
        };
    }
     function upbihar(){
        setUserData({
        familyName:user.familyName || '',
        phoneNo:user.phoneNo || '',
        totalMembers:user.totalMembers || '',
        proffession:user.proffession || '',
        proffessionDiscription:user.proffessionDiscription || '',
        profileImg: user.profileImg || defaultImg,
        })
    }
    async function submit(e){
        e.preventDefault();
        setLoading(true);
        if (!isChange) return setIsOpen(false);
        if(isNaN(userData.phoneNo)) return setMessage('Please enter Valid Phone no');
        if(isNaN(userData.totalMembers) && userData.totalMembers > 15)
        return setMessage('Please enter Valid total members');
        // checking changes
        const key = Object.keys(userData);
        const updateData={};
        for(let i=0;i<key.length;i++){
            const entity = key[i];
            if(!(userData[entity] === user[entity])){
                updateData[entity]=userData[entity];
            }
        }
        const {data}= await updateUser({data:updateData});
        if(!data.next){
            setMessage(data.message);
            setLoading(false);
        }
        else{
            if(!unMounted){
                setIsOpen(!isOpen);
                history.push('/register')
                setLoading(false);
            }
        }
    }
    useEffect(()=>{
         return ()=>{
             setUnMounted(true);
         }
    },[])
     return (
         <>
             <div className={styles.profileWrapper}>
         {
               loading ?<Loader message='updating...' type='true' />: <>
               {/* Edit profile button */}
               <div className={styles.buttonWrapper}>
                {  isOpen ? <p onClick={()=>{setIsOpen(!isOpen); upbihar()}} style={{color:'var(--main-color)',fontWeight:'500',textAlign:'end',cursor:'pointer'}}>Back to Profile</p> 
                   :<button onClick={()=>{setIsOpen(!isOpen);upbihar()}} className='btnStructure'>Edit Profile</button>
                }
               </div>

               {/* Checking is open so open form or display profile page */}
               {
                isOpen ? 
                   <div>
                    <div className={`${Styles.step3}`}>
                        <form onSubmit={submit}>
                        <div className={`${Styles.personalDetails} box-shadow`}>
                            <p style={{color:'red',fontWeight:'500',textAlign:'center',marginBottom:'20px'}}>{message}</p>
                            <div className={`${Styles.profileImg}`}>
                               <p>How's that ?</p>
                               <div className={`${Styles.imgDiv}`}>
                               <img src={userData.profileImg} alt="" />
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
                            <button type='submit'  className={`btnStructure ${Styles.registerBtn}`}>Register</button>
                        </form>
                    </div>
                    </div>
                   : 
                    // dispay profile page
                    <div className={styles.profile}>
                        <div className={styles.img}>
                            <img src={user.profileImg} alt="" />
                        </div>
                    <div className={styles.info}>
                         <h2>{user.familyName}</h2>
                         <p>House No : <span>{user.houseNo}</span></p>
                         <p>Total Members : <span>{user.totalMembers}</span></p>
                         <p className={styles.proffession}>{user.proffession}</p>
                         <p style={{marginBottom:'10px'}}>{user.proffessionDiscription}</p>
                         <p className={styles.contact}><i className="fas fa-phone-alt"></i>{user.phoneNo}</p>
                         <p className={styles.contact}><i className="fas fa-envelope"></i>{user.email}</p>
                    </div>
                    </div>
                }
                </>
                }
           </div>
        </>
     )
 }
 
 export default ProfileInfo
 