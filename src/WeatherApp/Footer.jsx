import React from "react";

function Footer() {
  const year = new Date().getFullYear(); //get current year
  return (
    <footer>
      <p> ⓒ Created By Karuna Mathur {year}</p>
    </footer>
  );
}
export default Footer;
