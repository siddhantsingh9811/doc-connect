import { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import Note from "./Note";


const AppointmentDetails = ({appointment:appointment}) => {
    const [ap,setAp] = useState(appointment);
    const [details,setDetails] = useState();
    const [col,setCol] = useState("red");
    useEffect(()=>{
        setAp(appointment);
        console.log(ap);
    },[appointment]);
    const fetchData = (id)=>{
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/appointments/${id}?populate=*`, {})
            .then(response => {
                
                let data = response.data;
                // console.log(data);
                setDetails(data);    
                          
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }

    useEffect(()=>{
        if(ap){
            fetchData(ap);
        }
    },[ap]);
    useEffect(()=>{
        if(details){
            // setPatient(details.data.attributes.patient.data.attributes)  
            // console.log("DETAILS",details);
            if(details.data.attributes.confirmed){
                setCol("blue");
            }
            else{
                setCol("red");
            }
        }
    },[details]);
    return ( 
        <div className="appdet">
            {(
                ()=>{
                    try{
                    let patient = details.data.attributes.patient.data;
                    let data = details.data;
                    let d = moment(data.attributes.date,"YYYY-MM-DD").format("DD MMM YYYY").split(" ");
                    let dob = moment(patient.attributes.DOB,"YYYY-MM-DD").format("DD MMM YYYY").split(" ");
                    
                    return(
                        <div className="killme">
                            <h2>{d[0]} <span id={col}>{d[1]}</span> {d[2]}</h2>
                            <br />
                            <h1>Appointment <span id={col}>#{details.data.id}</span></h1>
                            <h3>Patient <span id={col}>#{patient.id}</span></h3>
                            <div className="box" style={{border: `2px solid var(--${col})`}}>
                                <div className="l">
                                    <span id={col}>Name:</span> {patient.attributes.name}
                                </div>
                                <div className="l">
                                    <span id={col}>DOB:</span> {dob[0]} <span id={col}>{dob[1]}</span> {dob[2]}
                                </div>
                                <div className="l">
                                    <span id={col}>Email:</span> {patient.attributes.email}
                                </div>
                                <div className="l">
                                    <span id={col}>Phone No:</span> {patient.attributes.phone}
                                </div>
                            </div>
                            <br />
                            <h1 className="al"><span id={col}>Patient Notes</span></h1>
                            <Note />
                        </div>
                    )
                    }
                    catch(err){
                        let a = err;
                    }
                }
            )()}
            
            
        </div>
     );
}
 
export default AppointmentDetails;