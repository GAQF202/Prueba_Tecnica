import { Link } from "react-router-dom";
import '../App.css';

function Navigate() {
    return (
      <div>
          <nav>
            <ul>
              <li>
                <Link className="button-nav" to="/profesores">
                  Profesores
                </Link>
              </li>
              <li>
                <Link className="button-nav" to="/estudiantes">
                  Estudiantes
                </Link>
              </li>
              <li>
                <Link className="button-nav" to="/cursos">
                  Cursos
                </Link>
              </li>
            </ul>
          </nav>
      </div>
    );
  }
  
  export default Navigate;