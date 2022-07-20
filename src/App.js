import './App.css';
// import EONET from './components/EONET';
import React from 'react';
import Mapping from './components/Mapping'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">

      <header>
        <Header />
      </header>

      <main>
        <Mapping 
        />
      </main>

      <footer>
        <Footer />
      </footer>

    </div>
  );
}

export default App;

