import { Component } from "react";
import "./Header.css";

class HeaderClassComponent extends Component {
  render() {
    return (
      <header className="header">
        <nav className="header-nav">
          <h1 className="header-title">Tech Blog</h1>
        </nav>
      </header>
    );
  }
}

export default HeaderClassComponent;
