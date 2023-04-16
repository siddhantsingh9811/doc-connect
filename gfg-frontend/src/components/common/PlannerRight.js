import { useEffect, useState } from "react";
import moment from 'moment';
import axios from 'axios';

const PlannerRight = ({date:date,setDate:setDate,setAp:setAp,rerender:rerender,setRerender:setRerender}) => {
    const [appointments, setAppointments] = useState();
    const [d,setD] = useState();
    const [r,setR] = useState();
    useEffect(()=>{
        setR(rerender);
    },[rerender]);
    const fetchAppointments = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/appointments?populate=*&filters[date]=${date.format("YYYY-MM-DD")}&filters[confirmed]=false`, {})
            .then(response => {
                
                let data = response.data;
                // console.log(date.format("YYYY-MM-DD"),data)
                
                setAppointments(data);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
        }
    const handleConfirmation = (id)=>{
        //update to make this id confirmed and then reload
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/appointments/${id}`,{
            "data": {
                "confirmed":true
            }
        })
        .then(response=>{
            console.log(response.data)
            // setDate(date);
        })
        .catch(error=>{
            console.log('An error occurred:', error.response);

        })
    }
    
    useEffect(()=>{
        fetchAppointments();
        setD(date);
    },[date]);
    const A = (data)=>{
        // console.log(data);
        let asd = data.attributes;
        // console.log(id,asd);
        let format = {id:"",startDate:"",endDate:"",name:""};
        format.id = data.id;
        format.name = asd.patient.data.attributes.name;
        let s = asd.time;
        let d = asd.duration;
        let startObj = `${date.format("YYYY-MM-DD")}T${s}`;
        startObj = moment(startObj);
        format.startDate = startObj.toDate();
        let e = startObj.add(d,'hours');
        format.endDate = e.toDate();
        
        return(
            <div className="ac" onClick={()=>{setAp(format.id)}}>
                <div className="e">
                    <h1>Appointment <span id="red">#{format.id}</span></h1>
                    <p><span id="red">Name </span>{format.name} 
                    <span id="red"> From</span> {(()=>{let a = moment(format.startDate).format("h:mm");return( a )})()} to {(()=>{let a = moment(format.endDate).format("h:mm");return( a )})()}
                    </p>
                </div>
                <div className="move" onClick={()=>{
                        handleConfirmation(format.id);
                    }}>

                    <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.885 3.51498C14.268 -1.10302 6.829 -1.16102 2.129 3.31998L0 1.06198V8.99998H7.484L5.418 6.80898C8.238 4.10298 12.715 4.13298 15.492 6.90898C18.484 9.90198 18.156 14.593 15.304 17.228L18.618 20.728C23.334 16.502 23.875 8.50498 18.885 3.51498Z" fill="#0092FC"/>
                    </svg>
                </div>

                
            </div>
        );
    }
    return ( 
        <div className="planr">
            {appointments?appointments.data.map((data,index)=>{
                // console.log(index,data);
                return(
                        <div className="um">
                            {A(data)}
                        </div>
                    );
                }):""} 
        </div>
     );
}
 
export default PlannerRight;