import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import {userOperations} from '../../../http/index'
import {Loader,BusinessAdvertiseCard} from '../../../import'
import Styles from './ProfileAdvertise.module.css';

const ProfileAdvertise = ({user}) => {
    const [isOpen,setIsOpen]=useState(false);
    const [message,setMessage]=useState('');
    const history = useHistory();
    const [loading,setLoading]=useState(false);
    const [unMounted, setUnMounted] = useState(false);
    const [newAdvertiseData,setNewAdvertiseData]=useState({
        img:'',
        discription:'',
    })
    const isEmpty = (user.advertises.length === 0 ? true : false);
    
    //functions
    function handleChange(e){
        const { name, value } = e.target;
        setNewAdvertiseData((prevData) => {
            return { ...prevData, [name]: value };
        });
    }
    function captureImg(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
            setNewAdvertiseData((prevData) => {
                return { ...prevData, img: reader.result };
            });
        };
    }
    async function submit(e){
        e.preventDefault();
        if(!newAdvertiseData.img) return setMessage('please upload image..');
        if(newAdvertiseData.discription.length < 100 ) return setMessage('discription too short !');
        if(newAdvertiseData.discription.length > 140 ) return setMessage('discription too long !');
        const date = getDate();
        setLoading(true);
        newAdvertiseData.date =date;
         const reqData = {operationName:'add',fieldName:'advertises',dbData:{...newAdvertiseData}};
        const {data}= await userOperations({data:reqData});
        if(!data.next){
            setMessage(data.message);
        }
        else{
            setIsOpen(!isOpen);
            history.push('/register')
        }
        setLoading(false);
    }
    function getDate(){
        const date = new Date();  // 2009-11-10
        const curentDate = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return(`${curentDate} ${month} ${year}`);
    }
    async function deleteadvertise(advertise){
         const reqData = {operationName:'delete',fieldName:'advertises',dbData:advertise};
        const {data} = await userOperations({data:reqData});
        if(!data.next){
            setMessage(data.message);
        }
        else{
            if(!unMounted){
                setIsOpen(!isOpen);
                history.push('/register')
            }
        }
    }
     useEffect(() => {
        return () => {
            setUnMounted(true);
        };
    }, []);
    return (
        <>
             <div className={Styles.advertiseWrapper}>
                 <h2 className="heading">Business Advertise</h2>
                 {
                     loading ? <Loader message='updating...' type="true"/> : <>
                
                 {
                     //showing Advertise
                     !isEmpty && !isOpen && (<>
                           <div className={` ${Styles.cardList}`}>
                                { user.advertises.map((advertise,index) => {
                                    return <div className={Styles.cardWrapperForDelete}  key={index}>
                                        <span onClick={()=> deleteadvertise(advertise)} >
                                       <i data-aos="fade-up"  style={{color:'red',cursor:'pointer'}} className="fas fa-trash"></i>
                                        </span>
                                        <BusinessAdvertiseCard {...user} date={advertise.date} 
                                    discription={advertise.discription} dataAos='fade-up' advertiseImg={advertise.img} />
                                    </div>
                                })
                      }
                     </div>
                     <button className='btnStructure' onClick={()=>setIsOpen(!isOpen)}>Create Advertise</button> </>)
                }
                 {
                     //showing Advetise form
                     isOpen && (
                        <form onSubmit={submit} className='box-shadow'>
                            <p style={{color:'red',margin:'10px auto',fontWeight:'600'}}>{message}</p>
                           <div className={Styles.cancel} onClick={()=>setIsOpen(!isOpen)}>
                           <i className="fas fa-times-circle"></i>
                            </div>
                           <div className={Styles.imgWrapper} >
                               <div className={Styles.imgDiv} style={ !newAdvertiseData.img ? {border:'4px dotted var(--main-color)'} : {}}>
                                   {
                                       newAdvertiseData.img ? <img src={newAdvertiseData.img} alt="" /> : <p>Advertise Img</p>
                                   }
                                     
                               </div>
                               <div className={Styles.inputDiv}>
                                   <label htmlFor="advertiseImg">upload a advertise img</label>
                                   <input type="file" id='advertiseImg'  accept="image/png, image/jpg, image/jpeg"
                                   onChange={captureImg} />
                               </div>
                           </div>
                           <div className={Styles.discription}>
                               <label>Advertise Discription</label>
                               <textarea name="discription" required
                               placeholder='write About your advertise details around 20-30 words.' 
                               onChange={handleChange} value={newAdvertiseData.discription} 
                               rows="5" />
                           </div>
                            <button type='submit' className='btnStructure'>Create Advertise</button>
                        </form>
                     )
                }
                 {
                     //showing nothing when no member add
                     isEmpty && !isOpen && (<>
                        <p className={Styles.advertiseDisc}>As there are no advertise presently.you can add your business related advertise by clicking below.</p>
                        <button className='btnStructure' onClick={()=>setIsOpen(!isOpen)}>Create Advertise</button> </>
                     )
                }
                </>
}
             </div>
         </>
     )
 }
 
 export default ProfileAdvertise
 