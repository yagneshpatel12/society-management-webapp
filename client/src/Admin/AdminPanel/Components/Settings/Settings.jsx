import Styles from './Settings.module.css';
import { adminSetting } from '../../../../http';
import { Loader } from '../../../../import';
import { useEffect, useState } from 'react';
const Settings = ({refresh}) => {
    const [loading,setLoading]=useState(false);
    const [adminData,setAdminData]=useState('');
    const [showForm,setShowForm]=useState(false);
    const [formData,setFormData]=useState({
        societyCode: '',
        adminCode:'',
        img:'',
        name:'',
    })
    async function getInfo(){
           setLoading(true);
           const {data} = await adminSetting();
           if(data) {
              setAdminData(data); 
              setFormData(data);
           } 
           setLoading(false);
    }
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
        setLoading(true)
       const {data} = await adminSetting({data:formData,edit:true});
       if(data){
getInfo();
refresh();
       } 
       setShowForm(false);
    }
    useEffect(()=>{
    getInfo();
    },[]);
    return loading ? <Loader message='loading' type='true'/> :(
        <div className={Styles.settingWrapper}>
            <h2 className='heading'>Settings</h2>
            {
                showForm ? 
                <form className='box-shadow' onSubmit={submit}>
                    <div className={Styles.profile}>
                        <img src={formData.img} alt="" />
                        <label htmlFor="img">change admin photo</label>
                        <input type="file" id='img' name='img' onChange={captureImg} />
                    </div>
                     <div>
                    <label htmlFor="">Name</label>
                    <input type="text" value={formData.name} onChange={handleChange} name="name"  required/>
                  </div>
                  <div>
                    <label htmlFor="">Society code</label>
                    <input type="text" value={formData.societyCode} maxLength='6' onChange={handleChange} name="societyCode"  required/>
                  </div>
                  <div>
                    <label htmlFor="">Admin code</label>
                    <input type="text" value={formData.adminCode}  maxLength='6' onChange={handleChange} name="adminCode"  required/>
                  </div>
                  <div className={Styles.btns}>
                      <button onClick={()=>setShowForm(false)} className={`btnStructure ${Styles.cancelBtn}`}>cancel</button>
                      <button type='submit' className={`btnStructure ${Styles.submitBtn}`}>submit</button>
                  </div>
                </form> 
                : <>
                {/*Admin setting */}
                   {  
                       <div className={`${Styles.setting} box-shadow`}>
                            <img src={adminData.img} alt="" />
                            <h3>{adminData.name}</h3>
                            <h4>Admin</h4>
                            <p>Society code : <span>{adminData.societyCode}</span></p>
                            <p>Admin code : <span>{adminData.adminCode}</span></p>
                            <button onClick={()=>setShowForm(true)} className={`${Styles.btn} btnStructure`}>Edit settings</button>
                       </div>
                    }
                  </> 
            }
        </div>
    )
}

export default Settings;
