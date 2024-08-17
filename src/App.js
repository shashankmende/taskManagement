import './App.css';
import Authenticate from './components/Authenticate/Authenticate';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile/Profile';
import ProjectState from './context/projectContext';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <Router>
      <ProjectState.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Authenticate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </ProjectState.Provider>
    </Router>
  );
}

export default App;
