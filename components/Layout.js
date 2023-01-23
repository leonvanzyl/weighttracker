import React from "react";
import Meta from "./Meta";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Meta />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
