import { useEffect, useState,useRef } from "react";
import{adminDataOperation} from "../../../../http";
import Loader from "../../../../components/shared/Loader/Loader";
import Styles from "./Complaines.module.css";

const Complaine = () => {
    const [complaines,setComplaines]=useState([]);
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState('');
    const complaineRef = useRef();
    async function complaineBackend(operationName,complaine=''){
        setLoading(true);
        const fieldName='complaines';
        let reqData={fieldName,operationName};
        if(operationName==="delete"){
          reqData.dbData=complaine;
        }
        const {data}=await adminDataOperation({data:reqData});
        if(data && operationName === 'delete') complaineBackend('get');
        if(data && operationName ==='get'){
         setComplaines(data);
         setLoading(false)
         data.length <1 ? setMessage('No complaine yet') : setMessage('');
        } 
    }
    complaineRef.current=()=>complaineBackend('get');
    useEffect(()=>{
      complaineRef.current();
    },[])
   
    function ComplaineCard(data){
        const {familyName,email,subject,details,houseNo} = data;
        return <div className={`${Styles.card} box-shadow`}>
                <span onClick={()=>complaineBackend('delete',data)} className={Styles.deleteBtn}><i className="fas fa-trash"></i></span>
                <div className={Styles.cardHeader}>
                    <h3>{familyName}</h3>
                    <div>
                        <p className={Styles.cardEmail}>houseNo : {houseNo}</p>
                         <p className={Styles.cardEmail}>
                          {email}
                        </p>
                    </div>
                </div>
                <div className={Styles.cardDiscription}>
                    <h3>{subject}</h3>
                    <p>{details}</p>
                </div>
            </div>
    }
   return (
        <>
            <div className={Styles.complaineWrapper}>
                <h2 className='heading'>Complaines</h2>
               
                {
                    loading ? <Loader message='Loading...' type='true'/> :
        
                <div className={Styles.cardWrapper}>
                     {
                    message ? <p className='invalid'>{message}</p> : <></>
                }
                {
                    complaines.map((complaine,index)=>{
                        return <ComplaineCard key={index} {...complaine}/>
                    })
                }
                </div>}
            </div>
        </>
    )
}

export default Complaine;

