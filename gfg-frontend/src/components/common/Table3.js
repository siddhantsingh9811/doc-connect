import { useEffect, useState } from "react";

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
function parseSum(sum){
    let s = sum;
    if(sum.length>35){
        s = s.slice(0,35) + "..."
    }
    return(<td className="sum">{s}</td>)
}
const Table3 = ({data:data,cur:cur,setCurApp:setCurApp,setSp:setSp,ap:ap}) => {
    const handleClick = (id)=>{
        setCurApp(id);
        setSp(false);
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
                        <tr className={`t1d ${ap===data.id? "active":""}`} onClick={()=>{handleClick(data.id)}}>
                            <td><span id="blue">{data.id}</span></td>
                            {parseDate(data.date)}
                            {parseTime(data.time)}
                            {parseSum(data.age)}
                        </tr>
                        );
                })}          
            </table>
        </div>
     );
}
 
export default Table3;