import './App.css';
// import EONET from './components/EONET';
import React, {useState, useEffect} from 'react';
// import Mapping from './components/Mapping'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  //States
  const [lalo, setLalo] = useState(null);
  const [fireLoc, setFireLoc] = useState([])

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

  function getFireLoc(){
    const url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    fetch(url)
        .then((result) => {return result.json()})
        .then((data) => {
            setFireLoc(data.events)
        })
        .catch((err) => console.log(err))
  }

  


  useEffect(()=> {
    getLalo()
    getFireLoc()
    console.log(fireLoc)
  }, []);

  


  return (
    <div className="App">
      <header className='header-container'>
        <Header />
      </header>

      <main className='main-container'>
        <p>{lalo}</p>
        {/* <Mapping 
        lalo = {lalo}
        /> */}
        {/* <EONET /> */}

      </main>
      <footer className = 'footer-container'>
        <Footer />
      </footer>


    </div>
  );
}

export default App;

