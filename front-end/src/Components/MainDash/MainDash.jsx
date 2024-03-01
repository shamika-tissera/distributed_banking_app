import React from "react";
import AccountM from "../AccountM/AccountM";
// import Table from "../Table/Table";
import "../MainDash/MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <AccountM/>
      {/* <Table /> */}
    </div>
  );
};

export default MainDash;
