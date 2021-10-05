import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import {userOperations} from '../../../http/index'
import Styles from './Member.module.css';
import { Loader } from '../../../import';
import { defaultImg } from '../../../defaultImg';
 const Member = ({members}) => {
     const [isOpen,setIsOpen]=useState(false);
     const [message,setMessage]=useState('');
     const history = useHistory();
    const [loading,setLoading]=useState(false);
    const [unMounted, setUnMounted] = useState(false);
     const [newMemberData,setNewMemberData]=useState({
         img: defaultImg,
         name:'',
         relation:'',
         gender:'',
         age:'',
         proffession:''
     })
     const isEmpty = (members.length === 0 ? true : false);
     //functions
     function handleChange(e){
        const { name, value } = e.target;
        setNewMemberData((prevData) => {
           return { ...prevData, [name]: value };
        });
    }
    function captureImg(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
            setNewMemberData((prevData) => {
              return { ...prevData, img: reader.result };
            });
        };
    }
    async function submit(e){
        e.preventDefault();
        setLoading(true);
        const reqData = {operationName:'add',fieldName:'members',dbData:{...newMemberData}};
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
    async function deltemember(member){
        setLoading(true);
        const reqData = {operationName:'delete',fieldName:'members',dbData:member};
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
        setLoading(false)
    }
      useEffect(() => {
        return () => {
            setUnMounted(true);
        };
    }, []);
     return (
         <>
             <div className={`${Styles.memberWrapper}`}>
                 <h2 className="heading">Family Members</h2>
                 {
               loading ?<Loader message='updating...' type='true' />: <>
                {
                     //showing members table
                     !isEmpty && !isOpen && (<>
                    <div className={`${Styles.memberTable} box-shadow`}>
                    <table>
                        <thead>
                            <tr>
                                <th className={Styles.r1}>No</th>
                                <th className={Styles.r2}>Photo</th>
                                <th className={Styles.r3}>Name</th>
                                <th className={Styles.r4}>Relation</th>
                                <th className={Styles.r5}>Proffession</th>
                                <th className={Styles.r6}>Age</th>
                                <th className={Styles.r7}></th>
                            </tr>
                        </thead>  
                        <tbody>
                            {
                                members.map((member,index)=>{
                                    return <tr key={index}>
                                        <td className={Styles.r1}>{index + 1}</td>
                                        <td className={Styles.r2}><img src={member.img} alt='' /></td>
                                        <td className={Styles.r3}>{member.name}</td>
                                        <td className={Styles.r4}>{member.relation}</td>
                                        <td className={Styles.r5}>{member.proffession}</td>
                                        <td className={Styles.r6}>{member.age}</td> 
                                        <td className={Styles.r7} onClick={()=>deltemember(member)}><i style={{color:'red'}} className="fas fa-trash"></i></td>       
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                  </div>
                  <button className='btnStructure' onClick={()=>setIsOpen(!isOpen)}>Add Family Member</button> </>)
                }
                {
                     //showing members form
                     isOpen && (
                         <form onSubmit={submit}>
                        <div className={`${Styles.memberDetails} box-shadow`}>
                            <div className={Styles.cancel} onClick={()=>setIsOpen(!isOpen)}>
                           <i className  ="fas fa-times-circle"></i>
                            </div>
                            <p style={{color:'red',fontWeight:'500',textAlign:'center'}}>{message}</p>
                            <div className={`${Styles.memberImg}`}>
                               <div className={`${Styles.imgDiv}`}>
                               <img src={newMemberData.img} alt="" />
                               </div>
                               <label htmlFor="memberimg">choose a different photo</label>
                               <input type="file" id='memberimg'  accept="image/png, image/jpg, image/jpeg"
                                onChange={captureImg}
                                />
                            </div>
                            <div className={Styles.formInputWrapper}>
                            <div className={`${Styles.setWidth}`}>
                                <label>Name</label>
                                <input type="text" 
                                name="name"
                                value={newMemberData.name}
                                onChange={handleChange}
                                placeholder="tony stark"
                                required/>
                            </div>
                            <div className={`${Styles.setWidth}`}>
                                <label>Relation</label>
                                <input type="text" 
                                name='relation'
                                value={newMemberData.realtion}
                                onChange={handleChange}
                                placeholder='father'
                                required
                              />
                            </div>
                            <div className={`${Styles.setWidth}`}>
                                <label>Gender</label>
                                <input type="text" 
                                name='gender'
                                value={newMemberData.gender}
                                onChange={handleChange}
                                placeholder='male'
                                required/>
                            </div>
                            <div className={`${Styles.setWidth}`}>
                                <label>Age</label>
                                <input type="text" 
                                name="age"
                                value={newMemberData.age}
                                onChange={handleChange}
                                required
                                placeholder='34'
                                />
                            </div>
                            <div className={Styles.lastInput}>
                                <label>Proffession</label>
                                <input 
                                name="proffession"
                                value={newMemberData.proffession}
                                onChange={handleChange}
                                required
                                placeholder='business men'
                                />
                            </div>
                        </div>
                            <button type='submit'  className={`btnStructure ${Styles.registerBtn}`}>Add Member</button>
                        </div>
                        </form>
                     )
                }
                {
                     //showing nothing when no member add
                     isEmpty && !isOpen && (<>
                        <p>As there are no member presently.you can register your house members by clicking below.</p>
                        <button className='btnStructure' onClick={()=>setIsOpen(!isOpen)}>Add Family Member</button> </>
                     )
                }
                </>
 }
             </div>
         </>

     )
 }
 
 export default Member;
 