import { useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { logoutAdmin,adminSetting } from '../../http';
import { useGlobalContext } from '../../context/context';
//css
import Styles from './AdminPanel.module.css';
import '../../components/shared/Navbar/hamburger.css';

//Admin componets
import { Logo,Loader } from '../../import';
import Events from './Components/Events/Events';
import Members from './Components/Members/Members';
import Management from './Components/Management/Management';
import Contacts from './Components/Contacts/Contacts';
import Complaines from './Components/Complaines/Complaines';
import Advertises from './Components/Advertises/Advertises';
import Settings from './Components/Settings/Settings';

const components = {
    1:Events,
    2:Members,
    3:Advertises,
    4:Management,
    5:Complaines,
    6:Contacts,
    7:Settings
}
const AdminPanel = () => {
    const {setAdmin}=useGlobalContext();
    const [adminData,setAdminData] =useState('');
    const [loading,setLoading]=useState(false);
    const history = useHistory();
    const [menuOpen,setMenuOpen]=useState(false);
    const [componentNumber,setComponentNumber]=useState(1);
    const CurrentComponent = components[componentNumber];

    async function logout(){
       await logoutAdmin();
        setAdmin(false);
        history.push('/');
    }
    function refreshAdmin(){
        getData();
    }
    //hamburger Animation
    useEffect(()=>{
        if(!loading){
        let menuBtn = document.getElementsByClassName("menu-btn")[0];
        menuOpen ? menuBtn.classList.add('open') : menuBtn.classList.remove('open');
        }
    },[menuOpen,loading])
    
    //rendring different componets
    useEffect(()=>{
        if(!loading){
            const links = document.getElementsByClassName('adminLinks')[0].childNodes;
            links.forEach((link,index)=>{
                //for logout
                if(links.length-1 === index){}
                else{
                    link.setAttribute('tabIndex','1');
                    link.addEventListener('click',()=>setComponentNumber(index + 1))
                }
            })
        }
    },[loading]);
    async function getData(){
        setLoading(true);
       const {data} = await adminSetting();
       if(data) setAdminData(data);
       setLoading(false);
       document.title='Admin panel - Digital Society'
    }
    useEffect(()=>{
       getData();
    },[])
    // changing link background
    useEffect(()=>{
        if(!loading){
            const activeLinks=`color: white; background:var(--main-color);`
            const links = document.getElementsByClassName('adminLinks')[0].childNodes;
            links.forEach((link,index)=>{
                if(!(links.length-1 === index)){
                    link.removeAttribute('style');
                }
                if(componentNumber === index +1){
                    link.style=activeLinks;
                }
            })
            setMenuOpen(false);
       }
    },[loading,componentNumber])
     return loading ? <Loader message='loading ...'/> : (
        <>
        <div className={`${Styles.adminWrapper}`}>

            {/*-------- sidebar-------- */}
            <div className={ menuOpen ? `${Styles.sidebarWrapper} ${Styles.mobileSidebar}` : `${Styles.sidebarWrapper}`}>
               <div className={Styles.sidebar}>
                   <div className={Styles.logo}>
                      <Logo/>
                   </div>
                   <p className={Styles.line}> </p>
                   <div className={Styles.adminInfo}>
                        <img src={adminData.img} alt="" />
                        <div>
                            <p>{adminData.name}</p>
                            <p className={Styles.admin}>Admin</p>
                        </div>
                    </div>
                    <ul className='adminLinks'>
                       <li><i className="fas fa-calendar-week"></i>Events</li>
                       <li><i className="fas fa-users" ></i>All Members</li>
                       <li><i className="fas fa-ad"></i>Advertise</li>
                       <li><i className="fas fa-image"></i>Management</li>
                       <li><i className="fas fa-frown"></i>Complaine</li>
                       <li><i className="fas fa-phone-alt"></i>Contacts</li>
                       <li><i className="fas fa-cog"></i>Setting</li>
                       <li style={{color:'red'}} onClick={logout}><i className="fas fa-sign-out-alt"></i>Log out</li>
                    </ul>
               </div>
            </div>
 
            {/* main section   */}
            <div className={Styles.mainSectionWrapper}>
                <div className={Styles.mainSection}> 
                   <div className={Styles.navbar}>
                       <div className={Styles.logo}>
                        <Logo/>
                       </div>
                        <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="menu-btn__burger"></div>
                        </div>
                   </div>               
                    <div className={Styles.componentWrapper}>
                       <CurrentComponent refresh={refreshAdmin}/>
                    </div>                   
                </div>
            </div>
        </div>
       </>
    )
}

export default AdminPanel
