import { useEffect, useState } from "react"
import './App.css';


const getUserCoords = (success, failure) => {
  console.log("Entering contest")
  navigator.geolocation.getCurrentPosition(success, failure)
}

const enterContestWithGeo = (setCurrentData, setGettingLocation) => {
  const success = (successPosition) => {
    console.log(`Current position : ${successPosition}`)
    console.log(`Lat: ${successPosition.coords.latitude}`)
    console.log(`Long: ${successPosition.coords.longitude}`)
    fetch(`https://httpbin.org/anything?lat=${successPosition.coords.latitude}&long=${successPosition.coords.longitude}`, )
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setCurrentData(`lat: ${data.args.lat} - lon: ${data.args.long}`)
            setGettingLocation(false)
        })
  }
  const failure = (failureReason) => {
    fetch('https://httpbin.org/anything?lat=0&long=0', )
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setCurrentData(`User denied location ${failureReason}`)
            setGettingLocation(false)
          })
  }

  setGettingLocation(true)
  getUserCoords(success, failure)
}


const EnterContestButton = ({ setCurrentData }) => {
  const [gettingLocation, setGettingLocation] = useState(false)

  return (
    <button onClick={() => enterContestWithGeo(setCurrentData, setGettingLocation)} disabled={gettingLocation}>
      {
        gettingLocation ? "Getting location..." : "Enter Contest"
      }
    </button>
  )
}

const App = () => {
  const [currentData, setCurrentData] = useState("No data yet")
  return ( <div>
    <h3> Geolocation example </h3>
    <EnterContestButton setCurrentData={setCurrentData}/>
    <div>
      {currentData}
    </div>
    </div>
  );
}


export default App;
