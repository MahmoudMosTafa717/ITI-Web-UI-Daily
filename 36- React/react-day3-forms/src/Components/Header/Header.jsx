import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Tech Blog</h1>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item active"><a href="#">Home</a></li>
            <li className="nav-item"><a href="#">Articles</a></li>
            <li className="nav-item"><a href="#">About</a></li>
            <li className="nav-item"><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
