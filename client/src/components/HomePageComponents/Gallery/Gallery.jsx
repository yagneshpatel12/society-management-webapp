import Styles from "./Gallery.module.css";
import SwiperSlider from "../../shared/swiper-slider/SwiperSlider";
import images from "../../../pages/GalleryPage/images";
import { Link } from "react-router-dom";

const Gallery = () => {
    const imgArray =[];
    images.forEach((img,index)=>{
        imgArray.push(<img src={img} alt=''  key={index} className={Styles.img}/>)
    })
    imgArray.push(<Link to='/gallery'><p style={{color:'var(--main-color)',fontWeight:'700px',fontSize:'18px',cursor:'pointer',marginLeft:'20px'}}>more photos <i style={{color:'var(--secondary-color)',marginLeft:'10px'}} className="fas fa-arrow-right"></i></p></Link>)
    return (
        <div className="container container-margin-top">
        <h1 className="heading" data-aos="zoom-in">
         Society Photos
        </h1>
         <SwiperSlider type="advertise" slideArray={imgArray} />
         
        </div>
    )
}

export default Gallery
