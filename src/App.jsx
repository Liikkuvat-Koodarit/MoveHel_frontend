import './App.css';
import AllReviews from './components/AllReviews';
import ListAll from './components/ListAll';
import { useState } from 'react';
import Map from './components/Map';
import AddUser from './components/AddUser';

function App() {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  const addUser = (userData) => {
    fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...userData
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));

    console.log("Registering:", userData);
};

  return (
    <div className='tabContainer'>
      <Map />
      <div className="tabs">
      <button onClick={() => handleTabChange("home")}>Etusivu</button>
      <button onClick={() => handleTabChange("reviews")}>Arvostelut</button>
      <AddUser onAddUser={addUser}/>
      
      </div>
      {selectedTab === "home" && <ListAll />}
      {selectedTab === "reviews" && <AllReviews />}
    </div>

  )
}

export default App
