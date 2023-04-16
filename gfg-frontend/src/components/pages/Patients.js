import { useEffect, useState } from 'react';
import PageTitle from "../common/PageTitle";
import '../../styles/patients.css';
import Table2 from "../common/Table2";
import moment from 'moment';
import axios from 'axios';
import PatientDetails from '../common/PatientDetails';
import SinglePatientDEtails from '../common/SinglePatientDetails';
import SinglePatient from '../common/SinglePatient';

const dummy = {
    columns:["ID","Name","DOB","Appointments","Age"],
    data:[
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"5",age:"23"},
    ]
    
}
// localhost:1337/api/patients?populate=appointments

const Patients = () => {
    const [patients,setPatients] = useState(dummy);
    const [cur,setCur] = useState();
    const [single,setSingle] = useState(false);
    const [curApp,setCurApp] = useState();
    const [sp,setSp] = useState(true);
    const fetchPatients = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/patients?populate=*`, {})
            .then(response => {
                let app = {
                    columns:["ID","Name","DOB","Appointments","Age"],
    
                    data:[
                    ]
                }
                // Handle success.
                // console.log('app!');
                // console.log(response.data);
                let data = response.data;
                // console.log(data[0])
                console.log(data.data);
                data.data.forEach((element)=>{
                    console.log(element);
                    let a = moment(element.attributes.DOB.replace('-',''),"YYYYMMDD");
                    let date = a.format("DD MMM YYYY");
                    
                    let e = {id:element.id,name:element.attributes.name,date:date,time:`${element.attributes.appointments.data.length}`,age:moment().diff(a, 'years')}
                    let arr = app.data
                    arr.push(e);
                    app.data=arr;
                });
                setPatients(app);
 
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }
    useEffect(()=>{
        fetchPatients();

    },[]);
    return ( 
    <div className="patients">
        <div className="content">
            {single?<SinglePatient cur={cur} setSingle={setSingle} curApp={curApp} setCurApp={setCurApp} setSp={setSp}/>:
            
            <div className="t">
                <div className="top">
                    <div className="t1">
                        <PageTitle title="Patients"/>
                        <div className="filter">
                            Filter
                            <div className="image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7366 22.7586V21.1655C13.4988 20.8752 14.1353 20.327 14.5353 19.6161C14.9352 18.9053 15.0735 18.0767 14.9259 17.2745C14.7783 16.4723 14.3543 15.7472 13.7275 15.2252C13.1007 14.7032 12.3108 14.4173 11.4952 14.4173C10.6795 14.4173 9.88962 14.7032 9.26284 15.2252C8.63607 15.7472 8.21204 16.4723 8.06446 17.2745C7.91689 18.0767 8.05511 18.9053 8.45509 19.6161C8.85507 20.327 9.49152 20.8752 10.2538 21.1655V22.7586C10.2538 23.0879 10.3846 23.4036 10.6174 23.6364C10.8502 23.8692 11.1659 24 11.4952 24C11.8244 24 12.1402 23.8692 12.373 23.6364C12.6058 23.4036 12.7366 23.0879 12.7366 22.7586ZM10.2538 1.24138L10.2538 14.8414C10.3076 15.5034 11.0814 15.1352 11.4952 15.1807C11.909 15.1352 12.6828 15.5034 12.7366 14.8414L12.7366 1.24138C12.7366 0.912144 12.6058 0.596394 12.373 0.36359C12.1402 0.130787 11.8244 0 11.4952 0C11.1659 0 10.8502 0.130787 10.6174 0.36359C10.3846 0.596394 10.2538 0.912144 10.2538 1.24138ZM4.72138 22.7586L4.72138 9.15862C4.66759 8.49655 3.89379 8.86483 3.48 8.81931C3.06621 8.86483 2.29655 8.49655 2.23862 9.15862L2.23862 22.7586C2.23862 23.0879 2.36941 23.4036 2.60221 23.6364C2.83502 23.8692 3.15077 24 3.48 24C3.80924 24 4.12498 23.8692 4.35779 23.6364C4.59059 23.4036 4.72138 23.0879 4.72138 22.7586ZM6.96828 6.08689C6.96733 5.38097 6.75198 4.69199 6.35074 4.11119C5.9495 3.53038 5.3813 3.08516 4.72138 2.83448V1.24138C4.72138 0.912144 4.59059 0.596394 4.35779 0.36359C4.12498 0.130787 3.80924 0 3.48 0C3.15077 0 2.83502 0.130787 2.60221 0.36359C2.36941 0.596394 2.23862 0.912144 2.23862 1.24138V2.83448C1.64557 3.06149 1.12584 3.44625 0.73559 3.9472C0.345341 4.44814 0.0994189 5.04622 0.0244002 5.67678C-0.0506185 6.30734 0.0481194 6.94642 0.309943 7.52494C0.571767 8.10347 0.986719 8.59943 1.50996 8.95924C2.03319 9.31905 2.64481 9.52903 3.27872 9.56646C3.91263 9.6039 4.54471 9.46739 5.10666 9.17167C5.66862 8.87595 6.13906 8.43228 6.46717 7.8886C6.79527 7.34492 6.96855 6.72191 6.96828 6.08689ZM18.5297 1.24138L18.5297 2.83448C17.7674 3.12476 17.1309 3.67298 16.7309 4.38385C16.331 5.09473 16.1927 5.92329 16.3403 6.7255C16.4879 7.52771 16.9119 8.25285 17.5387 8.77484C18.1655 9.29683 18.9554 9.58267 19.771 9.58267C20.5867 9.58267 21.3766 9.29683 22.0034 8.77484C22.6301 8.25285 23.0542 7.52771 23.2017 6.7255C23.3493 5.92329 23.2111 5.09473 22.8111 4.38385C22.4111 3.67298 21.7747 3.12476 21.0124 2.83448L21.0124 1.24138C21.0124 0.912144 20.8816 0.596394 20.6488 0.36359C20.416 0.130787 20.1003 0 19.771 0C19.4418 0 19.126 0.130787 18.8932 0.36359C18.6604 0.596394 18.5297 0.912144 18.5297 1.24138ZM18.6786 8.82345C18.6297 8.86411 18.5908 8.9155 18.565 8.97363C18.5391 9.03176 18.5271 9.09506 18.5297 9.15862V22.7586C18.5297 23.0879 18.6604 23.4036 18.8932 23.6364C19.126 23.8692 19.4418 24 19.771 24C20.1003 24 20.416 23.8692 20.6488 23.6364C20.8816 23.4036 21.0124 23.0879 21.0124 22.7586V9.15862C20.9586 8.49655 20.1848 8.86483 19.771 8.81931C19.4028 8.85655 18.9972 8.60414 18.6786 8.82345Z" fill="#0092FC"/>
                            </svg>

                            </div>
                        </div>
                    </div>
                    <div className="search">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.9255 0C5.80227 0 0 5.80227 0 12.9255C0 20.0488 5.80227 25.8511 12.9255 25.8511C16.0231 25.8511 18.8679 24.7511 21.0974 22.9251L28.8148 30.6426C28.9339 30.7666 29.0766 30.8657 29.2345 30.9339C29.3923 31.0021 29.5622 31.0382 29.7342 31.0399C29.9061 31.0417 30.0767 31.0091 30.2359 30.9441C30.3951 30.8791 30.5398 30.783 30.6614 30.6614C30.783 30.5398 30.8791 30.3951 30.9441 30.2359C31.0091 30.0767 31.0417 29.9061 31.0399 29.7342C31.0382 29.5622 31.0021 29.3923 30.9339 29.2345C30.8657 29.0766 30.7666 28.9339 30.6426 28.8148L22.9251 21.0974C24.7511 18.8679 25.8511 16.0231 25.8511 12.9255C25.8511 5.80227 20.0488 0 12.9255 0ZM12.9255 2.58511C18.6517 2.58511 23.266 7.19936 23.266 12.9255C23.266 18.6517 18.6517 23.266 12.9255 23.266C7.19936 23.266 2.58511 18.6517 2.58511 12.9255C2.58511 7.19936 7.19936 2.58511 12.9255 2.58511Z" fill="#0092FC"/>
                            </svg>
                        <div className="text">
                            Search
                        </div>
                    </div>
                </div>
                <Table2 data={patients} cur={cur} setCur={setCur}/>
            </div>
            }
        </div>
        <div className="sidebar1">
            {single?<SinglePatientDEtails curApp={curApp} cur={cur} setSingle={setSingle} sp={sp} setSp={setSp}/>:<PatientDetails cur={cur} setSingle={setSingle}/>}
            
        </div>
    </div>
    );
}
 
export default Patients;