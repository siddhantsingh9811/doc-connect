import { Scheduler, View, Editing } from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.light.css';
import moment from 'moment';
import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';

const Plan = ({date:date,adata:adata,curApp:curApp,setCurApp:setCurApp}) => {
    
    const [currentDate, setCurrentDate] = useState(date.toDate());
    
    const [appointments,setAppointments] = useState();
    useEffect(()=>{
        try{
            // console.log("RAN")
            let apps = [];
            let a = adata.data;
            // console.log(a);
            a.map((data,index)=>{
                let format = {id:"",startDate:"",endDate:"",name:""};
                format.id = data.id;
                format.name = data.attributes.patient.data.attributes.name;
                let s = data.attributes.time;
                let d = data.attributes.duration;
                let startObj = `${date.format("YYYY-MM-DD")}T${s}`;
                startObj = moment(startObj);
                format.startDate = startObj.toDate();
                let e = startObj.add(d,'hours');
                format.endDate = e.toDate();
                // console.log(format.endDate);
                apps.push(format);
            })
            // console.log(apps);
            setAppointments(apps);
        }
        catch(err){
            console.log(err);
        }
    },[currentDate]);
    useEffect(()=>{
        setCurrentDate(date.toDate());
    },[date]);
    const handleUnConfirmation = (id)=>{
        //update to make this id confirmed and then reload
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/appointments/${id}`,{
            "data": {
                "confirmed":false
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
    const A = (model)=>{
        // console.log(model.data);
        let data = model.data.appointmentData;
        
        return(
            <div className="ac" onClick={()=>{setCurApp(data.id)}}>
                <div className="e">

                <h1>Appointment <span id="blue">#{data.id}</span>
                <svg onClick={()=>{handleUnConfirmation(data.id)}} className='g' width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.17419 7.20862e-05C6.07214 -0.00133501 5.97084 0.01787 5.87615 0.0565718C5.78147 0.0952736 5.69529 0.152701 5.62264 0.225519C5.54998 0.298337 5.49229 0.385094 5.45291 0.480752C5.41354 0.576411 5.39326 0.679064 5.39326 0.78275H0.781375C0.679288 0.781284 0.577931 0.800445 0.483196 0.83912C0.388461 0.877795 0.302237 0.935212 0.229534 1.00804C0.156832 1.08086 0.0991005 1.16764 0.0596962 1.26333C0.0202919 1.35901 0 1.4617 0 1.56543C0 1.66915 0.0202919 1.77184 0.0596962 1.86753C0.0991005 1.96322 0.156832 2.05 0.229534 2.12282C0.302237 2.19564 0.388461 2.25306 0.483196 2.29174C0.577931 2.33041 0.679288 2.34957 0.781375 2.34811H14.6486C14.7507 2.34957 14.8521 2.33041 14.9468 2.29174C15.0415 2.25306 15.1278 2.19564 15.2005 2.12282C15.2732 2.05 15.3309 1.96322 15.3703 1.86753C15.4097 1.77184 15.43 1.66915 15.43 1.56543C15.43 1.4617 15.4097 1.35901 15.3703 1.26333C15.3309 1.16764 15.2732 1.08086 15.2005 1.00804C15.1278 0.935212 15.0415 0.877795 14.9468 0.83912C14.8521 0.800445 14.7507 0.781284 14.6486 0.78275H10.0367C10.0367 0.679064 10.0165 0.576411 9.97709 0.480752C9.93771 0.385094 9.88002 0.298337 9.80736 0.225519C9.7347 0.152701 9.64853 0.0952736 9.55385 0.0565718C9.45917 0.01787 9.35786 -0.00133501 9.25581 7.20862e-05H6.17419ZM0.781375 3.91346V16.4363C0.781375 17.3012 1.47089 18.0017 2.32218 18.0017H13.1078C13.9591 18.0017 14.6486 17.3012 14.6486 16.4363V3.91346H0.781375ZM5.40379 7.82685C5.60082 7.82685 5.79788 7.90314 5.94849 8.05616L7.715 9.85081L9.48151 8.05616C9.78274 7.75013 10.2697 7.75013 10.5709 8.05616C10.8721 8.36218 10.8721 8.85688 10.5709 9.16291L8.8044 10.9576L10.5709 12.7522C10.8721 13.0583 10.8721 13.553 10.5709 13.859C10.4207 14.0116 10.2234 14.0883 10.0262 14.0883C9.82899 14.0883 9.63174 14.0116 9.48151 13.859L7.715 12.0643L5.94849 13.859C5.79826 14.0116 5.60102 14.0883 5.40379 14.0883C5.20657 14.0883 5.00932 14.0116 4.85909 13.859C4.55787 13.553 4.55787 13.0583 4.85909 12.7522L6.6256 10.9576L4.85909 9.16291C4.55787 8.85688 4.55787 8.36218 4.85909 8.05616C5.00971 7.90314 5.20676 7.82685 5.40379 7.82685Z" fill="#FD4242"/>
                </svg>
                </h1>
                <p><span id="blue">Name </span>{data.name} 
                <span id="blue"> From</span> {(()=>{let a = moment(data.startDate).format("h:mm");return( a )})()} to {(()=>{let a = moment(data.endDate).format("h:mm");return( a )})()}</p>
                </div>
                

            </div>
        )
    }
    
    
    const onAppointmentUpdated = (e) => {
        // Handler of the "appointmentUpdated" event
        console.log("UPDATED");
        let data = e.appointmentData;
        let id = data.id;
        let end = moment(data.endDate);
        let start = moment(data.startDate);
        let duration = end.diff(start)/3600000; 
        // console.log(id,start.format("HH:mm:00"),duration);
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/appointments/${id}`,{
            "data": {
                "time":start.format("HH:mm:00"),
                "duration":duration
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
    return ( 
        <div className="plan">
            <Scheduler id="scheduler"
                onAppointmentUpdated={onAppointmentUpdated}
                dataSource={appointments}
                currentDate={currentDate}
                defaultCurrentView="day"
                adaptivityEnabled={true}>
                <View
                type="day"
                startDayHour={7}
                endDayHour={24}
                appointmentComponent={A}
                showAllDayPanel={false}
                />
                <Editing
                    allowDragging={true}
                    allowAdding={false}
                />
            </Scheduler>
        </div>
     );
}
 
export default Plan;