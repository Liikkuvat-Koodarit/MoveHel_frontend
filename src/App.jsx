import React, { useState, useEffect } from 'react';
import './App.css';
import AllReviews from './components/AllReviews';
import ListAll from './components/ListAll';
import AddUser from './components/AddUser';
import Login from './components/Login';

function App() {
  const [selectedTab, setSelectedTab] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

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
      .catch((error) => console.error('Not autehnticated', error));

    console.log("Registering:", userData);
  };

  const login = (loginData) => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...loginData
      })
    })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true);
          console.log("Login successful");
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => alert("Error:", error));
  }

  const logout = () => {
    fetch('http://localhost:5000/logout', {
      method: 'GET',
    })
      .then(response => {
        if (response.ok) {
          setLoggedIn(false)
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <div className='tabContainer'>
      <div className="tabs">
        <button onClick={() => handleTabChange("home")}>Etusivu</button>
        <button onClick={() => handleTabChange("reviews")}>Arvostelut</button>
      </div>
      {loggedIn ? (
        <>
          <h3>Olet kirjautunut sisään</h3>
          <button onClick={logout}>Kirjaudu ulos</button>
        </>
      ) : (
        <>
          <Login onLogin={login} />
          <AddUser onAddUser={addUser} />
        </>
      )}
      {selectedTab === "home" && <ListAll />}
      {selectedTab === "reviews" && <AllReviews />}
    </div>
  );
}

export default App;