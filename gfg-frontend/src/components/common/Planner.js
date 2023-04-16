import { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import Plan from "./Plan";

// localhost:1337/api/appointments?populate=*&date=2023-04-04
// localhost:1337/api/appointments?populate=*&filters[date]=2023-04-05'
const Planner = ({date:date,setDate:setDate,setAp:setAp,rerender:rerender,setRerender:setRerender}) => {
    const [appointments, setAppointments] = useState();
    const [curApp, setCurApp] = useState();
    const [d,setD] = useState();
    const [r,setR] = useState();
    const [ucf,setUcf] = useState(0);
    useEffect(()=>{
        setR(rerender);
        console.log("RERENDER");
    },[rerender]);
    const fetchAppointments = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/appointments?populate=*&filters[date]=${date.format("YYYY-MM-DD")}&filters[confirmed]=true`, {})
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
    const fetchUcf = ()=>{
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/appointments?populate=*&filters[date]=${date.format("YYYY-MM-DD")}&filters[confirmed]=false`, {})
            .then(response => {
                
                let data = response.data;
                // console.log(date.format("YYYY-MM-DD"),data)
                setUcf(data.data.length);  
                              
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }
    useEffect(()=>{
        fetchAppointments();
        setD(date);
        fetchUcf();
    },[date]);
    useEffect(()=>{
        setAp(curApp);
    },[curApp]);
    const a = ()=>{
        return(<div className="date">{date.format("DD MM YYYY")}</div>)
    }
    return ( 
        <div className="planner">
            <div className="top">
                {( 
                    () => { 
                        let d = date.format("DD MMM YYYY");
                        d = d.split(" ");
                        return(<div className="date">{d[0]} <span id="blue">{d[1]}</span> {d[2]}</div>) 
                    } 
                )()}
            <div className="asdasd">{ucf}</div>
            </div>
            <Plan key={d} date={date} adata={appointments} curApp={curApp} setCurApp={setCurApp}/>
        </div>
     );
}
 
export default Planner;