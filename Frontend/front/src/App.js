import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Students from './components/students';
import Professor from './components/professors';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/profesores' element={<Professor/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
