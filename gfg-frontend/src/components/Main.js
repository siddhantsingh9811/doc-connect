import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Plugins from './pages/Plugins';
import Datasets from './pages/Datasets';
import Forum from './pages/Forum';
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './pages/Book';
import BookSingle from './pages/BookSingle';

const Main = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const [auth,setAuth] = useState(true);
    const [token, setToken] = useState();
    useEffect(()=>{
      if(localStorage.token){
        setAuth(true);
        setToken(localStorage.token);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.id}`, {})
            .then(response => {

                // Handle success.
                console.log('Well done!');
                setUser(response.data);                
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
      }
      else{
        setAuth(false);
      }
    },[]);
    useEffect(()=>{
      if(!auth){
        navigate('/login');
        console.log(auth);
      }
    },[auth]);
    return ( 
    <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard user={user}/>} />
          <Route path="/appointments" element={<Appointments/>} />
          <Route path="/patients" element={<Patients/>} />
          <Route path="/plugins" element={<Plugins/>} />
          <Route path="/datasets" element={<Datasets/>} />
          <Route path="/forum" element={<Forum/>} />
          <Route path="/login" element={<Login setAuth={setAuth} setUser={setUser}/>} />
          <Route path="/book" element={<Book/>} />
          <Route path="/patient/:uuid" element={<BookSingle/>} />

        </Routes>
    </div>
    );
}
 
export default Main;