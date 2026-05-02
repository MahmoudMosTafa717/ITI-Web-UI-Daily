import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import Header from "../Components/Header/Header";
import Slider from "../Components/Slider/Slider";
import Form from "../Components/Form/Form";
import CardList from "../Components/CardList/CardList";
import Footer from "../Components/Footer/Footer";

const API_URL = "http://localhost:3000/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts([...data].reverse()))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addPost = useCallback((newPost) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newPost, likes: 0, dislikes: 0 }),
    })
      .then((res) => res.json())
      .then((savedPost) => setPosts((prev) => [savedPost, ...prev]))
      .catch((err) => console.error("Add error:", err));
  }, []);

  const handleVote = useCallback((id, type) => {
    setPosts((prevPosts) => {
      const post = prevPosts.find((p) => p.id === id);
      if (!post) return prevPosts;

      const updatedVal = (post[type] || 0) + 1;

      fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [type]: updatedVal }),
      }).catch((err) => console.error("Vote error:", err));

      return prevPosts.map((p) => (p.id === id ? { ...p, [type]: updatedVal } : p));
    });
  }, []);

  const categories = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags || []);
    return ["All", ...new Set(tags)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || (post.tags && post.tags.includes(selectedCategory));
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const memoizedPosts = useMemo(() => filteredPosts, [filteredPosts]);

  return (
    <div className="app">
      <Header 
        categories={categories} 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />
      <Slider />
      <main className="main-content">
        <div className="main-left">
          <Form addPost={addPost} />
        </div>
        <div className="main-right">
          <h2 className="section-title">Latest Posts</h2>
          <CardList posts={memoizedPosts} handleVote={handleVote} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
