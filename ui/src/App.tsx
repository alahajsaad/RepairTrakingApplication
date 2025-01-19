import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ShowReparation from './pages/ShowReparation';
import AddReparation from './pages/AddReparation/AddReparation';
import ReparationDetails from './pages/ReparationDetails';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      {/* Main layout with sidebar and content */}
      <div className="main">
        <Sidebar />
        <div className="Container">
          <Routes>
            {/* Define all routes */}
            <Route path="*" element={<AddReparation />} />
            <Route path="/reparation" element={<AddReparation />} />
            <Route path="/reparationFilter" element={<ShowReparation />} />
            <Route path="/reparation/details/:id" element={<ReparationDetails />} />
            
           
            
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
