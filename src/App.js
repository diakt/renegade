import './App.css';
import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Dingo from './components/Dingo';
import Mapping from './components/Mapping'
import HeaderElt from './components/HeaderElt'


function App() {

  return (
    <div className="App">

      <header>
        <HeaderElt />
      </header>
    <Routes>
      <Route path="/" element={<Mapping />} />
      <Route path="/dev/" element= {<Dingo/>} />
    </Routes>

    </div>
  );
}

export default App;

