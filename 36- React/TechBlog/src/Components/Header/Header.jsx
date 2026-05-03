// Header.jsx
// This component renders the header of the blog.
import React from "react";
import "./Header.css";

// FUNCTION VERSION (commented)
/*
function Header() {
  return (
    <header className="header">
      <h1>Tech Blog</h1>
    </header>
  );
}
*/

// CLASS VERSION (used)
class Header extends React.Component {
  // No local state required for the header
  render() {
    return (
      <header className="header">
        <h1>Tech Blog</h1>
      </header>
    );
  }
}

export default Header;
