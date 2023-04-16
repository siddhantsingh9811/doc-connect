import { useEffect, useState } from "react";
import Note from "./Note";
import moment from 'moment';
import axios from 'axios';
import PageTitle from "./PageTitle";

const SinglePatientDEtails = ({cur:cur,setSingle:setSingle,curApp:curApp,sp:sp}) => {
    const [ap,setAp] = useState(curApp)
    const [s,setS] = useState(sp); 
    const [data,setData] = useState();
    useEffect(()=>{
        setAp(curApp);
        fetchData();
    },[curApp]);
    useEffect(()=>{
        setS(sp);
    },[sp]);
    const fetchData = () => {
        // console.log(`${process.env.REACT_APP_BACKEND_URL}/appointments/${ap}?populate=*`);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/appointments/${curApp}?populate=*`, {})
            .then(response => {
                
                let data = response.data;
                // console.log(data[0])
                setData(data.data); 
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }
    const View1 = ()=>{
        return (
            <div className="view1">
                <PageTitle title="Notes"/>
                <h1>5 <span id="blue">Mar</span> 2023</h1>
                <Note/>
                <br />
                <h1>5 <span id="blue">Mar</span> 2023</h1>
                <Note/>
                <br />
                <h1>5 <span id="blue">Mar</span> 2023</h1>
                <Note/>
                <br />
                
            </div>
        );
    }
    const View2 = ()=>{
        try{

            return (
                <div className="view2">
                    <PageTitle title="Appointment" alt={`#${ap}`}/>
                    <br />
                    <div className="box">
                        <div className="l">
                            <span id="blue">Date:</span> {moment(data.attributes.date,"YYYY-MM-DD").format("DD MMM YYYY")}<br />
                            <span id="blue">Time:</span> {moment(data.attributes.time,"HH:mm:s").format("hh:mm A")}<br />
                            <span id="blue">Reason:</span> {data.attributes.reason}
    
                        </div>
                    </div>
                    <br />
                    <h1 className="h">Note</h1>
                    <br />
                    <Note/>
    
                    
                </div>
            );
        }
        catch(err){
            console.log(err);
        }
    }
    return ( 
        <div className="spd">
            {s?<View1/>:<View2/>}
            
        </div>
     );
}
 
export default SinglePatientDEtails;