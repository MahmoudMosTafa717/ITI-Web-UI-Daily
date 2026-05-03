// CardList.jsx
// This component renders a list of blog post cards.
import React from "react";
import Card from "../Card/Card";
import "./CardList.css";

// FUNCTION VERSION (commented)
/*
function CardList({ posts }) {
  return (
    <div className="card-list">
      {posts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
    </div>
  );
}
*/

// CLASS VERSION (used)
class CardList extends React.Component {
  // Expects `posts` prop from parent
  render() {
    const { posts } = this.props;
    return (
      <div className="card-list">
        {posts && posts.map((post, index) => <Card key={index} post={post} />)}
      </div>
    );
  }
}

export default CardList;
