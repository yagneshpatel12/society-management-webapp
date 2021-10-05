import { useState,useEffect } from 'react';
import Styles from './Advertises.module.css';
import  AdvertiseCard from '../../../../components/shared/BusinessAdvertiseCard/Card';
import Loader from '../../../../components/shared/Loader/Loader';
import Searchbar from '../../../../components/shared/Searchbar/Searchbar';
import { getAdvertise,userOperations } from '../../../../http';

const Advertises = () => {

    // states
    const [advertisesData,setAdvertisesData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState('');
    const [searchInput,setSearchInput]=useState('');
    
    function searchInputValue(data){
        setSearchInput(data);
    }
    //functions
    async function getAdvertiseData(){
        setLoading(true);
        const {data} = await getAdvertise();
        if(data){
            setAdvertisesData(data);
        }
        setLoading(false);
    }
    async function deleteUserAdvertise(index){
        const {advertiseImg,discription,date,email} = advertisesData[index];
        const advertiseDetail = {
            img:advertiseImg,
            discription,
            date
        }
        setLoading(true);
        const reqData = {operationName:'delete',fieldName:'advertises',email,dbData:advertiseDetail};
        const {data}=await userOperations({data:reqData});
        if(data.next===true){
            getAdvertiseData();
        }
    }
    //searching advertises
      useEffect(()=>{
         if(!loading){
            let count = document.getElementsByClassName('count')[0] || 0;
      if(count.childElementCount === 0){
        setMessage('No advertise found !');
      }else{
        setMessage('')
     }
         }
    },[loading,searchInput])
    //useeffect
    useEffect(()=>{
        getAdvertiseData();
    },[])

    return loading ? <Loader message='Loading....' type='true'/> : (
        <>
            <div className={Styles.advertiseWrapper}>
                <h2 className='heading'>Business Advertise</h2>
                   <Searchbar searchInput={searchInput} searchInputValue={searchInputValue}/>
                    <p className='invalid'>{message}</p>
                <div className={`${Styles.cardList} count`}>
                {
                    advertisesData.map((data,index) => {
                        if(data.familyName.includes(searchInput)){
                        return <div className={Styles.cardWrapperMain}  key={index}>
                                <span onClick={()=>deleteUserAdvertise(index)}>
                                    <i style={{color:'red',cursor:'pointer'}} className="fas fa-trash"></i>
                                </span>
                                    <AdvertiseCard {...data}  margin='false'  />
                            </div>
                        }return null;
                    })
                }
                </div>
            </div>
        </>
    )
}

export default Advertises
