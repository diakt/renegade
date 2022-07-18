import './App.css';
// import EONET from './components/EONET';
import React, {useState, useEffect} from 'react';
import Mapping from './components/Mapping'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  //States
  const [lalo, setLalo] = useState(null);
  

  function getLalo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          //onsuccess
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude
          setLalo([latitude, longitude])
      }, 
      function(){
        //Browser support but no retrieve, partial (user) fail
        //Ideally this is where IPGEOLOG API kicks in
        //https://ipgeolocation.io/documentation.html for later
        console.log("Browser had support but failed to retrieve");
      })
    }
    else{
      //No browser support, full fail
      console.log("Browser does not support geoloc")
    }
  }

  

  


  useEffect(()=> {
    getLalo()

  }, []);

  


  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <main>
        <Mapping 
        lalo = {lalo}
        />
        {/* <EONET /> */}

      </main>
      <footer>
        <Footer />
      </footer>


    </div>
  );
}

export default App;

