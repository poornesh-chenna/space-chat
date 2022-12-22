import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/start.css'

function Start() {
  return (
    <div className="start">
      <div className="started">
        <div className=" min-vh-100">
          <div className="sapace">
            <div className="d-flex flex-column shadow-lg realspace">
              <h1 className="logo d-inline-block">Space chat</h1>
              <div className="d-inline-block imglogo">
                <img
                  className="logoimg"
                  src="./images/unicorn-in-space-transparent-background-jacob-kuch-transparent.png"
                  alt="chatimage"
                />
              </div>

              <div className="d-inline-block btns">
                <Link
                  className="btn btn-light btn-lg mx-4 d-inline-block"
                  to="/Register"
                  role="button"
                >
                  Register
                </Link>
                <Link
                  className="btn btn-dark btn-lg d-inline-block"
                  to="/Login"
                  role="button"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
