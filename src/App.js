import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/StartPage/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/StartPage/Home';
import Signup from './components/StartPage/Signup';
import AddDevice from './components/StartPage/AddDevice';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addDevice" element={<AddDevice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
