import { useEffect, useState,useRef } from "react";
import {useHistory} from "react-router-dom";
import { getMembers } from "../../http";
import {Loader,Copyright} from '../../import'
import Styles from "./AllMembers.module.css";
import styles from "../BuinessAdvertisePage/BusinessAdvertisePage.module.css"

const AllMembers = () => {
  const [membersData,setMembersData]=useState('');
  const [loading,setLoading]=useState(true);
  const [searchInput,setSearchInput]=useState('');
  const [message,setMessage]=useState('');
  const data = useRef();
  const history = useHistory()
  //functions
  async function getMembersData(){
    setLoading(true);
    const {data} = await getMembers();
    if(data){  
      setMembersData(data);
      data.length <1 ?setMessage('no members yet') : setMessage('')
    }
    setLoading(false);
  }
  data.current=getMembersData;
  useEffect(()=>{
   data.current();
   document.title='All members - Digital Society'
  },[])
  useEffect(()=>{
     if(searchInput.length>0){
       let count = document.getElementsByClassName('count').length;
       let table = document.getElementsByClassName('table')[0];
       if(count > 0){
         table.style.display='block'
         setMessage('')
       }else{
          table.style.display='none'
          setMessage('members not found !')
       }
     }
    
  },[searchInput])
  return (
    <>
    {
        loading ? <Loader message='loading please wait ...'/> : <>
      <div className={`container container-margin-top ${Styles.allMembersWrapper}`}>
        <h2 className="heading">All society members</h2>
         <div className={`box-shadow ${styles.searchbar}`}>
          <input type="text" placeholder="Search by family name" 
       value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}
          />
          <button className={`btnStructure ${styles.btn}`}>
            <i className="fas fa-search"></i>
          </button>
        </div>
       
        <p style={{marginTop:'50px',color:'red',fontWeight:'600',textAlign:'center'}}>{message}</p>
        <div className={`${Styles.memberTable} table`}>
            <table className='box-shadow'>
                <thead>
                    <tr>
                        <th className={Styles.r1}>House no</th>
                        <th className={Styles.r2}>Photo</th>
                        <th className={Styles.r3}>Family name</th>
                        <th className={Styles.r4}>proffession</th>
                        <th className={Styles.r5}> </th>
                    </tr>
                </thead>
                <tbody >
                    {
                      membersData.map((member,index)=>{
                          if(!member.familyName) return null;
                          if(member.familyName.includes(searchInput)){
                            return <tr key={index} className='count'>
                                <td className={Styles.r1}>{member.houseNo}</td>
                                <td className={Styles.r2}><img src={member.profileImg} alt="" /></td>
                                <td className={Styles.r3}>{member.familyName}</td>
                                <td className={Styles.r4}>{member.proffession}</td>
                               <td className={Styles.r5} onClick={()=>history.push(`/allmembers/${member.publicUrl}`)}>visit</td>
                            </tr>
                          }return null;
                        })
                    } 
                </tbody>
            </table>
          
        </div>
      </div>
    </>
 }
      <Copyright />
    </>
  );
};

export default AllMembers;
