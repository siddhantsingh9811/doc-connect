import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Main/>
    </div>
  );
}

export default App;
