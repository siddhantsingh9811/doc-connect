import PageTitle from "./PageTitle";
import moment from 'moment';
import axios from 'axios';
import { useEffect, useState } from "react";
import Table3 from "./Table3";
import Documents from "./Documents";

const dummy = {
    columns:["ID","Date","Time","Reason"],
    data:[
        {id:1, date:"19 Feb 2023", time:"1:00 PM",age:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "},
        {id:1, date:"19 Feb 2023", time:"1:00 PM",age:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "},
        {id:1, date:"19 Feb 2023", time:"1:00 PM",age:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "},
        {id:1, date:"19 Feb 2023", time:"1:00 PM",age:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "},
        {id:1, date:"19 Feb 2023", time:"1:00 PM",age:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "},
        {id:1, date:"19 Feb 2023", time:"1:00 PM",age:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "},
    ]
    
}
const SinglePatient = ({cur:cur,setSingle:setSingle,curApp:curApp,setCurApp:setCurApp,setSp:setSp}) => {
    const [patient,setPatient] = useState(cur);
    const [details,setDetails] = useState();
    const [apps,setApps] = useState();
    const [td,setTd] = useState(dummy);
    const [ap,setAp] = useState(curApp)
    const [valid,setValid] = useState(false);
    
    useEffect(()=>{
        setPatient(cur);
    },[cur]);
    useEffect(()=>{
        setAp(curApp);
    },[curApp]);
    const fetchPatient = ()=>{
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/patients/${patient}?populate=*`, {})
            .then(response => {
                let data = response.data.data
                setDetails(data);
                let a = data.attributes.appointments.data;
                setApps(a);
                let app = {
                    columns:["ID","Date","Time","Reason"],
    
                    data:[
                    ]
                }
                a.forEach((element)=>{
                    let d = moment(element.attributes.date.replace('-',''),"YYYYMMDD");
                    let date = d.format("DD MMM YYYY");
                    let q = moment(element.attributes.time.slice(0,8),"HH:mm:ss")
                    let e = {id:element.id,date:date,time:q.format("hh:mm A"),age:`${element.attributes.reason}`}
                    let arr = app.data
                    arr.push(e);
                    app.data=arr;
                });
                // console.log(app);
                setTd(app);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }
    useEffect(()=>{
        fetchPatient()
        // console.log(details,apps)
    },[patient]);
    return ( 
        <div className="patient sp">
            <div className="top">
                <div className="t1">
                    <PageTitle title="Patient" alt={`#${cur}`}/>
                
                <div className="button" onClick={()=>{setSingle(false)}}>
                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.46944 0.0992606C8.64444 0.248427 8.66611 0.511205 8.51694 0.686483L1.31806 9.14898H24.5833C24.8136 9.14898 25 9.33537 25 9.56565C25 9.79593 24.8136 9.98232 24.5833 9.98232H1.31806L8.51694 18.4448C8.66583 18.6198 8.645 18.8829 8.46944 19.032C8.29417 19.1812 8.03139 19.1598 7.88222 18.9848L0.0991667 9.83537C0.0952778 9.83093 0.0938889 9.82482 0.0902778 9.82037C0.0708333 9.79537 0.0519444 9.76982 0.0383333 9.74037C0.035 9.73315 0.0338889 9.72565 0.0311111 9.71843C0.0277778 9.70982 0.0252778 9.70121 0.0222222 9.69204C0.00888889 9.65065 0 9.60815 0 9.56565C0 9.52315 0.00888889 9.48065 0.0222222 9.43926C0.025 9.43037 0.0275 9.42176 0.0311111 9.41315C0.0338889 9.40593 0.0352778 9.39843 0.0386111 9.39121C0.0522222 9.36176 0.0711111 9.33621 0.0905556 9.31121C0.0941667 9.30648 0.0955556 9.30065 0.0994445 9.29621L7.8825 0.147039C8.03139 -0.028517 8.29417 -0.0499061 8.46944 0.0992606Z" fill="white"/>
                    </svg>
                    Back
                </div>
                </div>
            </div>
            
            {details?

            <div className="weekly">
                <div className="cards">
                    <div className="box">
                    <div className="e">
                        <div className="l">

                        <span id="blue">Name:</span> {details.attributes.name}<br />
                        </div>
                        {(()=>{
                            let dob = moment(details.attributes.DOB,"YYYY-MM-DD").format("DD MMM YYYY").split(" "); 
                            return ( <div className="l"> <span id="blue">DOB:</span> {dob[0]} <span id="blue">{dob[1]}</span> {dob[2]}</div>)
                        })()}
                        <div className="l">

                        <span id="blue">Email:</span> {details.attributes.email}<br />
                        </div>
                        <div className="l">

                        <span id="blue">Phone:</span> {details.attributes.phone}<br />
                        </div>
                    </div>
                    </div>
                    <div className="card">
                        <div className="image">
                        <svg width="67" height="82" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.5271 0C15.044 0 0 15.044 0 33.5271C0 52.0102 15.044 67.0541 33.5271 67.0541C51.5853 67.0541 66.3275 52.6908 66.9941 34.7876C67.0184 34.4149 66.9676 34.0411 66.845 33.6884C66.7223 33.3356 66.5301 33.011 66.2798 32.7338C66.0296 32.4566 65.7263 32.2323 65.3878 32.0743C65.0494 31.9163 64.6828 31.8278 64.3095 31.8139C63.9363 31.8001 63.5641 31.8612 63.2149 31.9936C62.8657 32.1261 62.5465 32.3272 62.2764 32.5851C62.0062 32.843 61.7905 33.1524 61.642 33.4951C61.4935 33.8378 61.4152 34.2068 61.4117 34.5802C60.8546 49.5447 48.6327 61.4663 33.5271 61.4663C18.064 61.4663 5.58784 48.9901 5.58784 33.5271C5.58784 18.064 18.064 5.58784 33.5271 5.58784C42.5344 5.58784 50.4911 9.85934 55.5947 16.4579L50.2906 20.8889L64.2002 24.3431L64.2602 9.22758L59.8893 12.8728C53.753 5.04591 44.2263 0 33.5271 0ZM30.1383 16.7635L30.7004 39.1149H36.3537L36.9158 16.7635H30.1383ZM33.538 44.1734C31.2218 44.1734 29.8382 45.4091 29.8382 47.5185C29.8382 49.5888 31.2246 50.8199 33.538 50.8199C35.8346 50.8199 37.2105 49.5888 37.2105 47.5185C37.2105 45.4091 35.8346 44.1734 33.538 44.1734Z" fill="#0092FC"/>
                        </svg>
                        </div>
                        <div className="title">Appointments</div>
                        <div className="data">
                            {apps.length}
                        </div>
                    </div>
                    <div className="card">
                        <div className="image">
                        <svg width="67" height="82" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.09091 0C2.72568 0 0 2.72568 0 6.09091V60.9091C0 64.2743 2.72568 67 6.09091 67H10.8316C9.78395 65.2001 9.13636 63.1384 9.13636 60.9091V6.09091C9.13636 3.86164 9.78395 1.79986 10.8316 0H6.09091ZM21.3182 0C17.953 0 15.2273 2.72568 15.2273 6.09091V60.9091C15.2273 64.2743 17.953 67 21.3182 67H60.9091C64.2743 67 67 64.2743 67 60.9091V19.7955C67 18.9884 66.6803 18.2148 66.1078 17.6422L49.3578 0.892223C48.7852 0.319678 48.0116 0 47.2045 0H21.3182ZM45.6818 5.79945L61.2006 21.3182H48.7273C47.0462 21.3182 45.6818 19.9538 45.6818 18.2727V5.79945ZM30.4545 33.5H51.7727C53.4538 33.5 54.8182 34.8644 54.8182 36.5455C54.8182 38.2265 53.4538 39.5909 51.7727 39.5909H30.4545C28.7735 39.5909 27.4091 38.2265 27.4091 36.5455C27.4091 34.8644 28.7735 33.5 30.4545 33.5ZM30.4545 45.6818H45.6818C47.3629 45.6818 48.7273 47.0462 48.7273 48.7273C48.7273 50.4084 47.3629 51.7727 45.6818 51.7727H30.4545C28.7735 51.7727 27.4091 50.4084 27.4091 48.7273C27.4091 47.0462 28.7735 45.6818 30.4545 45.6818Z" fill="#0092FC"/>
                        </svg>


                        </div>
                        <div className="title">Notes</div>
                        <div className="data2">
                            asd
                            <div className="button" onClick={()=>{setSp(true)}}>
                                
                                View
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            :""}
            <br />
            <h1>Documents</h1>
            <br />
            <Documents/>
            <br />
            <h1>Appointments</h1>
            <br />
            <Table3 data={td} setSp={setSp} ap={ap} setCurApp={setCurApp}/>

        </div>
     );
}
 
export default SinglePatient;