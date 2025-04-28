import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="p-3 mb-0 border-bottom bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-3 text-start">
            <a href="/" className="d-flex align-items-center text-decoration-none">
              <img
                src="/bio.png"
                style={{ height: '50px', width: 'auto' }}
                alt="Bio Diluite"
              />
            </a>
          </div>

          {isAuthenticated && (
            <>
              <div className="col-6 text-center">
                <ul className="nav justify-content-center gap-4">
                  <li className='d-flex gap-0 align-items-center'>
                    <img
                      src="../public/calc.svg"
                      style={{ height: '30px', width: 'auto' }}
                      alt="Calculator"
                    />
                    <a href="/" className="nav-link px-3 link-secondary">Calculators</a>
                  </li>
                  <li className='d-flex gap-0 align-items-center'>
                    <img
                      src="../public/table.svg"
                      style={{ height: '30px', width: 'auto' }}
                      alt="Table"
                    />
                    <a href="/history" className="nav-link px-3 link-body-emphasis">History</a>
                  </li>
                </ul>
              </div>
              <div className="col-3 text-end">
                <div className="dropdown">
                  <a
                    href="#"
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/teste.png"
                      alt="user"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li><a className="dropdown-item" href="javascript:void(0)" onClick={() => logout()}>Sign out</a></li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar;
