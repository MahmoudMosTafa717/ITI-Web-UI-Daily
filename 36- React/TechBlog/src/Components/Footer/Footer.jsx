// Footer.jsx
// This component renders the footer of the blog.
import React from "react";
import "./Footer.css";

// FUNCTION VERSION (commented)
/*
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Tech Blog. All rights reserved.</p>
    </footer>
  );
}
*/

// CLASS VERSION (used)
class Footer extends React.Component {
  // No state required for footer
  render() {
    return (
      <footer className="footer">
        <p>&copy; 2026 Tech Blog. All rights reserved.</p>
      </footer>
    );
  }
}

export default Footer;
