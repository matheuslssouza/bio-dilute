import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import handleApi from "../../services/handleApi";

function RegisterForm() {
  const [userInfo, setUserInfo] = useState({
    username:'',
    password:'',
    email:'',
  })
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [samePassword, setSamePassword] = useState({
    password: '',
    confirm: '',
  });

  const navigate = useNavigate();

  const handleChangeSubmit = (e) => {
    const {id, value} = e.target
    
    setUserInfo(prev => ({
      ...prev,
      [id]:value,
    }))
  }

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      const responseRegister = await handleApi("register",{
        username: userInfo.username, 
        password: userInfo.password, 
        email: userInfo.email,
      })
      alert(responseRegister.data);
      navigate("/login")
    } catch (error) {
      alert("Error!")
    }
    
  }

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm" style={{ maxWidth: "500px" }}>
      <div className="d-flex flex-column align-items-center justify-content-center col-12">
        <h3 className="text-primary d-flex align-items-center">
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Register
        </h3>
        <div className="col-md-5 d-none d-md-block">
          <img
            src="../../../public/register.svg"
            alt="login image"
            className="img-fluid h-75 rounded "
          />
        </div>
      </div>
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="inputUsername" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" required placeholder="Username" 
          value = {userInfo.username}
          onChange={(e) => {setUserInfo((prev) => ({ ...prev, username: e.target.value }))}}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={(e) => {setUserInfo((prev) => ({ ...prev, email: e.target.value }))}}
            value = {userInfo.email}
            required
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email (example: user@domain.com)"
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
                onChange={(e) => {
                setSamePassword((prev) => ({ ...prev, password: e.target.value }));
                setUserInfo((prev) => ({ ...prev, password: e.target.value }));
              }}
              className="form-control"
              id="password"
              value = {userInfo.password}
              required
              placeholder="Password"
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13 13 0 0 1 
                  1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 
                  1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 
                  1.12-1.465 1.755C11.879 11.332 10.119 
                  12.5 8 12.5s-3.879-1.168-5.168-2.457A13 
                  13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 
                  2.5 2.5 0 0 0 0-5zm-3.5 2.5a3.5 3.5 0 1 
                  1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="col-12">
          <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={confirmPassword ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              onChange={(e) => setSamePassword(prev => ({
                ...prev,
                confirm: e.target.value
              }))}
              required
              placeholder="Confirm Password"
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setConfirmPassword(!confirmPassword)}
              title={confirmPassword ? "Esconder senha" : "Mostrar senha"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13 13 0 0 1 
                  1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 
                  1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 
                  1.12-1.465 1.755C11.879 11.332 10.119 
                  12.5 8 12.5s-3.879-1.168-5.168-2.457A13 
                  13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 
                  2.5 2.5 0 0 0 0-5zm-3.5 2.5a3.5 3.5 0 1 
                  1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </span>
          </div>
        </div>

        {samePassword.confirm !== "" && (
          samePassword.confirm === samePassword.password ? (
            <div className="alert alert-success" role="alert">
              Password equal!
            </div>
          ) : (
            <div className="alert alert-warning" role="alert">
              Password not equal!
            </div>
          )
        )}

        <div className="col-12 d-grid">
          <button type="submit" className="btn btn-primary" onClick={submitUser}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
