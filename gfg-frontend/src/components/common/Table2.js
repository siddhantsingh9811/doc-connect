import { useEffect, useState } from "react";

const dummy = {
    columns:["ID","Name","Date","Time","Age"],
    data:[
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"1:00 PM",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"1:00 PM",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"1:00 PM",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"1:00 PM",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"1:00 PM",age:"23"},
        {id:1, name:"John Doe", date:"19 Feb 2023", time:"1:00 PM",age:"23"},
    ]
    
}
function parseDate(date){
    let e = date.split(" ");
    return(
        <td>{e[0]} <span id="blue">{e[1]}</span> {e[2]}</td>
    )
}
function parseTime(time){
    let e = time.split(" ");
    return(
        <td>{e[0]} <span id="blue">{e[1]}</span></td>
    )
}
const Table2 = ({data:data,cur:cur,setCur:setCur}) => {
    const handleClick = (id)=>{
        setCur(id);
    }
    const [s,setS] = useState(cur);
    useEffect(()=>{
        setS(cur);
    },[cur]);
    return ( 
        <div className="table1">
            <table cellspacing="0" cellpadding="0">
                <tr className="t1h">
                    {data.columns.map((col,index)=>{
                        return <th key={index}>{col}</th>;
                    })}
                </tr>
                {data.data.map((data,index)=>{
                    return(
                        <tr className={`t1d ${s==data.id? "active":""}`} onClick={()=>{handleClick(data.id)}}>
                            <td><span id="blue">{data.id}</span></td>
                            <td>{data.name}</td>
                            {parseDate(data.date)}
                            {parseTime(data.time)}
                            <td>{data.age}</td>
                        </tr>
                        );
                })}          
            </table>
        </div>
     );
}
 
export default Table2;