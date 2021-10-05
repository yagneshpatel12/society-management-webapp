import Styles from "./Gallery.module.css";
import images from './images';
import Copyright from '../../components/shared/Copyright/Copyright'
import { useEffect } from "react";
const Gallery = () => {
  useEffect(()=>{
   document.title='Gallery - Digital Society'
  },[])
  return (
    <>
     <div className='gallery container container-margin-top'>
       <h2 className='heading'>Society Photos</h2>
       <div className={Styles.gallery}>
         {
           images.map((img,index)=>{
              return(
                <div className={Styles.pics} key={index}>
                    <img src={img}  alt="" style={{width:'100%'}}/>
                </div>
              )
           })
         }
       </div>
     </div>
     <Copyright/>
    </>
  );
};

export default Gallery;