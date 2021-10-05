import { useState,useEffect } from 'react';
import Style from './Members.module.css';
import Loader from '../../../../components/shared/Loader/Loader';
import Searchbar from '../../../../components/shared/Searchbar/Searchbar';
import { getMembers,deleteUser} from '../../../../http';
import Styles from '../../../../pages/AllMembers/AllMembers.module.css'

const Advertises = () => {

    // states
    const [membersData,setMembersData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState('');
    const [searchInput,setSearchInput]=useState('');

    function searchInputValue(data){
        setSearchInput(data);
    }

    async function removeUser(houseNo){
      setLoading(true);
      const {data} = await deleteUser({houseNo:houseNo});
      if(data.next){
        getMembersData();
      }
    }
    //functions
    async function getMembersData(){
    setLoading(true);
    const {data} = await getMembers();
    if(data){
      data.length <1 ? setMessage('No member Yet !') : setMessage('');
      setMembersData(data);
    }
    setLoading(false);
  }
  
  useEffect(()=>{
   getMembersData()
  },[])
     useEffect(()=>{
         if(!loading){
     if(searchInput.length>0){
       let count = document.getElementsByClassName('count').length;
       let table = document.getElementsByClassName('table')[0];
       if(count > 0){
         table.style.display='block'
         setMessage('')
       }else{
         if(table)  table.style.display='none'
          setMessage('members not found !')
       }
     }
    }
    
  },[loading,searchInput]);

    return loading ? <Loader message='Loading....' type='true'/> : (
        <>
            <div className={Style.membersWrapper}>
                <h2 className='heading'>All Members</h2>
                   <Searchbar searchInput={searchInput} searchInputValue={searchInputValue}/>
                  {
                    message ? <p className='invalid'>{message}</p> : 
                    
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
                               <td className={Styles.r5} onClick={()=>removeUser(member.houseNo)} >remove</td>
                            </tr>
                          }return null;
                        })
                    } 
                </tbody>
            </table>
          
        </div>
}
           </div>
        </>
    )
}

export default Advertises
