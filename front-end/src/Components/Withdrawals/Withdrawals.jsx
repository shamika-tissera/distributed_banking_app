import React, { useState } from "react";
import "./AccountM.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const AccountM = () => {
  const [action, setAction] = useState("Sign Up");
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
        <span>Account No</span>
        <span> :</span>
          <input type="text" placeholder="Enter your Account No" />
        </div>
        <div className="input">
        <span>User Name</span>
        <span> :</span>
          <input type="text" placeholder="Enter Your User Name" />
        </div>
        <div className="input">
        <span>Account Type</span>
        <span>:</span>
          <input type="text" placeholder="Enter your Account Type" />
        </div>
        <div className="input">
        <span>NIC</span>
        <span>:</span>
          <input type="text" placeholder="Enter your NIC" />
        </div>
        

        {/* {action === "Account" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="email" placeholder="Email" />
          </div>
        )}
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot Password? <span>Click Here!</span>
            <div className="error-password">
              <span>error</span>
            </div>
          </div>
        )} */}

        <div className="submit-container">
          <div
            className={action === "Account" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Create");
            }}
          >
            Account Management
          </div>
          <div
            className={action === "Create" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Account");
            }}
          >
            Create Account
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountM;
