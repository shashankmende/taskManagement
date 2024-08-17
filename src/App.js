import './App.css';
import AddTask from './components/AddTask/AddTask';
import Authenticate from './components/Authenticate/Authenticate';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile/Profile';
import Task from './components/Task';
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
          <Route exact path="/" element={<Authenticate />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/addTask' element={<AddTask/>}/>
          <Route exact path='/task/:id' element={<Task/>}/>
        </Routes>
      </ProjectState.Provider>
    </Router>
  );
}

export default App;
