import { useState } from "react";
import "./App.css";
import Header from "../Components/Header/Header";
import Slider from "../Components/Slider/Slider";
import Form from "../Components/Form/Form";
import CardList from "../Components/CardList/CardList";
import Footer from "../Components/Footer/Footer";
import initialPosts from "../data/posts.json";

function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("my_posts");
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  const addPost = (newPost) => {
    const postWithVotes = { ...newPost, likes: 0, dislikes: 0 };
    const updatedPosts = [postWithVotes, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("my_posts", JSON.stringify(updatedPosts));
  };

  const handleVote = (id, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          [type]: (post[type] || 0) + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("my_posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="app">
      <Header />
      <Slider />
      <main className="main-content">
        <div className="main-left">
          <Form addPost={addPost} />
        </div>
        <div className="main-right">
          <h2 className="section-title">Latest Posts</h2>
          <CardList posts={posts} handleVote={handleVote} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
