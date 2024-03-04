import './App.css';
import AllReviews from './components/AllReviews';
import ListAll from './components/ListAll';
import { useState } from 'react';

function App() {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <div className='tabContainer'>
      <div className="tabs">
      <button onClick={() => handleTabChange("home")}>Etusivu</button>
      <button onClick={() => handleTabChange("reviews")}>Arvostelut</button>
      
      </div>
      {selectedTab === "home" && <ListAll />}
      {selectedTab === "reviews" && <AllReviews />}
    </div>

  )
}

export default App
