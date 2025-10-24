import Usuarios from './modules/usuarios/Usuarios';


function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">SGU Usuarios</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Usuarios</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="bg-light min-vh-100">
        <div className="container py-4">
          <Usuarios />
        </div>
      </main>
    </>
  );
}

export default App
