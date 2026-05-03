// Card.jsx
// This component renders a single blog post card.
import React from "react";
import "./Card.css";

// FUNCTION VERSION (commented)
/*
function Card({ post }) {
  return (
    <div className="card">
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
}
*/

// CLASS VERSION (used)
class Card extends React.Component {
  // `post` is provided via props
  render() {
    const { post } = this.props;
    return (
      <div className="card">
        <img src={post.image} alt={post.title} />
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
    );
  }
}

export default Card;
