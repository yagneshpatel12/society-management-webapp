import { useState, useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useGlobalContext } from '../../../context/context';
import "./hamburger.css";
import {logout} from '../../../http/index'
import Logo from "../Logo/Logo";
const Navbar = () => {
  const {isAuth,isActivate,user,Auth,Activate,setUserData}=useGlobalContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [show,setShow]=useState(false);
  const temp = useRef();
  // logout
   async function logoutUser() {
     setMenuOpen(false)
        try {
            const { data } = await logout();
           Auth(data.auth)
           Activate(data.activate)
           setUserData(null);
          let r = document.querySelector(':root');
          r.style.setProperty('--width-first','0%')
          r.style.setProperty('--width-second','0%');
          
        } catch (err) {
            console.log(err);
        }
    }
   //onclick sidemenu close
   function menuclose(){
   document.getElementById('menucheckbox').click();
   }
  //hamburgerAnimation For Mobile View
  function checkAndAddAnimation() {
    let menus = document.getElementsByClassName("menus")[0].childNodes;
    for (let i = 0; i < menus.length; i++) {
      menus[i].addEventListener("click", () => {
        setMenuOpen(false);
      });
    }
  }
  temp.current=navbarSetting;
  function navbarSetting(){
    if(window.innerWidth >= 960) setShow(false)
    if(window.innerWidth <= 960) setShow(true);
  }
useEffect(()=>{
  window.addEventListener('resize', navbarSetting)
    return ()=> window.removeEventListener('resize', navbarSetting)
})

  useEffect(() => {
    function hamburgerAnimation() {
      temp.current()
      if (window.innerWidth <= 960) {
        let menuBtn = document.getElementsByClassName("menu-btn")[0];
        let rightSide = document.getElementsByClassName("reference")[0];
        if (menuOpen) {
          menuBtn.classList.add("open");
          rightSide.classList.add(`${Styles.clipPath}`);
          document.body.style.overflowY = "hidden";
        } else {
          menuBtn.classList.remove("open");
          rightSide.classList.remove(`${Styles.clipPath}`);
          document.body.style.overflowY = "scroll";
        }
      }
    }
    hamburgerAnimation();
  }, [menuOpen]);
  useEffect(() => {
    checkAndAddAnimation();
  }, []);

  return (
    <>
      <div className={`${Styles.stickyNav}`}>
        <div className={`container ${Styles.navbarWrapper}`}>
          <div>
            <Logo/>
          </div>
          <div className={`${Styles.rightSide} reference`}>
            <ul className="menus">
              {
                isAuth && isActivate && show && user  &&
              <div className={Styles.mobileImg}>
                <img src={user.profileImg} alt="" />
                <h3>{user.familyName}</h3>
              </div> 
             }

                <NavLink  exact activeClassName={`${Styles.menuActive}`} to="/">
                 <li >
                  <i className="fas fa-house-user"></i>
                  Home
                 </li>
                </NavLink>
              
                <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/advertise"
                  >
                  <li>
                    <i className="fas fa-ad"></i>
                  Advertise
              </li>
                </NavLink>
                <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/allmembers"
                  >
                  <li>
                    <i className="fas fa-users"></i>
                  All Members
              </li>
                </NavLink>
                <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/gallery"
                  >
                  <li>
                    <i className="fas fa-image"></i>
                  Gallery
              </li>
                </NavLink>
                <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/contact"
                  >
                  <li>
                    <i className="fas fa-phone-alt"></i>
                  Contact us
              </li>
                </NavLink>
                {
                  show && !isAuth &&  <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/login"
                  onClick={()=>setMenuOpen(false)}
                  >
                  <li><i className="fas fa-sign-in-alt"></i>Login</li>
                </NavLink>
                }
              {(isAuth && isActivate ) ? show ?(
                <>
                <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/profile"
                  onClick={()=>setMenuOpen(false)}
                  >
                  <li>
                    <i className="fas fa-user"></i>
                  profile
              </li>
                </NavLink>
                 <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/complaine"
                  onClick={()=>setMenuOpen(false)}
                  >
                  <li>
                    <i className="fas fa-frown"></i>
                  Complaine
              </li>
                </NavLink>
                 <NavLink
                  exact
                  to="#"
                  onClick={logoutUser}
                  >
                  <li style={{color:'red'}}>
                    <i className="fas fa-sign-out-alt"></i>
                  Log out   
              </li>
                </NavLink>
                </>
              )
              :
              <li>
                 <label className={Styles.profileToggle} id='menucheckbox'> 
                 <input type="checkbox" />
                  <div className={Styles.imgMenu}>
                    {
                      user && <img src={user.profileImg} alt="" className={Styles.profile} />
                    }
                     <span><i className="fas fa-chevron-down"></i></span>
                     <div className={`${Styles.hoverMenu}`} onClick={menuclose}>
                        <div className={Styles.sMenu}>
                          <p><NavLink exact to="/profile"   activeClassName={`${Styles.menuActive}`}><i className="fas fa-user-circle"></i>profile</NavLink></p>
                        </div>
                        <div className={Styles.sMenu}>
                          <p><NavLink exact to="/complaine"   activeClassName={`${Styles.menuActive}`}><i className="fas fa-frown"></i>Complaine</NavLink></p>
                        </div>
                        <div className={Styles.sMenu}>
                          <p><NavLink exact to="/" style={{color:'red'}} onClick={logoutUser}><i className="fas fa-sign-out-alt"></i>Log out</NavLink></p>
                        </div>
                     </div>
                  </div>
                 </label>
             
              </li>
             : (
               !show && <li>
                <NavLink
                  exact
                  activeClassName={`${Styles.menuActive}`}
                  to="/login"
                >
                  <button className={`btnStructure ${Styles.btn}`}>
                    Login
                  </button>
                </NavLink>
              </li>
             )
}
            </ul>
          </div>
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="menu-btn__burger"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
