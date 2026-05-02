import "./Header.css";

function Header({ categories, selectedCategory, onCategoryChange, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Tech Blog</h1>
        
        <div className="header-search-container">
          <i className="fas fa-search search-icon"></i>
          <select 
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="search-input"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

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
