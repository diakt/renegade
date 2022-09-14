import './App.css';
import {Routes, Route} from 'react-router-dom';
import React from 'react';

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

    </Routes>

    </div>
  );
}

export default App;

