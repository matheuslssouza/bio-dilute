import React, { useState } from 'react';
import { getAuthToken } from '../../services/getAuthToken';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const data = await getAuthToken(username, password);

      login(data.token);
    } catch (error) {
      alert("Error: cannot possible authenticate");
    }

  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-2">
          <h2 className="fw-bold text-primary display-6">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Welcome back
          </h2>
          <p className="text-muted">Enter with your identification to continue</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow border-0 d-flex align-items-center">
            <div className="col-md-5 d-none d-md-block">
              <img
                src="../../../public/login.jpg"
                alt="login image"
                className="img-fluid h-75 rounded "
              />
            </div>
            <div className="col-md-12">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0 fw-semibold">Sign In</h3>
                  <div>
                    <a href="#" className="text-decoration-none me-2">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-decoration-none">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
                <form action="" method="">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => { setUsername(e.target.value) }}
                      placeholder="Username"
                      required
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="form-floating mb-3 position-relative d-flex">
                    <input
                      type={showPassword}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="password">Password</label>
                    <span className="input-group-text" id="basic-addon1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"
                        onClick={(e) => { showPassword == "password" ? setShowPassword("text") : setShowPassword("password") }} id="show-password">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
                    Sign In
                  </button>
                  <div className="d-flex justify-content-between mt-3">
                    <a href="/register">Sign Up</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
