import React, { useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router'
import {getProfile} from '../../http/index';
import {Loader,Copyright,BusinessAdvertiseCard} from '../../import';
import Styles from '../Profile/Member/Member.module.css';
import styles from '../Profile/ProfileInfo/ProfileInfo.module.css';
import pStyles from '../Profile/ProfileAdvertise/ProfileAdvertise.module.css';

const VisitProfile = () => {
    const {publicUrl} = useParams();
    const [memberData,setMemberData]= useState(null);
    const [loading,setLoading]=useState(true);
    const [message,setMessage]=useState('');
    const tempMember = useRef();
     async function getMemberData(){
       setLoading(true);
       const {data} = await getProfile({publicUrl});
       if(data.next === false){
         setMessage('members not found !');
       }else{
          setMemberData(data);
       }
       setLoading(false);
    }
    tempMember.current=getMemberData;
    useEffect(()=>{
        document.title='Member - Digital Society'
      tempMember.current();
    },[])
    return loading ? <Loader message='loading please wait ...'/> : <>
        <div className='container container-margin-top'>
        {
            !memberData ? <p style={{color:'red',fontWeight:'600',textAlign:'center'}}>{message}</p>
            : 
            <>
                {/* profile Info */}
                <div className={styles.profileWrapper} style={{marginTop:'15px'}} >
                    <div className={styles.profile}>
                        <div className={styles.img}>
                            <img src={memberData.profileImg} alt="" />
                        </div>
                    <div className={styles.info}>
                         <h2>{memberData.familyName}</h2>
                         <p>House No : <span>{memberData.houseNo}</span></p>
                         <p>Total Members : <span>{memberData.totalMembers}</span></p>
                         <p className={styles.proffession}>{memberData.proffession}</p>
                         <p style={{marginBottom:'10px'}}>{memberData.proffessionDiscription}</p>
                         <p className={styles.contact}><i className="fas fa-phone-alt"></i>{memberData.phoneNo}</p>
                         <p className={styles.contact}><i className="fas fa-envelope"></i>{memberData.email}</p>
                    </div>
                    </div>
                </div>
                {/* members */}
                <div className={`${Styles.memberWrapper}`}>
                <h2 className="heading">Family Members</h2>
                 { !memberData.members.length > 0 ? <p style={{color:'var(--primary-text)',fontWeight:'600'}}>No members yet</p> : 
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
                            </tr>
                        </thead>  
                        <tbody>
                            {
                                memberData.members.map((member,index)=>{
                                    return <tr key={index}>
                                        <td className={Styles.r1}>{index + 1}</td>
                                        <td className={Styles.r2}><img src={member.img} alt='' /></td>
                                        <td className={Styles.r3}>{member.name}</td>
                                        <td className={Styles.r4}>{member.relation}</td>
                                        <td className={Styles.r5}>{member.proffession}</td>
                                        <td className={Styles.r6}>{member.age}</td>     
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                  </div>
               }
           </div>
                {/* business Advetise */}
                <div className={pStyles.advertiseWrapper}>
                <h2 className="heading">Business Advertise</h2>
                 { !memberData.advertises.length >0 ? <p style={{color:'var(--primary-text)',fontWeight:'600'}}>No advertise yet</p> : 
                <div className={` ${pStyles.cardList}`}>
                    { memberData.advertises.map((advertise,index) => {
                        return  <BusinessAdvertiseCard key={index} {...memberData} date={advertise.date} 
                                discription={advertise.discription} dataAos='fade-up' advertiseImg={advertise.img} />
                                
                            })
                    }
                </div>
                }   
               </div>
           </>
        }      
         </div>
        <Copyright/>
    </>
}

export default VisitProfile
