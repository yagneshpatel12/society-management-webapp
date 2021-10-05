import { useEffect, useState } from "react";
import { getAdvertise } from "../../http";
import {BusinessAdvertiseCard,Copyright,Loader} from '../../import';
import Styles from "./BusinessAdvertisePage.module.css";

const BusinessAdvertise = () => {
  const [advertisesData,setAdvertisesData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [searchInput,setSearchInput]=useState('');
  const [message,setMessage]=useState('');

  async function getAdvertiseData(){
    setLoading(true);
    const {data} = await getAdvertise();
    if(data){
       setAdvertisesData(data);
       data.length <1 ?setMessage('no advertise yet') : setMessage('')
    }
    setLoading(false);
  }
  useEffect(()=>{
    document.title='Advertise - Digital Society'
    getAdvertiseData();
  },[])
  useEffect(()=>{
 let count = document.getElementsByClassName('count')[0] || 0;
 if(count.childElementCount === 0){
   setMessage('No advertise found !');
 }else{
   setMessage('')
 }
},[searchInput])
  return (
    <>
    {
        loading ? <Loader message='loading please wait ...'/> : <>
      <div
        className={`container container-margin-top ${Styles.advertiseWrapper}`}
      >
        <h2 className="heading">Business Advertise</h2>
      
        <div className={`box-shadow ${Styles.searchbar}`}>
          <input type="text" placeholder="Search by family name" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
          <button className={`btnStructure ${Styles.btn}`}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        </div>
         {
           message && <p style={{marginTop:'50px',color:'red',fontWeight:'600',textAlign:'center'}}>{message}</p>
         }
        <div className={` container ${Styles.cardList} count`}>
        {advertisesData.map((data,index) => {
          if(data.familyName.includes(searchInput)){
            return <BusinessAdvertiseCard {...data} key={index} type='link' dataAos="fade-up" />;
          }return null;
        })}
      </div>
    </>
 }
      <Copyright />
    </>
  );
};

export default BusinessAdvertise;
