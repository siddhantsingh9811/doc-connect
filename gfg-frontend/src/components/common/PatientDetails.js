import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import moment from 'moment';
import axios from 'axios';
import Note from "./Note";
import { Link } from 'react-router-dom';

const PatientDetails = ({cur:cur,setSingle:setSingle}) => {
    const [patient,setPatient] = useState(cur);
    const [details,setDetails] = useState();
    const [apps,setApps] = useState();
    useEffect(()=>{
        setPatient(cur);
        
    },[cur]);
    const fetchPatient = ()=>{
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/patients/${patient}?populate=*`, {})
            .then(response => {
                let data = response.data.data
                setDetails(data);
                setApps(data.attributes.appointments.data);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }
    useEffect(()=>{
        fetchPatient()
    },[patient]);
    // let dob = .split(" ");

    return ( 
        <div className="patient">
            <PageTitle title="Details"/>
            {details?

            <div className="top">
                <h2>Patient <span id="blue">#{patient}</span></h2>
                <div className="bt" onClick={()=>{setSingle(true)}}>
                    <div className="text">Detailed</div>
                    <svg width="21" height="29" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 0C10.2774 0 10.0549 0.0847219 9.88476 0.254297L8.03906 2.1C5.90254 2.09954 2.1 2.1 2.1 2.1C0.93975 2.1 0 3.03975 0 4.2V26.25C0 27.4103 0.93975 28.35 2.1 28.35H18.9C20.0602 28.35 21 27.4103 21 26.25V4.1959C21 3.03565 20.0644 2.10205 18.9041 2.10205C17.1636 2.10242 15.6092 2.10241 12.9609 2.10205V2.1L11.1152 0.254297C10.9451 0.0847219 10.7226 0 10.5 0ZM4.2 8.4C4.7796 8.4 5.25 8.8704 5.25 9.45C5.25 10.0296 4.7796 10.5 4.2 10.5C3.6204 10.5 3.15 10.0296 3.15 9.45C3.15 8.8704 3.6204 8.4 4.2 8.4ZM8.4 8.4H16.8C17.3806 8.4 17.85 8.86935 17.85 9.45C17.85 10.0307 17.3806 10.5 16.8 10.5H8.4C7.81935 10.5 7.35 10.0307 7.35 9.45C7.35 8.86935 7.81935 8.4 8.4 8.4ZM4.2 12.6C4.7796 12.6 5.25 13.0704 5.25 13.65C5.25 14.2296 4.7796 14.7 4.2 14.7C3.6204 14.7 3.15 14.2296 3.15 13.65C3.15 13.0704 3.6204 12.6 4.2 12.6ZM8.4 12.6H16.8C17.3806 12.6 17.85 13.0694 17.85 13.65C17.85 14.2307 17.3806 14.7 16.8 14.7H8.4C7.81935 14.7 7.35 14.2307 7.35 13.65C7.35 13.0694 7.81935 12.6 8.4 12.6ZM4.2 16.8C4.7796 16.8 5.25 17.2704 5.25 17.85C5.25 18.4296 4.7796 18.9 4.2 18.9C3.6204 18.9 3.15 18.4296 3.15 17.85C3.15 17.2704 3.6204 16.8 4.2 16.8ZM8.4 16.8H16.8C17.3806 16.8 17.85 17.2694 17.85 17.85C17.85 18.4307 17.3806 18.9 16.8 18.9H8.4C7.81935 18.9 7.35 18.4307 7.35 17.85C7.35 17.2694 7.81935 16.8 8.4 16.8ZM4.2 21C4.7796 21 5.25 21.4704 5.25 22.05C5.25 22.6296 4.7796 23.1 4.2 23.1C3.6204 23.1 3.15 22.6296 3.15 22.05C3.15 21.4704 3.6204 21 4.2 21ZM8.4 21H16.8C17.3806 21 17.85 21.4694 17.85 22.05C17.85 22.6307 17.3806 23.1 16.8 23.1H8.4C7.81935 23.1 7.35 22.6307 7.35 22.05C7.35 21.4694 7.81935 21 8.4 21Z" fill="white"/>
                    </svg>
                </div>
            </div>
            :""}

            {details?
            <div className="e">

                
                <h1>Appointments Pending</h1>
                {apps?apps.map((data,index)=>{
                    if(!data.attributes.confirmed){
                        return(
                            <div className="box">                                
                                <div className="l">
                                    <span id="blue">ID:</span> {data.id} <br />
                                    <span id="blue">Date:</span> {moment(data.attributes.date).format("DD MMM YYYY")} <br />
                                    <span id="blue">Time:</span> {moment(`${moment(data.attributes.date).format("YYYY-MM-DD")}T${data.attributes.time}`).format("h:mm A")} <br />
                                    <span id="blue">Reason:</span> <br />
                                    <div className="r">
                                        {data.attributes.reason}
                                    </div>
                                </div>
                                <Link to="/appointments" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                <div className="bt">
                                    <div className="text">Manage</div>
                                </div>
                                </Link>
                            </div>
                        )
                    }
                }):""}
                <h1>Notes</h1>
                <Note/>
            </div>
            :""}
        </div>
     );
}
 
export default PatientDetails;