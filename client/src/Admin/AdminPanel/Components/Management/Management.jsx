import { useEffect, useState } from 'react'
import { Loader } from '../../../../import'
import { adminDataOperation } from '../../../../http'
import Styles from './Management.module.css';
import { defaultImg } from '../../../../defaultImg';
import ManagementCard from '../../../../components/HomePageComponents/ManagmentPeoples/Card/Card';
const Management = () => {
    const [loading,setLoading]=useState(false);
    const [showForm,setShowForm]=useState(false);
    const [managementData,setManagementData]=useState([]);
    const [formData,setFormData]=useState({
        name:'',
        img:defaultImg || '',
        phoneno:'',
        email:'',
        position:''
    })
     function handleChange(e){
          const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
    }
    function captureImg(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=function(){
            setFormData((prev)=>{
                return {...prev,img:reader.result}
            })
        };
    }
    async function submit(e){
        e.preventDefault();
        setLoading(true);
        const reqData = {operationName:'create',fieldName:'management',dbData:formData}
       const {data} = await adminDataOperation({data:reqData});
       if(data) getPeople();
       setFormData({
        name:'',
        img:defaultImg || '',
        phoneno:'',
        email:'',
        position:''
    })
    }
    async function getPeople(){
        setLoading(true);
        const reqData ={fieldName:'management',operationName:'get'}
        const {data} = await adminDataOperation({data:reqData});
        if(data) setManagementData(data);
        setShowForm(false);
        setLoading(false);
    }
    async function deletePeople(people){
        setLoading(true);
          const reqData = {fieldName:'management',operationName:'delete',dbData:people}
          const {data} = await adminDataOperation({data:reqData});
        if(data) getPeople();
    }
    useEffect(()=>{
      getPeople();
    },[])
    return (
        <>
            <div className={Styles.managementWrapper}>
                <h2 className='heading'>Management Peoples</h2>
                <div className={Styles.btn}>
                    <button onClick={()=>setShowForm(true)} className='btnStructure'>Add People</button>
                </div>
                {
                    loading ? <Loader message='loading...' type='true'/> : <> 
                {/* form */}
                {
                    showForm && <form onSubmit={submit} className='box-shadow'>
                        <div className={Styles.profile}>
                            <img src={formData.img} alt="" />
                            <label htmlFor="img">choose different photo</label>
                            <input type="file" id='img' onChange={captureImg} name='img'/>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.inputWidth}>
                                <label htmlFor="">Name</label>
                                <input type="text" name='name' value={formData.name} onChange={handleChange} required/>
                            </div>
                            <div className={Styles.inputWidth}>
                                <label htmlFor="">Position</label>
                                <input type="text" name='position' value={formData.position} onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.inputWidth}>
                                <label htmlFor="">Phone No</label>
                                <input type="number" maxLength='10' name='phoneno' value={formData.phoneNo} onChange={handleChange} required/>
                            </div>
                            <div className={Styles.inputWidth}>
                                <label htmlFor="">Email</label>
                                <input type="email" name='email' value={formData.Email} onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className={Styles.btns}>
                            <button onClick={()=>setShowForm(false)} className={`btnStructure ${Styles.cancelBtn}`}>cancel</button>
                            <button type='submit' className={`btnStructure ${Styles.addBtn}`}>Add people</button>
                        </div>
                    </form>
                }
                {
                    // card
                    !showForm && <div className={Styles.cardList}>
                           {
                                managementData.map((people,index)=>{
                                return <div className={Styles.deleteWrapper} key={index}>
                                    <span onClick={()=>deletePeople(people)}><i className="fas fa-trash"></i></span>
                                    <ManagementCard key={index} {...people}/>
                                </div>
                            })
                           }
                    </div>
                }
                </>
                }
            </div>
        </>
    )
}

export default Management;
