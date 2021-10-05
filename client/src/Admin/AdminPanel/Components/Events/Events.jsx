import { useState,useEffect,useRef} from 'react';
import Styles from './Events.module.css'
import { defaultImg } from '../../../../defaultImg';
import {adminDataOperation} from "../../../../http";
import Loader from '../../../../components/shared/Loader/Loader';
import EventCard from '../../../../components/HomePageComponents/Event/Card/Card';

const Events = () => {
    const [loading,setLoading]=useState(false);
    const [menuOpen,setMenuOpen]=useState(false);
    const [message,setMessage]=useState('');
    const [unMounted,setUnMounted]=useState(false);
    const eventRef = useRef();
    const [eventData,setEventData]=useState({
        name:'',
        place:'',
        date:'',
        time:'',
        discription:'',
        img: defaultImg || '',
    });
    const [allEvent,setAllEvent]=useState([]);
    function handleChange(e){
        const {name,value}=e.target;
        setEventData((prevData)=>{
            return {...prevData,[name]:value}
        })
    }
    function captureImg(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
            setEventData((prevData) => {
                return { ...prevData, img: reader.result };
            });
        };
    }
    async function submit(e){
        e.preventDefault();
        setLoading(true);
        const fieldName='events';
        const operationName = 'create';
        let reqData={fieldName,operationName};
        reqData.dbData=eventData;
        const {data}=await adminDataOperation({data:reqData});
        if(data) eventBackend('get');
        setEventData({
        name:'',
        place:'',
        date:'',
        time:'',
        discription:'',
        img: defaultImg || '',
        })
    }
     async function eventBackend(operationName,eventData=''){
        setLoading(true);
        const fieldName='events';
        let reqData={fieldName,operationName};
        if(operationName==="delete"){
          reqData.dbData=eventData;
        }
        const {data}=await adminDataOperation({data:reqData});
        if(data && operationName === 'delete') {
            eventBackend('get');
        };
        if(data && operationName ==='get' && !unMounted) {
            setAllEvent(()=>data.length >0 ? data.reverse() : []);
            setLoading(false);
        setMenuOpen(false);
        data.length < 1 ? setMessage('No events yet') : setMessage('');
        }
    }
    eventRef.current=()=>eventBackend('get');
    useEffect(()=>{
           eventRef.current();
           return ()=>setUnMounted(true)
    },[])
    return (
        <>
            <div className={Styles.eventsWrapper}>
                <h2 className='heading'>Society Events</h2>

                {!menuOpen && <div style={{textAlign:'center'}}><button onClick={()=>setMenuOpen(!menuOpen)} className={`btnStructure ${Styles.addEventBtn}`}>Add event</button></div>}
                {
                    message ? <p className='invalid'>{message}</p> : <></>
                }
                {/* form */}
                {
                   loading ? <Loader message='Loading...' type='true'/> : <>
                
                {
                    menuOpen && 
                <form   className='box-shadow' onSubmit={submit}>
                    <span className={Styles.close} onClick={()=>setMenuOpen(!menuOpen)}>
                        <i className="fas fa-times-circle"></i>
                    </span>
                    <div className={Styles.mainInputWrapper}>     
                        <div>
                            <label htmlFor="">Event name</label>
                            <input type="text" onChange={handleChange} value={eventData.name} name='name' placeholder='mettings' required autoFocus />
                        </div>
                         <div>
                            <label htmlFor="">Event place</label>
                            <input type="text" onChange={handleChange}  value={eventData.place} name='place' placeholder='common plote' required  />
                        </div>
                    </div>
                    <div className={Styles.mainInputWrapper}>
                        <div>
                            <label htmlFor="">Event date</label>
                            <input type="date" onChange={handleChange}  value={eventData.date} name='date'  required  />
                        </div>
                         <div>
                            <label htmlFor="">Event Time</label>
                            <input type="time"  onChange={handleChange}  value={eventData.time} name='time' placeholder='mettings' required  />
                        </div>
                    </div>
                    
                    <div className={Styles.fullWidthInput}>
                        <label htmlFor="">Event Discription</label>
                       <textarea name="discription" onChange={handleChange}   value={eventData.discription} rows="5"></textarea>
                    </div>
                    <div className={Styles.mainInputWrapper}>
                        <div className={Styles.imgDiv}>
                            <img src={eventData.img} alt="" />
                        </div>
                        <div>
                        <label htmlFor="img" className={Styles.link}>upload a event photo</label>
                        <input type="file" name="img" id='img' accept="image/png, image/jpg, image/jpeg"  onChange={captureImg} />
                        </div>
                    </div>
                    <button type='submit' className='btnStructure'>Add event</button>
                </form>
                }
         
                {/* all events */}
                <div className={Styles.eventCardWrapper}>
                  { !menuOpen &&
                      allEvent.map((event,index)=>{
                          return <div className={Styles.cardWrapper} key={index}>
                              <EventCard {...event} />
                              <p onClick={()=>eventBackend('delete',event)} className={Styles.delete}> delete event </p>
                              </div>     
                      })
                  }
                </div>
                 </>  }
            </div>
        </>
    )
}

export default Events
