import './App.css';
// import EONET from './components/EONET';
import React from 'react';
import Mapping from './components/Mapping'
import HeaderElt from './components/HeaderElt'


function App() {

  return (
    <div className="App">

      <header>
        <HeaderElt />
      </header>

      <Mapping/> 
    </div>
  );
}

export default App;

