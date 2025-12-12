
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Component/Dashboard'
import Add from './Component/Add'
import { useState } from 'react';

function App() {
const [refreshKey, setRefreshKey] = useState(0);
const refresh = () => setRefreshKey(old => old + 1);

  return (
      <Routes>
        <Route path='/' element={<Dashboard refreshKey={refreshKey} refresh={refresh}/>}/>
        <Route path='/add' element={<Add refresh={refresh}/>}/>
      </Routes>
  )
}

export default App;
