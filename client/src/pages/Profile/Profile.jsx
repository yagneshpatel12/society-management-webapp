import Member from './Member/Member';
import ProfileAdvertise from './ProfileAdvertise/ProfileAdvertise';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useLoadingWithRefresh} from '../../useLoadingWithRefresh/useLoadingWithRefresh';
import { useGlobalContext } from '../../context/context'
import { Loader,Copyright } from '../../import';
import { useEffect } from 'react';
const Profile = () => {
    const {user}=useGlobalContext();
    const {loading}=useLoadingWithRefresh();
     useEffect(()=>{
       document.title='Profile - Digital Society'
     },[])
    return loading ? <Loader message="Loading, please wait.." /> 
    : (
        <>
         <div className="container container-margin-top">
           <ProfileInfo user={user}  />
           <Member members={user.members} />
           <ProfileAdvertise user={user}/>     
        </div>
        <Copyright/>   
        </>
    )
}

export default Profile
