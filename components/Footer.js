import React from "react";

function Footer() {
  return (
    <footer className="footer-container">
      <p className="flex items-center justify-center text-xs">
        Copyright &copy; {new Date().getFullYear()} &nbsp;
        <span className="uppercase"> weightlosstracker</span>
      </p>
    </footer>
  );
}

export default Footer;
