import React, { useState } from "react";
import Navbar from "./Navbar";
import "./admin.css";
function Admin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
      className="wrapper"
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      
    </div>
  );
}

export default Admin;
