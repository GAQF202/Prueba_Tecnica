import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Students from './components/students';
import Professor from './components/professors';
import Courses from './components/courses';
import Navigate from './components/navigate';

function App() {
  return (
    <div>
      <Router>
      <Navigate/>
        <Routes>
          <Route path='/profesores' element={<Professor/>} />
          <Route path='/estudiantes' element={<Students/>} />
          <Route path='/cursos' element={<Courses/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
