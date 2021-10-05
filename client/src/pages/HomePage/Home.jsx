import {HeroSection,Footer,ManagmentPeoples,SocietyRules,Gallery,Event,BusinessAdvertiseHomePage,Loader} from '../../import';
import {getHomePageData} from '../../http';
import { useEffect, useState } from 'react';
const Home = () => {
  const [data,setData]= useState({
    events:[],
    management:[],
    advertise:[]
  });
  const [loading,setLoading]=useState(false);
  async function getData(){
     setLoading(true);
     const {data}=await getHomePageData();
     if(data) setData(data);
     setLoading(false);
  }
  useEffect(()=>{
    document.title='Digital Society'
    return getData()
  },[])
  return  <>
      <HeroSection />
      {
         loading ? <Loader message='loading..' type='true'/> :<>
         <Event events={data.events}/>
         <BusinessAdvertiseHomePage advertises ={data.advertise}/>
         <Gallery />
         <ManagmentPeoples management={data.management} />
         </>
      }
      <SocietyRules />
      <Footer />
    </>
};

export default Home;
